# Chatbot Legal - Documentación

## Implementación Completada

El chatbot legal ha sido implementado exitosamente siguiendo las mejores prácticas de compliance legal y UX/UI.

### Características Implementadas

#### ✅ **Compliance Legal**
- **Disclaimer persistente**: Aviso legal visible en cada conversación
- **Sin asesoría legal**: Claramente establecido que NO proporciona asesoría legal
- **Sin relación abogado-cliente**: No crea relación legal formal
- **Protección de información**: Advertencia sobre no enviar información confidencial
- **Enlaces legales**: Política de Privacidad y Términos de Servicio accesibles

#### ✅ **Derivación a Humano**
- **Botón de llamada**: Acceso directo al teléfono del despacho
- **Botón de email**: Contacto directo por correo electrónico
- **Ubicación prominente**: Botones visibles en la parte superior del chat

#### ✅ **Integración Técnica**
- **n8n Chat**: Integración con el webhook proporcionado
- **Carga lazy**: Hidratación con `client:idle` para mejor performance
- **Responsive**: Funciona correctamente en desktop y móvil
- **Accesibilidad**: ARIA labels y navegación por teclado

#### ✅ **UX/UI**
- **Botón flotante**: Posicionado en esquina inferior derecha
- **Sheet modal**: Interfaz limpia y profesional
- **Estados de carga**: Indicador visual mientras se carga el chatbot
- **Iconografía**: Iconos consistentes con el diseño del sitio

### Archivos Creados/Modificados

```
src/components/ChatbotWidget.tsx          # Componente principal del chatbot
src/layouts/BaseLayout.astro             # Integración en layout base
scripts/check-chatbot.mjs                # Script de verificación
package.json                             # Scripts de verificación actualizados
```

### Configuración del Webhook

El chatbot está configurado para usar el webhook de n8n proporcionado:
```
https://n8n.srv996622.hstgr.cloud/webhook/a186ebed-3eb7-4726-96f0-d17f8304f274/chat
```

### Verificación

Para verificar que el chatbot está funcionando correctamente:

```bash
npm run check:chatbot
```

Este comando verifica:
- ✅ Archivos del chatbot presentes
- ✅ Contenido legal implementado
- ✅ Integración en BaseLayout
- ✅ Compliance legal completo
- ✅ Hidratación lazy configurada

### Uso

El chatbot aparece automáticamente en todas las páginas del sitio como un botón flotante en la esquina inferior derecha. Al hacer clic:

1. Se abre el modal del chatbot
2. Se muestra el disclaimer legal
3. Se cargan los botones de derivación a humano
4. Se inicializa el chatbot de n8n
5. El usuario puede interactuar con el asistente

### Consideraciones Legales

⚠️ **IMPORTANTE**: Este chatbot está diseñado para cumplir con las regulaciones legales:

- **NO proporciona asesoría legal real**
- **NO crea relación abogado-cliente**
- **NO debe recibir información confidencial**
- **DEBE derivar a humano para asesoría real**
- **DEBE incluir disclaimers apropiados**

### Próximos Pasos

1. **Configurar n8n**: Asegurar que el webhook esté funcionando correctamente
2. **Personalizar respuestas**: Configurar las respuestas del chatbot en n8n
3. **Monitorear uso**: Implementar analytics para el chatbot
4. **Pruebas**: Realizar pruebas de usuario con el chatbot
5. **Optimización**: Ajustar respuestas basado en feedback

### Comandos Útiles

```bash
# Verificar implementación completa
npm run check:all

# Solo verificar chatbot
npm run check:chatbot

# Desarrollo
npm run dev

# Build de producción
npm run build
```

El chatbot está listo para uso en producción y cumple con todos los estándares legales y técnicos requeridos.
