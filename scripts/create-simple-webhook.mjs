// scripts/create-simple-webhook.mjs
console.log('📋 Instrucciones para crear un webhook simple de prueba:\n');

console.log('1. Ve a tu instancia de n8n');
console.log('2. Crea un nuevo flujo');
console.log('3. Agrega estos nodos:\n');

console.log('NODO 1: Webhook Trigger');
console.log('- Tipo: Webhook');
console.log('- Método: POST');
console.log('- Path: /test-chat');
console.log('- Activar el webhook\n');

console.log('NODO 2: Responder');
console.log('- Tipo: Respond to Webhook');
console.log('- Respuesta: {"message": "Hola desde n8n!", "status": "ok"}\n');

console.log('4. Conectar los nodos');
console.log('5. Activar el flujo');
console.log('6. Probar con esta URL:');
console.log('https://n8n.srv996622.hstgr.cloud/webhook/test-chat\n');

console.log('7. Una vez que funcione, puedes volver al flujo original');
console.log('8. Verificar que todas las credenciales estén correctas');
console.log('9. Activar el flujo original\n');

console.log('🔍 Para verificar credenciales:');
console.log('- Google Gemini: Verificar API key');
console.log('- Postgres: Verificar conexión a base de datos');
console.log('- Gmail: Verificar OAuth2');
console.log('- Google Sheets: Verificar acceso al documento');
