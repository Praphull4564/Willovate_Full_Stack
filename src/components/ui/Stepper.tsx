import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center w-full max-w-2xl mx-auto">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;

        return (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="relative flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 z-10
                  ${isCompleted 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/50' 
                    : isCurrent 
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900 shadow-md shadow-indigo-200 dark:shadow-indigo-900/50' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                  }
                `}
              >
                {isCompleted ? <Check size={18} className="animate-in zoom-in" /> : step.id}
              </div>
              
              <div className={`absolute top-12 whitespace-nowrap text-xs font-semibold transition-colors duration-300
                ${isCurrent || isCompleted ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}
              `}>
                {step.label}
              </div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-[2px] rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative z-0">
                <div 
                  className={`absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500 ease-out`}
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
