import React from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { cn } from '../ui/Loader';

interface LogoUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ value, onChange, error }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="shrink-0 relative group">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-200 dark:border-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
          {value ? (
            <img src={value} alt="Business Logo" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="text-slate-400" size={32} />
          )}
        </div>
        <button
          type="button"
          onClick={() => onChange('')}
          className={cn(
            "absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity",
            !value && "hidden"
          )}
        >
          &times;
        </button>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Business Logo
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-sm">
          Recommended size: 400x400px. Maximum file size: 2MB. Supported formats: JPG, PNG, WEBP.
        </p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/jpeg, image/png, image/webp" 
          className="hidden" 
        />
        <button
          type="button"
          onClick={handleUploadClick}
          className="inline-flex items-center space-x-2 text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          <UploadCloud size={16} />
          <span>Click to upload</span>
        </button>
      </div>
      {error && <p className="text-xs text-red-500 w-full text-center sm:text-left mt-2">{error}</p>}
    </div>
  );
};
