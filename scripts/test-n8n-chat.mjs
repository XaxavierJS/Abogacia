// scripts/test-n8n-chat.mjs
import fetch from 'node-fetch';

const webhookUrl = 'https://n8n.srv996622.hstgr.cloud/webhook/a186ebed-3eb7-4726-96f0-d17f8304f274/chat';

console.log('🔍 Probando conexión específica del chatbot...\n');

async function testChatbot() {
  try {
    console.log(`📡 URL del webhook: ${webhookUrl}`);
    
    // Probar con diferentes formatos de mensaje
    const testMessages = [
      {
        chatInput: 'Hola',
        sessionId: 'test-session-' + Date.now()
      },
      {
        message: 'Hola',
        sessionId: 'test-session-' + Date.now()
      },
      {
        text: 'Hola',
        sessionId: 'test-session-' + Date.now()
      }
    ];
    
    for (let i = 0; i < testMessages.length; i++) {
      const testMessage = testMessages[i];
      console.log(`\n📤 Prueba ${i + 1}: Enviando mensaje con formato ${Object.keys(testMessage)[0]}...`);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'n8n-chat-widget/1.0'
        },
        body: JSON.stringify(testMessage)
      });
      
      console.log(`📊 Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.text();
        console.log('✅ Respuesta del webhook:');
        console.log(data);
        console.log('\n🎉 ¡Webhook funcionando correctamente!');
        break;
      } else {
        console.log('❌ Error en el webhook:');
        console.log(`Status: ${response.status}`);
        const errorText = await response.text();
        console.log('Error:', errorText);
      }
      
      // Esperar un poco entre pruebas
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
  } catch (error) {
    console.log('❌ Error de conexión:');
    console.log(error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Posibles soluciones:');
      console.log('1. Verificar que el webhook esté activado en n8n');
      console.log('2. Verificar que el flujo esté publicado');
      console.log('3. Verificar la URL del webhook');
      console.log('4. Verificar que el nodo "Respond to Chat" esté configurado correctamente');
    }
  }
}

testChatbot();
