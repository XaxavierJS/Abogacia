// scripts/test-n8n-webhook.mjs
import fetch from 'node-fetch';

const webhookUrl = 'https://n8n.srv996622.hstgr.cloud/webhook/a186ebed-3eb7-4726-96f0-d17f8304f274/chat';

console.log('🔍 Probando conexión con n8n...\n');

async function testWebhook() {
  try {
    console.log(`📡 URL del webhook: ${webhookUrl}`);
    
    // Probar con un mensaje simple
    const testMessage = {
      chatInput: 'Hola, ¿puedes ayudarme?',
      sessionId: 'test-session-' + Date.now()
    };
    
    console.log('📤 Enviando mensaje de prueba...');
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage)
    });
    
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.text();
      console.log('✅ Respuesta del webhook:');
      console.log(data);
      console.log('\n🎉 ¡Webhook funcionando correctamente!');
    } else {
      console.log('❌ Error en el webhook:');
      console.log(`Status: ${response.status}`);
      const errorText = await response.text();
      console.log('Error:', errorText);
    }
    
  } catch (error) {
    console.log('❌ Error de conexión:');
    console.log(error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Posibles soluciones:');
      console.log('1. Verificar que el webhook esté activado en n8n');
      console.log('2. Verificar que el flujo esté publicado');
      console.log('3. Verificar la URL del webhook');
    }
  }
}

testWebhook();
