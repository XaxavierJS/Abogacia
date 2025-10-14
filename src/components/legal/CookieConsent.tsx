import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Cookie, Shield, BarChart3, Target, Settings } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    } else {
      const savedPreferences = localStorage.getItem('cookie-preferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Always true
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(allAccepted));
    setShowConsent(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setShowConsent(false);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-preferences', JSON.stringify(onlyNecessary));
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <Dialog open={showConsent} onOpenChange={setShowConsent}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Cookie className="h-6 w-6 text-primary-600" />
            <span>Configuración de Cookies</span>
          </DialogTitle>
          <DialogDescription>
            Gestiona tus preferencias de cookies para personalizar tu experiencia en nuestro sitio web.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cookie Types */}
          <div className="space-y-4">
            {/* Necessary Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Cookies Necesarias</h3>
                </div>
                <Checkbox checked={true} disabled className="opacity-50" />
              </div>
              <p className="text-sm text-gray-600">
                Estas cookies son esenciales para el funcionamiento del sitio web y no pueden ser desactivadas.
                Incluyen cookies de sesión, seguridad y funcionalidad básica.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Cookies de Análisis</h3>
                </div>
                <Checkbox 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => handlePreferenceChange('analytics', checked as boolean)}
                />
              </div>
              <p className="text-sm text-gray-600">
                Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web 
                recopilando información de forma anónima.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Cookies de Marketing</h3>
                </div>
                <Checkbox 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => handlePreferenceChange('marketing', checked as boolean)}
                />
              </div>
              <p className="text-sm text-gray-600">
                Se utilizan para mostrar contenido relevante y personalizado, 
                así como para medir la efectividad de nuestras campañas.
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Cookies de Funcionalidad</h3>
                </div>
                <Checkbox 
                  checked={preferences.functional}
                  onCheckedChange={(checked) => handlePreferenceChange('functional', checked as boolean)}
                />
              </div>
              <p className="text-sm text-gray-600">
                Mejoran la funcionalidad del sitio web recordando sus preferencias 
                y configuraciones personalizadas.
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Para más información sobre cómo utilizamos las cookies:
            </p>
            <div className="flex flex-wrap gap-4">
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
              <a 
                href="/legal/terminos" 
                className="text-sm text-primary-600 hover:underline"
              >
                Términos de Servicio
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              onClick={acceptAll}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold"
            >
              Aceptar Todas
            </Button>
            <Button 
              onClick={acceptSelected}
              variant="outline"
              className="flex-1 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold"
            >
              Guardar Preferencias
            </Button>
            <Button 
              onClick={rejectAll}
              variant="outline"
              className="flex-1 border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Solo Necesarias
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
