# Sitio Web - Despacho Legal

Sitio web profesional para despachos de abogados construido con Astro, React y TailwindCSS.

## Instalación

```bash
npm install
npm run dev
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera sitio en `./dist/` |
| `npm run preview` | Vista previa del build |

## Personalización

Edita `src/lib/constants.ts` con tu información:

```typescript
export const SITE_CONFIG = {
  name: "Tu Despacho",
  url: "https://tu-dominio.com",
};

export const CONTACT_INFO = {
  phone: "+XX XXX XXXXXXX",
  email: "contacto@tu-dominio.com",
  // ...
};
```

## Deploy en GitHub Pages

1. En `astro.config.mjs`, configura:
   ```javascript
   site: 'https://TU-USUARIO.github.io',
   base: '/TU-REPOSITORIO',
   ```

2. Ve a **Settings > Pages > Source: GitHub Actions**

3. Push a `main` y el deploy es automático

## Estructura

```
src/
├── components/    # Componentes UI
├── layouts/       # Layouts de página
├── lib/           # Constantes y utilidades
├── pages/         # Páginas del sitio
└── styles/        # Estilos globales
```

## Licencia

MIT
