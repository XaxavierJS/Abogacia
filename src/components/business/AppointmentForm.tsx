import { useState } from 'react';
import { useForm } from 'node_modules/react-hook-form/dist';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentFormSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TIME_SLOTS, PRACTICE_AREAS } from '@/lib/constants';
import Disclaimer from '@/components/legal/Disclaimer';

const services = PRACTICE_AREAS.map(area => ({
  value: area.id,
  label: area.name
}));

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  privacy: boolean;
}

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema)
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simular envío de la cita
      console.log('Datos de la cita:', data);
      
      // Aquí iría la integración con el CRM
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      reset();
      setSelectedDate(undefined);
    } catch (error) {
      console.error('Error al enviar cita:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-700">¡Cita Solicitada!</h3>
          <p className="text-green-600">
            Hemos recibido tu solicitud de cita. Te contactaremos en las próximas 24 horas 
            para confirmar la fecha y hora.
          </p>
          <Button 
            onClick={() => setSubmitStatus('idle')} 
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            Solicitar Otra Cita
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Agenda tu Consulta</h2>
        <p className="text-gray-600">
          Completa el formulario para solicitar una consulta legal gratuita de 30 minutos.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información Personal */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="h-5 w-5 mr-2 text-primary-600" />
            Información Personal
          </h3>
          
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

        {/* Detalles de la Cita */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-primary-600" />
            Detalles de la Cita
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Servicio *</label>
              <Select onValueChange={(value) => setValue('service', value)}>
                <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecciona un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && (
                <p className="form-error">{errors.service.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Fecha *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      errors.date ? 'border-red-500' : ''
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : 'Selecciona fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setValue('date', date?.toISOString() || '');
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="form-error">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Hora *</label>
            <Select onValueChange={(value) => setValue('time', value)}>
              <SelectTrigger className={errors.time ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecciona hora" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.time && (
              <p className="form-error">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Información Adicional */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary-600" />
            Información Adicional
          </h3>
          
          <div>
            <label className="form-label">Mensaje adicional</label>
            <Textarea
              {...register('message')}
              placeholder="Describe brevemente tu consulta legal..."
              rows={4}
            />
          </div>
        </div>

        {/* Consentimiento */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              {...register('privacy')}
              className={errors.privacy ? 'border-red-500' : ''}
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
              *
            </label>
          </div>
          {errors.privacy && (
            <p className="form-error">{errors.privacy.message}</p>
          )}
        </div>

        {/* Botón de Envío */}
        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar Cita'}
        </Button>

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">
              Error al enviar la solicitud. Por favor, inténtalo de nuevo o contacta directamente.
            </p>
          </div>
        )}
      </form>

      {/* Disclaimer */}
      <div className="mt-6">
        <Disclaimer type="general" />
      </div>
    </div>
  );
}
