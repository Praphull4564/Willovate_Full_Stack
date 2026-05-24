import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface QRGeneratorProps {
  value: string;
  title?: string;
  subtitle?: string;
  size?: number;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ 
  value, 
  title = "Scan to Book", 
  subtitle = "Show this code upon arrival",
  size = 200 
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size + 40;
      canvas.height = size + 100; // Extra space for text
      
      if (ctx) {
        // Draw background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw QR
        ctx.drawImage(img, 20, 20);
        
        // Draw text
        ctx.fillStyle = '#0f172a'; // slate-900
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, size + 50);
        
        ctx.fillStyle = '#64748b'; // slate-500
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText(subtitle, canvas.width / 2, size + 70);

        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `booking-qr-${Date.now()}.png`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
        toast.success('QR Code downloaded successfully');
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Booking QR Code',
          text: 'Here is my booking reference QR code.',
          url: value,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(value);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-sm mx-auto">
      <div 
        ref={qrRef} 
        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-inner mb-6"
      >
        <QRCodeSVG 
          value={value} 
          size={size}
          level="H"
          includeMargin={false}
          bgColor="#ffffff"
          fgColor="#0f172a" // slate-900
        />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">{subtitle}</p>
      
      <div className="flex w-full gap-3">
        <Button 
          variant="primary" 
          className="flex-1 text-sm bg-indigo-600 hover:bg-indigo-700"
          onClick={downloadQR}
        >
          <Download size={16} className="mr-2" />
          Download
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 text-sm"
          onClick={shareQR}
        >
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};
