import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-gold-600 flex-shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-forest-200 text-charcoal-900',
    error: 'bg-white border-red-200 text-charcoal-900',
    info: 'bg-white border-gold-200 text-charcoal-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short transition-all duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-md ${bgStyles[toast.type] || bgStyles.success}`}>
        {icons[toast.type] || icons.success}
        <p className="text-sm font-medium pr-2">{toast.message}</p>
      </div>
    </div>
  );
};
