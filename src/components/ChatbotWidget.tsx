import { useEffect } from 'react';

export default function ChatbotWidget() {
  useEffect(() => {
    // Cargar el chatbot inmediatamente
    const loadChatbot = () => {
      try {
        if (document.getElementById('n8n-chat-script')) {
          window.dispatchEvent(new CustomEvent('mgm:chat-ready'));
          return;
        }

        // Cargar CSS de forma asíncrona
        if (!document.getElementById('n8n-chat-style')) {
          const link = document.createElement('link');
          link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
          link.rel = 'stylesheet';
          link.id = 'n8n-chat-style';
          link.media = 'print';
          link.onload = () => { link.media = 'all'; };
          document.head.appendChild(link);
        }

        // Cargar script de forma asíncrona
        const script = document.createElement('script');
        script.type = 'module';
        script.id = 'n8n-chat-script';
        script.async = true;
        script.textContent = `
          import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

          const chatInstance = createChat({
            webhookUrl: 'https://n8n.srv996622.hstgr.cloud/webhook/a186ebed-3eb7-4726-96f0-d17f8304f274/chat',
            target: '#n8n-chat',
            metadata: { source: 'mgm-abogados-web' },
            defaultLanguage: 'es',
            i18n: {
              es: {
                title: 'Asistente MGM Abogados',
                subtitle: 'Orientación inicial y consultas.',
                footer: 'La información compartida es confidencial y no reemplaza asesoría legal formal.',
                getStarted: 'Iniciar conversación',
                inputPlaceholder: 'Describe brevemente tu situación legal…',
                sendMessage: 'Enviar',
                typing: 'Escribiendo...',
                welcomeMessage: '¡Hola! Soy el asistente virtual de MGM Abogados. ¿En qué puedo ayudarte hoy?'
              }
            },
            theme: {
              primaryColor: '#1B365D',
              backgroundColor: '#ffffff',
              textColor: '#1B365D',
              borderRadius: '14px',
              fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
            },
            showPoweredBy: false,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            timeout: 30000,
            retries: 2,
            // Configuración para burbuja flotante
            mode: 'bubble',
            // Configuración del input
            input: {
              enabled: true,
              placeholder: 'Describe brevemente tu situación legal…',
              sendButton: true
            },
            // Configuración de mensajes
            messages: {
              showTimestamp: false,
              showAvatar: false
            },
            // Mensaje de bienvenida personalizado
            initialMessage: '¡Hola! Soy el asistente virtual de MGM Abogados. ¿En qué puedo ayudarte hoy?',
            // Procesar respuestas JSON del bot
            transformResponse: (response) => {
              try {
                // Si la respuesta es JSON, extraer solo el campo 'message'
                if (typeof response === 'string' && response.trim().startsWith('{')) {
                  const parsed = JSON.parse(response);
                  if (parsed.message) {
                    return parsed.message;
                  }
                }
                return response;
              } catch (error) {
                console.log('Error parsing response:', error);
                return response;
              }
            }
          });

          // Hacer el chat accesible globalmente para el botón
          window.mgmChatInstance = chatInstance;
          window.n8nChatOpen = () => {
            if (chatInstance && chatInstance.open) {
              chatInstance.open();
            }
          };

          // Interceptor adicional para procesar mensajes JSON después de que se muestren
          const originalAppendChild = Node.prototype.appendChild;
          Node.prototype.appendChild = function(child) {
            const result = originalAppendChild.call(this, child);
            
            // Si es un mensaje del bot que contiene JSON, procesarlo
            if (child.textContent && child.textContent.includes('"message"')) {
              try {
                const parsed = JSON.parse(child.textContent);
                if (parsed.message) {
                  child.textContent = parsed.message;
                }
              } catch (error) {
                // No es JSON válido, mantener el contenido original
              }
            }
            
            return result;
          };

          window.dispatchEvent(new CustomEvent('mgm:chat-ready'));
        `;
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error cargando chatbot:', error);
      }
    };

    // Cargar chatbot inmediatamente al montar el componente
    loadChatbot();
    
    return () => {
      // Cleanup si es necesario
    };
  }, []);

  return <div id="n8n-chat" />;
}
