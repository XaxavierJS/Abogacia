import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

const requiredBusinessComponents = [
  'src/components/business/AppointmentForm.tsx',
  'src/components/business/ContactForm.tsx',
  'src/components/business/ClientPortal.tsx'
];

const requiredBusinessLib = [
  'src/lib/business/crm.ts',
  'src/lib/business/email.ts',
  'src/lib/business/notifications.ts'
];

const requiredBusinessPages = [
  'src/pages/contacto.astro',
  'src/pages/areas/index.astro',
  'src/pages/equipo/index.astro'
];

console.log('🔍 Verificando funcionalidades de negocio...\n');

let allPassed = true;

// Verificar componentes de negocio
console.log('🧩 Verificando componentes de negocio:');
for (const component of requiredBusinessComponents) {
  if (existsSync(component)) {
    try {
      const content = readFileSync(component, 'utf-8');
      const hasContent = content.length > 100; // Más que solo un archivo vacío
      
      if (hasContent) {
        console.log(`✅ ${component} - Implementado`);
      } else {
        console.log(`⚠️ ${component} - Archivo vacío`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${component} - Error al leer`);
      allPassed = false;
    }
  } else {
    console.log(`❌ ${component} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar librerías de negocio
console.log('\n📚 Verificando librerías de negocio:');
for (const libFile of requiredBusinessLib) {
  if (existsSync(libFile)) {
    try {
      const content = readFileSync(libFile, 'utf-8');
      const hasContent = content.length > 100;
      
      if (hasContent) {
        console.log(`✅ ${libFile} - Implementado`);
      } else {
        console.log(`⚠️ ${libFile} - Archivo vacío`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${libFile} - Error al leer`);
      allPassed = false;
    }
  } else {
    console.log(`❌ ${libFile} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar páginas de negocio
console.log('\n📄 Verificando páginas de negocio:');
for (const page of requiredBusinessPages) {
  if (existsSync(page)) {
    try {
      const content = readFileSync(page, 'utf-8');
      const hasContent = content.length > 200;
      
      if (hasContent) {
        console.log(`✅ ${page} - Implementado`);
      } else {
        console.log(`⚠️ ${page} - Contenido mínimo`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${page} - Error al leer`);
      allPassed = false;
    }
  } else {
    console.log(`❌ ${page} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar funcionalidades específicas
console.log('\n⚙️ Verificando funcionalidades específicas:');

// Verificar formulario de citas
if (existsSync('src/components/business/AppointmentForm.tsx')) {
  try {
    const content = readFileSync('src/components/business/AppointmentForm.tsx', 'utf-8');
    const appointmentFeatures = [
      'useForm',
      'zodResolver',
      'appointmentFormSchema',
      'date',
      'time',
      'service'
    ];
    
    const foundFeatures = appointmentFeatures.filter(feature => content.includes(feature));
    console.log(`✅ Formulario de citas: ${foundFeatures.length}/${appointmentFeatures.length} características`);
    
    if (foundFeatures.length < appointmentFeatures.length * 0.7) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar formulario de citas`);
    allPassed = false;
  }
}

// Verificar formulario de contacto
if (existsSync('src/components/business/ContactForm.tsx')) {
  try {
    const content = readFileSync('src/components/business/ContactForm.tsx', 'utf-8');
    const contactFeatures = [
      'useForm',
      'contactFormSchema',
      'name',
      'email',
      'phone',
      'message'
    ];
    
    const foundFeatures = contactFeatures.filter(feature => content.includes(feature));
    console.log(`✅ Formulario de contacto: ${foundFeatures.length}/${contactFeatures.length} características`);
    
    if (foundFeatures.length < contactFeatures.length * 0.7) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar formulario de contacto`);
    allPassed = false;
  }
}

// Verificar portal de clientes
if (existsSync('src/components/business/ClientPortal.tsx')) {
  try {
    const content = readFileSync('src/components/business/ClientPortal.tsx', 'utf-8');
    const portalFeatures = [
      'useState',
      'isAuthenticated',
      'clientId',
      'password',
      'cases',
      'documents'
    ];
    
    const foundFeatures = portalFeatures.filter(feature => content.includes(feature));
    console.log(`✅ Portal de clientes: ${foundFeatures.length}/${portalFeatures.length} características`);
    
    if (foundFeatures.length < portalFeatures.length * 0.7) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar portal de clientes`);
    allPassed = false;
  }
}

// Verificar integración CRM
if (existsSync('src/lib/business/crm.ts')) {
  try {
    const content = readFileSync('src/lib/business/crm.ts', 'utf-8');
    const crmFeatures = [
      'CRMService',
      'createLead',
      'createAppointment',
      'getLeads',
      'updateLeadStatus'
    ];
    
    const foundFeatures = crmFeatures.filter(feature => content.includes(feature));
    console.log(`✅ Integración CRM: ${foundFeatures.length}/${crmFeatures.length} características`);
    
    if (foundFeatures.length < crmFeatures.length * 0.7) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar integración CRM`);
    allPassed = false;
  }
}

// Verificar servicio de email
if (existsSync('src/lib/business/email.ts')) {
  try {
    const content = readFileSync('src/lib/business/email.ts', 'utf-8');
    const emailFeatures = [
      'EmailService',
      'sendAppointmentConfirmation',
      'sendContactConfirmation',
      'template',
      'sendEmail'
    ];
    
    const foundFeatures = emailFeatures.filter(feature => content.includes(feature));
    console.log(`✅ Servicio de email: ${foundFeatures.length}/${emailFeatures.length} características`);
    
    if (foundFeatures.length < emailFeatures.length * 0.7) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar servicio de email`);
    allPassed = false;
  }
}

// Verificar configuración de formularios
console.log('\n📋 Verificando configuración de formularios:');
if (existsSync('src/lib/validations.ts')) {
  try {
    const content = readFileSync('src/lib/validations.ts', 'utf-8');
    const validationSchemas = [
      'contactFormSchema',
      'appointmentFormSchema',
      'newsletterSchema',
      'clientLoginSchema',
      'fileUploadSchema'
    ];
    
    const foundSchemas = validationSchemas.filter(schema => content.includes(schema));
    console.log(`✅ Esquemas de validación: ${foundSchemas.length}/${validationSchemas.length}`);
    
    if (foundSchemas.length < validationSchemas.length) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar esquemas de validación`);
    allPassed = false;
  }
}

// Verificar integración con constantes
console.log('\n📊 Verificando configuración de constantes:');
if (existsSync('src/lib/constants.ts')) {
  try {
    const content = readFileSync('src/lib/constants.ts', 'utf-8');
    const businessConstants = [
      'PRACTICE_AREAS',
      'CONTACT_INFO',
      'TIME_SLOTS',
      'URGENCY_LEVELS',
      'CONTACT_METHODS'
    ];
    
    const foundConstants = businessConstants.filter(constant => content.includes(constant));
    console.log(`✅ Constantes de negocio: ${foundConstants.length}/${businessConstants.length}`);
    
    if (foundConstants.length < businessConstants.length) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar constantes de negocio`);
    allPassed = false;
  }
}

// Resumen final
console.log('\n📊 Resumen de Funcionalidades de Negocio:');
console.log(`🧩 Componentes: ${requiredBusinessComponents.filter(comp => existsSync(comp)).length}/${requiredBusinessComponents.length}`);
console.log(`📚 Librerías: ${requiredBusinessLib.filter(lib => existsSync(lib)).length}/${requiredBusinessLib.length}`);
console.log(`📄 Páginas: ${requiredBusinessPages.filter(page => existsSync(page)).length}/${requiredBusinessPages.length}`);

if (allPassed) {
  console.log('\n✅ Funcionalidades de negocio verificadas exitosamente');
  console.log('🎉 El sitio tiene las funcionalidades de negocio requeridas');
  process.exit(0);
} else {
  console.log('\n❌ Funcionalidades de negocio incompletas');
  console.log('⚠️ Se encontraron elementos faltantes o incompletos');
  process.exit(1);
}
