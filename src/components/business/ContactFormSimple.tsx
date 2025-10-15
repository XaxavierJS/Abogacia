import { useState } from 'react';
import { CONTACT_INFO, PRACTICE_AREAS } from '../../lib/constants';
import Disclaimer from '../legal/Disclaimer';

const urgencyLevels = [
  { value: 'low', label: 'Baja - Puede esperar' },
  { value: 'medium', label: 'Media - En las próximas semanas' },
  { value: 'high', label: 'Alta - Urgente' },
  { value: 'emergency', label: 'Emergencia - Inmediato' }
];

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Teléfono' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'any', label: 'Cualquiera' }
];

const practiceAreas = PRACTICE_AREAS.map(a => ({ value: a.id, label: a.name }));

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  urgency: string;
  practiceArea: string;
  contactMethod: string;
  privacyConsent: boolean;
}

export default function ContactFormSimple() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      urgency: formData.get('urgency') as string,
      practiceArea: formData.get('practiceArea') as string,
      contactMethod: formData.get('contactMethod') as string,
      privacyConsent: formData.get('privacyConsent') === 'on'
    };
    
    try {
      // Simular envío del formulario
      console.log('Datos del formulario:', data);
      
      // Aquí iría la integración con el CRM y email service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success-100 rounded-full mx-auto flex items-center justify-center">
            <svg className="h-8 w-8 text-success-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-success-700">¡Mensaje Enviado!</h3>
          <p className="text-slate-600">
            Hemos recibido tu consulta. Te contactaremos en las próximas 24 horas 
            según tu método de contacto preferido.
          </p>
          <div className="space-y-2">
            <button 
              onClick={() => setSubmitStatus('idle')} 
              className="mr-2 px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
              aria-label="Enviar otro mensaje de contacto"
            >
              Enviar Otro Mensaje
            </button>
            <a href="/#servicios" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Ver Nuestros Servicios
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información de Contacto */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              Información de Contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm text-slate-600">{CONTACT_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-slate-600">{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-sm text-slate-600">
                    {CONTACT_INFO.address.full}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              Horarios de Atención
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lunes - Viernes</span>
                <span className="font-medium">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span className="font-medium">9:00 - 13:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos</span>
                <span className="text-slate-500">Cerrado</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-800">
                <strong>Emergencias:</strong> Disponible 24/7 para casos urgentes
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Consulta Gratuita</h3>
            <p className="text-sm text-slate-600 mb-4">
              Completa el formulario y te contactaremos para evaluar tu caso.
            </p>
            <a href="/contacto#appointment" className="w-full inline-block text-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Agendar Consulta
            </a>
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Envíanos un Mensaje</h3>
            <p className="text-sm text-slate-600 mb-6">
              Completa el formulario y te contactaremos pronto. Todos los campos marcados con * son obligatorios.
            </p>
            
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">Información Personal</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Tu nombre completo"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+56 9 1234 5678"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Detalles de la Consulta */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">Detalles de la Consulta</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="practiceArea" className="block text-sm font-medium text-slate-700 mb-1">
                      Área de Práctica
                    </label>
                    <select
                      id="practiceArea"
                      name="practiceArea"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      <option value="">Selecciona un área</option>
                      {practiceAreas.map((area) => (
                        <option key={area.value} value={area.value}>
                          {area.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-slate-700 mb-1">
                      Nivel de Urgencia
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      <option value="">Selecciona urgencia</option>
                      {urgencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Describe tu consulta legal de manera detallada..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              {/* Preferencias de Contacto */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">Preferencias de Contacto</h4>
                
                <div>
                  <label htmlFor="contactMethod" className="block text-sm font-medium text-slate-700 mb-1">
                    Método de Contacto Preferido
                  </label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    <option value="">¿Cómo prefieres que te contactemos?</option>
                    {contactMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consentimiento */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacyConsent"
                    required
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-slate-600">
                    Acepto la{' '}
                    <a href="/legal/privacidad" className="text-primary-600 hover:underline">
                      Política de Privacidad
                    </a>{' '}
                    y los{' '}
                    <a href="/legal/terminos" className="text-primary-600 hover:underline">
                      Términos de Servicio
                    </a>
                    . Entiendo que esta consulta no constituye asesoría legal hasta firmar un contrato de representación. *
                  </label>
                </div>
              </div>

              {/* Botón de Envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Enviar formulario de contacto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                    Enviar Mensaje
                  </>
                )}
              </button>

              {submitStatus === 'error' && (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-error-600">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-sm">Error al enviar el mensaje. Inténtalo de nuevo o contacta directamente.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8">
        <Disclaimer type="general" />
      </div>
    </div>
  );
}
