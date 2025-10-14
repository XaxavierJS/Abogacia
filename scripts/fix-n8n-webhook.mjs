// scripts/fix-n8n-webhook.mjs
console.log('🔧 INSTRUCCIONES PARA CORREGIR EL WEBHOOK EN N8N:\n');

console.log('📋 PROBLEMA IDENTIFICADO:');
console.log('El nodo "Respond to Chat" (@n8n/n8n-nodes-langchain.chat)');
console.log('es para chat interno, no para webhooks externos.\n');

console.log('✅ SOLUCIÓN:');
console.log('1. Ve a tu flujo en n8n');
console.log('2. ELIMINA el nodo "Respond to Chat"');
console.log('3. AGREGA un nuevo nodo "Respond to Webhook" (n8n-nodes-base.respondToWebhook)');
console.log('4. Conecta "AI Agent" → "Respond to Webhook"\n');

console.log('⚙️ CONFIGURACIÓN DEL NODO "Respond to Webhook":');
console.log('- Response Code: 200');
console.log('- Response Body:');
console.log('  {{ $json.output ?? $json.text ?? $json.message ?? $json.reply ?? "No se generó texto." }}');
console.log('- Response Headers:');
console.log('  Content-Type: application/json');
console.log('  Access-Control-Allow-Origin: *');
console.log('  Access-Control-Allow-Methods: POST, OPTIONS');
console.log('  Access-Control-Allow-Headers: Content-Type\n');

console.log('🔄 CONEXIONES:');
console.log('- "AI Agent" (main) → "Respond to Webhook" (main)');
console.log('- Mantén todas las otras conexiones igual\n');

console.log('💾 GUARDAR Y ACTIVAR:');
console.log('1. Guarda el flujo');
console.log('2. Activa el flujo');
console.log('3. Prueba el webhook\n');

console.log('🧪 PRUEBA:');
console.log('Una vez hecho esto, ejecuta:');
console.log('node scripts/test-n8n-chat.mjs');
