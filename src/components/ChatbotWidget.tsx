import { useEffect } from 'react';

export default function ChatbotWidget() {
  useEffect(() => {
    const loadChatbot = () => {
      try {
        if (document.getElementById('n8n-chat-script')) {
          window.dispatchEvent(new CustomEvent('mgm:chat-ready'));
          return;
        }

        if (!document.getElementById('n8n-chat-style')) {
          const link = document.createElement('link');
          link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
          link.rel = 'stylesheet';
          link.id = 'n8n-chat-style';
          document.head.appendChild(link);
        }

        const script = document.createElement('script');
        script.type = 'module';
        script.id = 'n8n-chat-script';
        script.textContent = `
          import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

          createChat({
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
                inputPlaceholder: 'Describe brevemente tu situación legal…'
              }
            },
            initialMessages: [
              '¡Hola! Soy el asistente virtual de MGM Abogados.',
              'Esta orientación es informativa y no crea relación abogado-cliente. Podemos coordinar una reunión con nuestro equipo si lo necesitas.'
            ],
            theme: {
              primaryColor: '#0E4A69',
              backgroundColor: '#ffffff',
              textColor: '#0B1220',
              borderRadius: '14px',
              fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
            },
            showPoweredBy: false,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            timeout: 30000,
            retries: 2
          });

          window.dispatchEvent(new CustomEvent('mgm:chat-ready'));
        `;
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error cargando chatbot:', error);
      }
    };

    loadChatbot();
  }, []);

  return null;
}
