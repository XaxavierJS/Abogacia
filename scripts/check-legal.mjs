import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

const requiredPages = [
  'src/pages/legal/privacidad.astro',
  'src/pages/legal/terminos.astro',
  'src/pages/legal/aviso-legal.astro',
  'src/pages/legal/cookies.astro'
];

const requiredComponents = [
  'src/components/legal/Disclaimer.tsx',
  'src/components/legal/PrivacyNotice.tsx',
  'src/components/legal/CookieConsent.tsx'
];

const requiredLibFiles = [
  'src/lib/security.ts',
  'src/lib/ssl.ts',
  'src/lib/validations.ts',
  'src/lib/gdpr.ts'
];

const requiredContent = [
  'política de privacidad',
  'términos de servicio',
  'aviso legal',
  'cookies',
  'disclaimer',
  'gdpr',
  'ccpa'
];

console.log('🔍 Verificando compliance legal...\n');

let allPassed = true;

// Verificar páginas legales
console.log('📄 Verificando páginas legales:');
for (const page of requiredPages) {
  if (existsSync(page)) {
    console.log(`✅ ${page}`);
  } else {
    console.log(`❌ ${page} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar componentes legales
console.log('\n🧩 Verificando componentes legales:');
for (const component of requiredComponents) {
  if (existsSync(component)) {
    console.log(`✅ ${component}`);
  } else {
    console.log(`❌ ${component} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar archivos de librería
console.log('\n📚 Verificando archivos de librería:');
for (const libFile of requiredLibFiles) {
  if (existsSync(libFile)) {
    console.log(`✅ ${libFile}`);
  } else {
    console.log(`❌ ${libFile} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar contenido en páginas
console.log('\n📝 Verificando contenido legal:');
const pages = glob.sync('src/pages/**/*.astro');
let contentFound = 0;

for (const page of pages) {
  try {
    const content = readFileSync(page, 'utf-8').toLowerCase();
    const foundContent = requiredContent.filter(term => content.includes(term));
    if (foundContent.length > 0) {
      contentFound += foundContent.length;
      console.log(`✅ ${page}: ${foundContent.join(', ')}`);
    }
  } catch (error) {
    console.log(`⚠️ ${page}: Error al leer archivo`);
  }
}

if (contentFound < requiredContent.length) {
  console.log(`❌ Contenido legal insuficiente: ${contentFound}/${requiredContent.length}`);
  allPassed = false;
}

// Verificar estructura de directorios
console.log('\n📁 Verificando estructura de directorios:');
const requiredDirs = [
  'src/pages/legal',
  'src/components/legal',
  'src/lib'
];

for (const dir of requiredDirs) {
  if (existsSync(dir)) {
    console.log(`✅ ${dir}`);
  } else {
    console.log(`❌ ${dir} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar configuración de seguridad
console.log('\n🔒 Verificando configuración de seguridad:');
const securityFiles = [
  'src/lib/security.ts',
  'src/lib/ssl.ts'
];

let securityScore = 0;
for (const file of securityFiles) {
  if (existsSync(file)) {
    try {
      const content = readFileSync(file, 'utf-8');
      const securityFeatures = [
        'sanitizeInput',
        'isValidEmail',
        'isValidPhone',
        'validatePasswordStrength',
        'securityHeaders',
        'verifySSL'
      ];
      
      const foundFeatures = securityFeatures.filter(feature => content.includes(feature));
      securityScore += foundFeatures.length;
      console.log(`✅ ${file}: ${foundFeatures.length}/${securityFeatures.length} características`);
    } catch (error) {
      console.log(`⚠️ ${file}: Error al leer archivo`);
    }
  }
}

// Verificar validaciones
console.log('\n✅ Verificando validaciones de formularios:');
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
    console.log(`⚠️ Error al verificar validaciones`);
    allPassed = false;
  }
} else {
  console.log(`❌ Archivo de validaciones no encontrado`);
  allPassed = false;
}

// Verificar GDPR/CCPA
console.log('\n🌍 Verificando compliance GDPR/CCPA:');
if (existsSync('src/lib/gdpr.ts')) {
  try {
    const content = readFileSync('src/lib/gdpr.ts', 'utf-8');
    const gdprFeatures = [
      'ConsentManager',
      'DataSubjectRights',
      'PrivacyByDesign',
      'CCPACompliance',
      'initGDPRCompliance'
    ];
    
    const foundFeatures = gdprFeatures.filter(feature => content.includes(feature));
    console.log(`✅ Características GDPR/CCPA: ${foundFeatures.length}/${gdprFeatures.length}`);
    
    if (foundFeatures.length < gdprFeatures.length) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️ Error al verificar GDPR/CCPA`);
    allPassed = false;
  }
} else {
  console.log(`❌ Archivo GDPR/CCPA no encontrado`);
  allPassed = false;
}

// Resumen final
console.log('\n📊 Resumen de Compliance Legal:');
console.log(`📄 Páginas legales: ${requiredPages.filter(page => existsSync(page)).length}/${requiredPages.length}`);
console.log(`🧩 Componentes legales: ${requiredComponents.filter(comp => existsSync(comp)).length}/${requiredComponents.length}`);
console.log(`📚 Archivos de librería: ${requiredLibFiles.filter(file => existsSync(file)).length}/${requiredLibFiles.length}`);
console.log(`📝 Contenido legal: ${contentFound}/${requiredContent.length}`);
console.log(`🔒 Puntuación de seguridad: ${securityScore}/12`);

if (allPassed) {
  console.log('\n✅ Compliance legal verificado exitosamente');
  console.log('🎉 El sitio cumple con los estándares legales requeridos');
  process.exit(0);
} else {
  console.log('\n❌ Compliance legal incompleto');
  console.log('⚠️ Se encontraron elementos faltantes o incompletos');
  process.exit(1);
}
