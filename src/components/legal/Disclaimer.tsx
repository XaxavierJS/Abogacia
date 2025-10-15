import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  type?: 'general' | 'testimonial' | 'chatbot' | 'case-result';
  className?: string;
}

export default function Disclaimer({ type = 'general', className = '' }: DisclaimerProps) {
  const getDisclaimerText = () => {
    switch (type) {
      case 'testimonial':
        return "Los resultados pueden variar. Cada caso es único y no garantizamos resultados específicos.";
      case 'chatbot':
        return "Este chatbot NO proporciona asesoría legal. No crea relación abogado-cliente. No envíe información confidencial.";
      case 'case-result':
        return "Los resultados mostrados son de casos específicos. Cada situación legal es única y los resultados pueden variar.";
      default:
        return "La información en este sitio es solo para fines informativos y no constituye asesoría legal.";
    }
  };

  const getDisclaimerIcon = () => {
    switch (type) {
      case 'chatbot':
        return <AlertTriangle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />;
      case 'testimonial':
      case 'case-result':
        return <AlertTriangle className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />;
    }
  };

  const getDisclaimerStyle = () => {
    switch (type) {
      case 'chatbot':
        return "bg-red-50 border-l-4 border-red-400 p-4";
      case 'testimonial':
      case 'case-result':
        return "bg-amber-50 border-l-4 border-amber-400 p-4";
      default:
        return "bg-primary-50 border-l-4 border-primary-400 p-4";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'chatbot':
        return "text-red-800";
      case 'testimonial':
      case 'case-result':
        return "text-amber-800";
      default:
        return "text-primary-800";
    }
  };

  return (
    <div className={`${getDisclaimerStyle()} ${className}`}>
      <div className="flex">
        {getDisclaimerIcon()}
        <p className={`text-sm ${getTextColor()}`}>
          <strong>AVISO LEGAL:</strong> {getDisclaimerText()}
        </p>
      </div>
    </div>
  );
}
