import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '../../lib/validations';
import { CONTACT_INFO, PRACTICE_AREAS } from '../../lib/constants';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertCircle, CheckCircle, Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
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

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simular envío del formulario
      console.log('Datos del formulario:', data);
      
      // Aquí iría la integración con el CRM y email service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700">¡Mensaje Enviado!</h3>
            <p className="text-gray-600">
              Hemos recibido tu consulta. Te contactaremos en las próximas 24 horas 
              según tu método de contacto preferido.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => setSubmitStatus('idle')} 
                variant="outline"
                className="mr-2"
              >
                Enviar Otro Mensaje
              </Button>
              <Button asChild>
                <a href="/#servicios">Ver Nuestros Servicios</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información de Contacto */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary-600" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm text-gray-600">{CONTACT_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-sm text-gray-600">
                    {CONTACT_INFO.address.full}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary-600" />
                Horarios de Atención
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                  <span className="text-gray-500">Cerrado</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Emergencias:</strong> Disponible 24/7 para casos urgentes
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consulta Gratuita</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Ofrecemos una consulta inicial gratuita de 30 minutos para evaluar tu caso.
              </p>
              <Button asChild className="w-full">
                <a href="/contacto#appointment">Agendar Consulta</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <p className="text-sm text-gray-600">
                Completa el formulario y te contactaremos pronto. Todos los campos marcados con * son obligatorios.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Información Personal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Nombre completo *</label>
                      <Input
                        {...register('name')}
                        placeholder="Tu nombre completo"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="form-error">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Email *</label>
                      <Input
                        type="email"
                        {...register('email')}
                        placeholder="tu@email.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="form-error">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Teléfono *</label>
                    <Input
                      type="tel"
                      {...register('phone')}
                      placeholder="+56 9 1234 5678"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="form-error">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Detalles de la Consulta */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Detalles de la Consulta</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Área de Práctica</label>
                      <Select onValueChange={(value) => setValue('practiceArea', value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Selecciona un área" />
                        </SelectTrigger>
                        <SelectContent>
                          {practiceAreas.map((area) => (
                            <SelectItem key={area.value} value={area.value}>
                              {area.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="form-label">Nivel de Urgencia</label>
                      <Select onValueChange={(value) => setValue('urgency', value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Selecciona urgencia" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Asunto *</label>
                    <Input
                      {...register('subject')}
                      placeholder="¿En qué podemos ayudarte?"
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="form-error">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Mensaje *</label>
                    <Textarea
                      {...register('message')}
                      placeholder="Describe tu consulta legal de manera detallada..."
                      rows={6}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="form-error">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                {/* Preferencias de Contacto */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Preferencias de Contacto</h3>
                  
                  <div>
                    <label className="form-label">Método de Contacto Preferido</label>
                    <Select onValueChange={(value) => setValue('contactMethod', value)}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="¿Cómo prefieres que te contactemos?" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Consentimiento */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      {...register('privacyConsent')}
                      className={errors.privacyConsent ? 'border-red-500' : ''}
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
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
                  {errors.privacyConsent && (
                    <p className="form-error">{errors.privacyConsent.message}</p>
                  )}
                </div>

                {/* Botón de Envío */}
                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">Error al enviar el mensaje. Inténtalo de nuevo o contacta directamente.</p>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8">
        <Disclaimer type="general" />
      </div>
    </div>
  );
}
