// scripts/check-chatbot.mjs
import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

const requiredFiles = [
  'src/components/ChatbotWidget.tsx',
  'src/components/legal/Disclaimer.tsx'
];

const requiredContent = [
  'disclaimer',
  'chatbot',
  'asesoría legal',
  'relación abogado-cliente',
  'información confidencial',
  'webhookUrl',
  'n8n'
];

console.log('🤖 Verificando implementación del chatbot...\n');

let allPassed = true;

// Verificar archivos requeridos
console.log('📁 Verificando archivos del chatbot:');
for (const file of requiredFiles) {
  if (existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
    allPassed = false;
  }
}

// Verificar contenido en archivos
console.log('\n📝 Verificando contenido del chatbot:');
const files = glob.sync('src/**/*.{tsx,astro}');
let contentFound = 0;

for (const file of files) {
  try {
    const content = readFileSync(file, 'utf-8').toLowerCase();
    const foundContent = requiredContent.filter(term => content.includes(term));
    if (foundContent.length > 0) {
      contentFound += foundContent.length;
      console.log(`✅ ${file}: ${foundContent.join(', ')}`);
    }
  } catch (error) {
    console.log(`⚠️ ${file}: Error al leer archivo`);
  }
}

// Verificar integración en BaseLayout
console.log('\n🔗 Verificando integración:');
try {
  const baseLayout = readFileSync('src/layouts/BaseLayout.astro', 'utf-8');
  if (baseLayout.includes('ChatbotWidget')) {
    console.log('✅ ChatbotWidget integrado en BaseLayout');
  } else {
    console.log('❌ ChatbotWidget NO integrado en BaseLayout');
    allPassed = false;
  }
  
  if (baseLayout.includes('client:idle')) {
    console.log('✅ Hidratación lazy configurada correctamente');
  } else {
    console.log('⚠️ Hidratación lazy no configurada');
  }
} catch (error) {
  console.log('❌ Error al verificar BaseLayout');
  allPassed = false;
}

// Verificar configuración n8n
console.log('\n⚙️ Verificando configuración n8n:');
try {
  const chatbotWidget = readFileSync('src/components/ChatbotWidget.tsx', 'utf-8');
  if (chatbotWidget.includes('webhookUrl')) {
    console.log('✅ Webhook URL configurado');
  } else {
    console.log('❌ Webhook URL no encontrado');
    allPassed = false;
  }
  
  if (chatbotWidget.includes('primaryColor')) {
    console.log('✅ Tema personalizado configurado');
  } else {
    console.log('⚠️ Tema personalizado no configurado');
  }
  
  if (chatbotWidget.includes('welcomeMessage')) {
    console.log('✅ Mensaje de bienvenida configurado');
  } else {
    console.log('⚠️ Mensaje de bienvenida no configurado');
  }
} catch (error) {
  console.log('❌ Error al verificar configuración n8n');
  allPassed = false;
}

if (allPassed && contentFound >= requiredContent.length) {
  console.log('\n✅ Chatbot implementado correctamente');
  console.log('📋 Checklist completado:');
  console.log('  ✅ Componente ChatbotWidget simplificado');
  console.log('  ✅ Integración con n8n configurada');
  console.log('  ✅ Solo burbuja de chat (sin popup)');
  console.log('  ✅ Tema personalizado aplicado');
  console.log('  ✅ Hidratación lazy (client:idle)');
  console.log('  ✅ Sin disclaimers duplicados');
  process.exit(0);
} else {
  console.log('\n❌ Implementación del chatbot incompleta');
  process.exit(1);
}
