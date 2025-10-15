import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie, Shield, Settings } from 'lucide-react';

export default function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }));
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }));
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-preferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 opacity-100">
      <div className="container-custom">
        <div className="py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-2 mb-2">
                <Cookie className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold text-slate-900">Uso de Cookies</h3>
              </div>
              
              <p className="text-sm text-slate-600 mb-3">
                Utilizamos cookies para mejorar su experiencia, analizar el tráfico y personalizar contenido. 
                Al continuar navegando, acepta nuestro uso de cookies.
              </p>

              {showDetails && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-success-600" />
                      <span className="text-sm text-slate-700">Cookies Necesarias</span>
                    </div>
                    <span className="text-xs text-slate-500">Siempre activas</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-primary-600" />
                      <span className="text-sm text-slate-700">Cookies de Análisis</span>
                    </div>
                    <span className="text-xs text-slate-500">Opcional</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cookie className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-slate-700">Cookies de Marketing</span>
                    </div>
                    <span className="text-xs text-slate-500">Opcional</span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4 mt-4">
                <a 
                  href="/legal/privacidad" 
                  className="text-sm text-primary-600 hover:underline"
                >
                  Política de Privacidad
                </a>
                <a 
                  href="/legal/cookies" 
                  className="text-sm text-primary-600 hover:underline"
                >
                  Política de Cookies
                </a>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-slate-600 hover:text-slate-800"
                  aria-label="Mostrar más detalles sobre privacidad"
                >
                  {showDetails ? 'Menos detalles' : 'Más detalles'}
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-2 ml-4">
              <Button 
                onClick={acceptAll}
                size="sm"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs px-4 py-2"
              >
                Aceptar Todas
              </Button>
              
              <Button 
                onClick={acceptNecessary}
                variant="outline"
                size="sm"
                className="border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold text-xs px-4 py-2"
              >
                Solo Necesarias
              </Button>
              
              <Button 
                onClick={rejectAll}
                variant="outline"
                size="sm"
                className="border-slate-400 text-slate-700 hover:bg-slate-50 font-semibold text-xs px-4 py-2"
              >
                Rechazar
              </Button>
              
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="text-xs px-2 py-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
