// Get base URL for proper path resolution
const BASE_URL = import.meta.env.BASE_URL || '/';

// Export BASE_URL for use in other components
export { BASE_URL };

// Site Configuration
export const SITE_CONFIG = {
  name: "Tu Despacho Legal",
  description: "Experiencia, Eficiencia y Confianza garantizada. Despacho jurídico especializado con amplia experiencia en derecho familiar, penal, laboral y civil.",
  url: "https://tu-despacho-legal.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/tu_despacho",
    linkedin: "https://www.linkedin.com/company/tu-despacho",
    facebook: "https://www.facebook.com/tu.despacho"
  }
} as const;

// Contact Information
export const CONTACT_INFO = {
  phone: "+00 000 0000000",
  phoneMobile: "+00 0 00000000",
  email: "contacto@tu-despacho.com",
  address: {
    street: "Calle Principal #123",
    building: "Edificio Centro Legal",
    city: "Tu Ciudad",
    country: "País",
    full: "Calle Principal #123, Edificio Centro Legal, Tu Ciudad"
  },
  hours: {
    weekdays: "9:00 - 18:00",
    saturday: "9:00 - 13:00",
    sunday: "Cerrado"
  }
} as const;

// Practice Areas
export const PRACTICE_AREAS = [
  {
    id: "derecho-familiar",
    name: "Derecho de Familia",
    description: "Divorcios, custodia, pensión alimenticia, violencia intrafamiliar y mediación familiar.",
    icon: "users",
    slug: `${BASE_URL}derecho-familiar`,
    services: [
      "Divorcios de Común Acuerdo",
      "Divorcios Unilaterales", 
      "Divorcios Culposos",
      "Nulidad del matrimonio",
      "Compensación económica",
      "Cese de convivencia",
      "Separaciones Judiciales",
      "Pensiones de Alimentos",
      "Cobro de pensiones alimenticias adeudas",
      "Rebaja / Aumento de pensión de alimentos",
      "Demanda cese de alimentos",
      "Declaración de bien familiar",
      "Cuidado Personal (Tuición)",
      "Relación Directa y Regular (Visitas)",
      "Acciones de filiación (Reconocimiento, impugnación y nulidad de reconocimiento de paternidad)",
      "Medidas de Protección por vulneración de derechos de los niños y niñas",
      "Autorización para salida de menores del país",
      "Delitos cometidos por menores de edad",
      "Violencia intrafamiliar",
      "Regímenes matrimoniales (sociedad conyugal, separación de bienes y participación en los gananciales)",
      "Patria Potestad",
      "Mediación familiar",
      "Acuerdo de unión civil"
    ]
  },
  {
    id: "derecho-penal",
    name: "Derecho Penal",
    description: "Defensa penal especializada en delitos económicos, sexuales, violentos y tráfico de drogas.",
    icon: "shield",
    slug: `${BASE_URL}derecho-penal`,
    services: [
      "Delitos económicos",
      "Delitos sexuales",
      "Delitos violentos",
      "Delitos por tráfico de drogas y estupefacientes",
      "Eliminación de antecedentes penales"
    ]
  },
  {
    id: "derecho-laboral",
    name: "Derecho del Trabajo",
    description: "Protección de derechos laborales, despidos injustificados y asesoría empresarial.",
    icon: "briefcase",
    slug: `${BASE_URL}derecho-laboral`,
    services: [
      "Audiencias de conciliación laboral ante la Inspección del Trabajo",
      "Tutela por vulneración de derechos fundamentales del trabajador",
      "Acoso laboral",
      "Garantía de indemnidad (represalias en contra de trabajadores)",
      "Despido injustificado, indebidos e improcedentes",
      "Autodespidos o Despido Indirecto",
      "Nulidad de despido",
      "Cobro de prestaciones y de remuneraciones adeudadas",
      "Demanda de indemnización por accidente del trabajo o enfermedad profesional",
      "Tramitación ante la Superintendencia de Seguridad Social",
      "Gestiones ante la Comisión de medicina preventiva e invalidez (COMPIN)",
      "Gestiones ante Comisiones médicas regionales y Comisión médica central",
      "Apelación de licencias",
      "Protección del Fuero Maternal",
      "Constitución y asesoría a sindicatos y otras organizaciones",
      "Asesoría en negociaciones colectivas",
      "Asesoría en convenios colectivos",
      "Asesoría a contratistas"
    ]
  },
  {
    id: "derecho-civil",
    name: "Derecho Civil",
    description: "Contratos, responsabilidad civil, sucesiones, arrendamientos y cobranzas.",
    icon: "file-text",
    slug: `${BASE_URL}derecho-civil`,
    services: [
      "Juicios de arrendamiento",
      "Juicios ejecutivos y cobranzas de pagaré, letras de cambio, cheques, facturas y otros documentos mercantiles",
      "Embargos",
      "Demandas de indemnización de perjuicios",
      "Defensa de deudores",
      "Tercerías",
      "Partición de herencias",
      "Interdicciones",
      "Redacción de contratos y escrituras",
      "Estudio de títulos",
      "Rectificación de la partida de nacimiento y cambio de nombre",
      "Juicios de precario",
      "Compraventa de inmueble",
      "Redacción de testamento",
      "Cesión de derechos",
      "Posesión efectiva",
      "Denuncias por infracción a la Ley de Pesca",
      "Regularización de propiedad"
    ]
  },
  {
    id: "derecho-empresarial",
    name: "Derecho Empresarial",
    description: "Constitución de sociedades, contratos comerciales y asesoría empresarial integral.",
    icon: "building",
    slug: `${BASE_URL}derecho-empresarial`,
    services: [
      "Constitución y modificación de sociedades",
      "Confección y revisión de contratos mercantiles",
      "Evaluación y preparación de convenios preventivos de quiebra",
      "Redacción de contratos mercantiles",
      "Ejecución de contratos mercantiles",
      "Asesoría jurídica en contratación de personal"
    ]
  },
  {
    id: "justicia-local",
    name: "Justicia Local",
    description: "Accidentes de tránsito, derechos del consumidor, ley de copropiedad y multas municipales.",
    icon: "home",
    slug: `${BASE_URL}justicia-local`,
    services: [
      "Accidentes de tránsito",
      "Derechos del consumidor",
      "Ley de Copropiedad",
      "Ley General de Urbanismo y Construcciones",
      "Ley de rentas municipales",
      "Multas por ordenanzas municipales",
      "Litigación en Tribunales Superiores de Justicia",
      "Recursos, presentaciones y alegatos de conocimiento de la Corte Suprema de Justicia y de Cortes de Apelaciones"
    ]
  }
] as const;

