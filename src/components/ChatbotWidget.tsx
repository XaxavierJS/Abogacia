import { useEffect } from 'react';

interface ChatInstance {
  open?: () => void;
}

declare global {
  interface Window {
    chatInstance?: ChatInstance;
    n8nChatOpen?: () => void;
  }
}

const CHAT_CONTAINER_ID = 'n8n-chat';
const CHAT_STYLE_ID = 'n8n-chat-style';
const CHAT_STYLE_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
const CHAT_MODULE_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
const CHAT_WEBHOOK_URL =
  'https://n8n.srv996622.hstgr.cloud/webhook/a186ebed-3eb7-4726-96f0-d17f8304f274/chat';

const ensureChatStyles = () => {
  if (document.getElementById(CHAT_STYLE_ID)) {
    return;
  }

  const link = document.createElement('link');
  link.id = CHAT_STYLE_ID;
  link.rel = 'stylesheet';
  link.href = CHAT_STYLE_URL;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };

  document.head.appendChild(link);
};

const sanitizeChatResponse = (value: unknown): string => {
  const visited = new WeakSet<object>();

  function walk(input: unknown): string {
    if (input === null || input === undefined) return '';

    if (typeof input === 'string') {
      return cleanString(input);
    }

    if (typeof input !== 'object') {
      return String(input);
    }

    if (visited.has(input as object)) {
      return '';
    }
    visited.add(input as object);

    if (Array.isArray(input)) {
      return input
        .map((item) => walk(item))
        .filter(Boolean)
        .join('\n\n');
    }

    const record = input as Record<string, unknown>;
    const preferredKeys = ['message', 'text', 'content', 'value', 'response'];

    for (const key of preferredKeys) {
      if (key in record) {
        const candidate = walk(record[key]);
        if (candidate) {
          return candidate;
        }
      }
    }

    return Object.values(record)
      .map((item) => walk(item))
      .filter(Boolean)
      .join('\n\n');
  }

  function cleanString(text: string): string {
    let cleaned = text.trim();

    if (cleaned.startsWith('```')) {
      cleaned = cleaned
        .replace(/^```[a-zA-Z0-9]*\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
    }

    const looksLikeJson =
      (cleaned.startsWith('{') && cleaned.endsWith('}')) ||
      (cleaned.startsWith('[') && cleaned.endsWith(']'));

    if (looksLikeJson) {
      try {
        const parsed = JSON.parse(cleaned);
        return walk(parsed);
      } catch {
        // keep original text when it's not valid JSON
      }
    }

    const objectStart = cleaned.indexOf('{');
    const objectEnd = cleaned.lastIndexOf('}');
    if (objectStart !== -1 && objectEnd > objectStart) {
      const candidate = cleaned.slice(objectStart, objectEnd + 1);
      try {
        const parsed = JSON.parse(candidate);
        return walk(parsed);
      } catch {
        // ignore and fall through
      }
    }

    const arrayStart = cleaned.indexOf('[');
    const arrayEnd = cleaned.lastIndexOf(']');
    if (arrayStart !== -1 && arrayEnd > arrayStart) {
      const candidate = cleaned.slice(arrayStart, arrayEnd + 1);
      try {
        const parsed = JSON.parse(candidate);
        return walk(parsed);
      } catch {
        // ignore and fall through
      }
    }

    return cleaned;
  }

  return walk(value);
};

const createChatConfig = () => ({
  webhookUrl: CHAT_WEBHOOK_URL,
  target: `#${CHAT_CONTAINER_ID}`,
  metadata: { source: 'despacho-legal-web' },
  defaultLanguage: 'es',
  showWelcomeScreen: false,
  initialMessages: [
    '¡Hola! Soy el asistente virtual del despacho. ¿En qué puedo ayudarte hoy?'
  ],
  i18n: {
    es: {
      title: 'Asistente Legal',
      subtitle: 'Orientación inicial y consultas.',
      footer:
        'La información compartida es confidencial y no reemplaza asesoría legal formal.',
      getStarted: 'Iniciar conversación',
      inputPlaceholder: 'Describe brevemente tu situación legal…',
      sendMessage: 'Enviar',
      typing: 'Escribiendo...',
      closeButtonTooltip: 'Cerrar chat',
      welcomeMessage: '¡Hola! Soy el asistente virtual del despacho. ¿En qué puedo ayudarte hoy?'
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
    Accept: 'application/json'
  },
  timeout: 30000,
  retries: 2,
  mode: 'bubble',
  input: {
    enabled: true,
    placeholder: 'Describe brevemente tu situación legal…',
    sendButton: true
  },
  messages: {
    showTimestamp: false,
    showAvatar: false
  },
  transformResponse: (response: unknown) => {
    const cleaned = sanitizeChatResponse(response);
    if (!cleaned && typeof response === 'string') {
      return response;
    }
    return cleaned;
  }
});

export default function ChatbotWidget() {
  useEffect(() => {
    let isMounted = true;

    const bootstrapChatbot = async () => {
      try {
        ensureChatStyles();

        if (window.chatInstance) {
          window.dispatchEvent(new CustomEvent('chat:ready'));
          return;
        }

        const { createChat } = (await import(
          /* @vite-ignore */ CHAT_MODULE_URL
        )) as { createChat: (config: Record<string, unknown>) => ChatInstance };

        if (!isMounted) {
          return;
        }

        const chatInstance = createChat(createChatConfig());

        window.chatInstance = chatInstance;
        window.n8nChatOpen = () => {
          if (window.chatInstance?.open) {
            window.chatInstance.open();
          }
        };

        window.dispatchEvent(new CustomEvent('chat:ready'));
      } catch (error) {
        console.error('Error cargando chatbot:', error);
      }
    };

    bootstrapChatbot();

    return () => {
      isMounted = false;
    };
  }, []);

  return <div id={CHAT_CONTAINER_ID} />;
}
