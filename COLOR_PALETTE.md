# Paleta de Colores - MGM Abogados

## Colores Principales

### Azul Marino Profesional
- **Primary**: `#1B365D` - Color principal para botones, enlaces y elementos destacados
- **Primary Light**: `#2C4A6B` - Variante clara para hover states
- **Primary Dark**: `#0F2438` - Variante oscura para elementos activos

### Azul Acero
- **Secondary**: `#4A6B8A` - Color secundario para elementos de apoyo
- **Secondary Light**: `#6B8AAB` - Variante clara
- **Secondary Dark**: `#2C4A6B` - Variante oscura

### Dorado Elegante
- **Accent**: `#D4AF37` - Color de acento para elementos especiales
- **Accent Light**: `#E6C547` - Variante clara
- **Accent Dark**: `#B8941F` - Variante oscura

## Colores Neutros

- **Background**: `#FFFFFF` - Fondo principal
- **Foreground**: `#1B365D` - Texto principal
- **Muted**: `#F8F9FA` - Fondos sutiles
- **Muted Foreground**: `#6B7280` - Texto secundario
- **Border**: `#E5E7EB` - Bordes y separadores

## Colores de Estado

- **Success**: `#059669` - Éxito, confirmaciones
- **Warning**: `#D97706` - Advertencias
- **Destructive**: `#DC2626` - Errores, eliminaciones

## Directrices de Uso por Tipo de Sección

### Heroes y Headers
- **Primary-600** (#1B365D): Fondos principales, botones primarios
- **Gradientes recomendados**: `from-slate-900/80 to-slate-800/70`
- **Texto**: Siempre `white`/`white-90`

### Contenido y Cards
- **Background**: `white` (#FFFFFF) para cards
- **Slate-50/100**: Fondos de secciones alternas
- **Bordes**: `slate-200` (#E5E7EB)

### Texto
- **Títulos principales**: `slate-900` (#0F172A)
- **Texto secundario**: `slate-600` (#475569)
- **Texto terciario**: `slate-500` (#64748B)

### Botones y CTAs
- **Primarios**: `bg-primary-600 text-white`
- **Secundarios**: `border-2 border-primary-600 text-primary-600`
- **Hover**: `bg-primary-700` para primarios
- **Accent**: Usar `accent-600` (#D4AF37) solo para CTAs especiales

### Badges y Estados
- **Información**: `bg-slate-100 text-slate-700`
- **Éxito**: `bg-success-50 text-success-700`
- **Advertencia**: `bg-warning-50 text-warning-700`

### Recomendaciones de Balance
- **60-70%**: Blancos y grises claros (backgrounds)
- **20-25%**: Primary colors (botones, headers, elementos importantes)
- **5-10%**: Accent colors (elementos especiales, highlights)
- **5%**: Estados y badges

## Uso Recomendado

### Para Botones
- **Primarios**: Usar `--primary` (#1B365D)
- **Secundarios**: Usar `--secondary` (#4A6B8A)
- **Acento**: Usar `--accent` (#D4AF37) para CTAs especiales

### Para Texto
- **Títulos**: Usar `--foreground` (#1B365D)
- **Texto secundario**: Usar `--muted-foreground` (#6B7280)
- **Texto sobre fondos oscuros**: Usar `--primary-foreground` (#FFFFFF)

### Para Fondos
- **Principal**: Usar `--background` (#FFFFFF)
- **Secciones**: Usar `--muted` (#F8F9FA)
- **Cards**: Usar `--card` (#FFFFFF)

## Accesibilidad

Todos los colores han sido seleccionados para cumplir con los estándares de accesibilidad WCAG 2.1 AA:
- Contraste mínimo de 4.5:1 para texto normal
- Contraste mínimo de 3:1 para texto grande
- Compatible con daltonismo

## Implementación en CSS

```css
/* Ejemplo de uso */
.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.btn-primary:hover {
  background-color: var(--primary-light);
}

.text-accent {
  color: var(--accent);
}
```

## Implementación en Tailwind

```html
<!-- Ejemplo de uso con Tailwind -->
<button class="bg-primary-600 text-primary-foreground hover:bg-primary-700">
  Botón Principal
</button>

<h1 class="text-foreground">Título Principal</h1>
<p class="text-muted-foreground">Texto secundario</p>
```

## Colores Prohibidos

Para mantener consistencia, **NO usar**:
- `blue-100`, `blue-200`, etc. (usar `primary-*` en su lugar)
- `gray-*` (usar `slate-*` en su lugar)
- `neutral-*` (usar `slate-*` en su lugar)
- Colores personalizados no documentados

## Validación

El proyecto incluye scripts de validación que verifican:
- Uso consistente de colores según esta paleta
- Cumplimiento de las directrices de balance
- Ausencia de colores prohibidos
- Contraste adecuado para accesibilidad