// Navigation Menu
export const NAVIGATION = [
  { name: "Inicio", href: BASE_URL },
  { name: "Sobre Nosotros", href: "#sobre-nosotros" },
  { name: "Contacto", href: "#contacto" }
] as const;

// Legal Pages
export const LEGAL_PAGES = [
  { name: "Política de Privacidad", href: `${BASE_URL}legal/privacidad` },
  { name: "Términos de Servicio", href: `${BASE_URL}legal/terminos` },
  { name: "Aviso Legal", href: `${BASE_URL}legal/aviso-legal` },
  { name: "Política de Cookies", href: `${BASE_URL}legal/cookies` }
] as const;

// Time Slots for Appointments
export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
] as const;

// Urgency Levels
export const URGENCY_LEVELS = [
  { value: "low", label: "Baja - Puede esperar" },
  { value: "medium", label: "Media - En las próximas semanas" },
  { value: "high", label: "Alta - Urgente" },
  { value: "emergency", label: "Emergencia - Inmediato" }
] as const;

// Contact Methods
export const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Teléfono" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "any", label: "Cualquiera" }
] as const;

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/tu.despacho",
  twitter: "https://twitter.com/tu_despacho",
  linkedin: "https://www.linkedin.com/company/tu-despacho",
  instagram: "https://www.instagram.com/tu.despacho"
} as const;

// SEO Keywords
export const SEO_KEYWORDS = {
  primary: ["abogado", "despacho jurídico", "consulta legal"],
  laboral: ["abogado laboral", "despido injustificado", "derechos del trabajador"],
  familiar: ["abogado familiar", "divorcio", "custodia de hijos"],
  penal: ["abogado penal", "defensa penal", "delitos económicos"],
  civil: ["abogado civil", "contratos", "responsabilidad civil"],
  empresarial: ["abogado empresarial", "constitución sociedades", "contratos comerciales"],
  local: ["abogado justicia local", "accidentes tránsito", "derechos consumidor"]
} as const;

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  required: "Este campo es obligatorio",
  email: "Por favor ingresa un email válido",
  phone: "Por favor ingresa un teléfono válido",
  minLength: (min: number) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max: number) => `No puede tener más de ${max} caracteres`,
  privacy: "Debes aceptar la política de privacidad"
} as const;
