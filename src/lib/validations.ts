import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  email: z.string()
    .email('Por favor ingresa un email válido')
    .max(254, 'El email no puede tener más de 254 caracteres'),
  
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede tener más de 15 caracteres')
    .regex(/^(\+56\s?)?[2-9]\d{8}$/, 'Por favor ingresa un teléfono chileno válido'),
  
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(200, 'El asunto no puede tener más de 200 caracteres'),
  
  message: z.string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(2000, 'El mensaje no puede tener más de 2000 caracteres'),
  
  urgency: z.enum(['low', 'medium', 'high', 'emergency']).optional(),
  
  practiceArea: z.string().optional(),
  
  contactMethod: z.enum(['email', 'phone', 'whatsapp', 'any']).optional(),
  
  privacyConsent: z.boolean()
    .refine(val => val === true, 'Debes aceptar la política de privacidad'),
  
  marketing: z.boolean().optional()
});

// Appointment form validation schema
export const appointmentFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  email: z.string()
    .email('Por favor ingresa un email válido')
    .max(254, 'El email no puede tener más de 254 caracteres'),
  
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede tener más de 15 caracteres')
    .regex(/^(\+56\s?)?[2-9]\d{8}$/, 'Por favor ingresa un teléfono chileno válido'),
  
  service: z.string()
    .min(1, 'Debes seleccionar un servicio')
    .refine(val => [
      'consulta-general',
      'derecho-laboral',
      'derecho-familiar',
      'derecho-penal',
      'derecho-civil',
      'derecho-comercial'
    ].includes(val), 'Servicio no válido'),
  
  date: z.string()
    .min(1, 'Debes seleccionar una fecha')
    .refine(val => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'La fecha debe ser hoy o en el futuro'),
  
  time: z.string()
    .min(1, 'Debes seleccionar una hora')
    .refine(val => {
      const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
      ];
      return timeSlots.includes(val);
    }, 'Hora no válida'),
  
  message: z.string()
    .max(500, 'El mensaje no puede tener más de 500 caracteres')
    .optional(),
  
  privacy: z.boolean()
    .refine(val => val === true, 'Debes aceptar la política de privacidad')
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string()
    .email('Por favor ingresa un email válido')
    .max(254, 'El email no puede tener más de 254 caracteres'),
  
  interests: z.array(z.string()).optional(),
  
  privacy: z.boolean()
    .refine(val => val === true, 'Debes aceptar la política de privacidad')
});

// Client portal login schema
export const clientLoginSchema = z.object({
  clientId: z.string()
    .min(3, 'El ID de cliente debe tener al menos 3 caracteres')
    .max(50, 'El ID de cliente no puede tener más de 50 caracteres')
    .regex(/^[a-zA-Z0-9-_]+$/, 'El ID de cliente solo puede contener letras, números, guiones y guiones bajos'),
  
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'La contraseña no puede tener más de 128 caracteres')
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, 'El archivo no puede ser mayor a 10MB')
    .refine(file => {
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      return allowedTypes.includes(file.type);
    }, 'Tipo de archivo no permitido'),
  
  description: z.string()
    .max(200, 'La descripción no puede tener más de 200 caracteres')
    .optional()
});

// Custom validation functions
export const validateChileanRUT = (rut: string): boolean => {
  // Remove dots and hyphens
  const cleanRUT = rut.replace(/[.-]/g, '');
  
  // Check format
  if (!/^\d{7,8}[0-9kK]$/.test(cleanRUT)) {
    return false;
  }
  
  // Extract number and check digit
  const number = cleanRUT.slice(0, -1);
  const checkDigit = cleanRUT.slice(-1).toUpperCase();
  
  // Calculate check digit
  let sum = 0;
  let multiplier = 2;
  
  for (let i = number.length - 1; i >= 0; i--) {
    sum += parseInt(number[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const calculatedCheckDigit = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();
  
  return checkDigit === calculatedCheckDigit;
};

export const validateAge = (birthDate: string, minAge: number = 18): boolean => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
};

export const validateBusinessHours = (date: string, time: string): boolean => {
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();
  const hour = parseInt(time.split(':')[0]);
  const minute = parseInt(time.split(':')[1]);
  
  // Check if it's a weekday (Monday = 1, Friday = 5)
  if (dayOfWeek < 1 || dayOfWeek > 5) {
    return false;
  }
  
  // Check if it's within business hours (9:00 - 18:00)
  const totalMinutes = hour * 60 + minute;
  const startMinutes = 9 * 60; // 9:00 AM
  const endMinutes = 18 * 60; // 6:00 PM
  
  return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
};

// Error message translations
export const validationMessages = {
  required: 'Este campo es obligatorio',
  email: 'Por favor ingresa un email válido',
  phone: 'Por favor ingresa un teléfono válido',
  minLength: (min: number) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max: number) => `No puede tener más de ${max} caracteres`,
  privacy: 'Debes aceptar la política de privacidad',
  rut: 'RUT chileno inválido',
  age: (min: number) => `Debes tener al menos ${min} años`,
  businessHours: 'La cita debe ser en horario de atención (Lun-Vie 9:00-18:00)',
  fileSize: (max: number) => `El archivo no puede ser mayor a ${max}MB`,
  fileType: 'Tipo de archivo no permitido'
};

// Form validation helper
export const validateForm = async <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}> => {
  try {
    const validatedData = await schema.parseAsync(data);
    return {
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      
      return {
        success: false,
        errors
      };
    }
    
    return {
      success: false,
      errors: { general: ['Error de validación desconocido'] }
    };
  }
};
