# CSS-Methodik und Code-Struktur
## Abschnitt 3: Technische Architektur-Entscheidungen

**Version:** v4.0.0 Premium Design Upgrade
**Datum:** 2025-11-12

---

## 3.1 CSS-Methodik Vergleich

### Optionen:
1. **Vanilla CSS** (aktuell)
2. **SCSS** (Sass-Präprozessor)
3. **Tailwind CSS** (Utility-First Framework)

---

### 📊 **Option 1: Vanilla CSS**

#### **Aktueller Stand:**
```css
/* tokens.css - Design Tokens */
:root {
  --color-brand-primary: #c41e3a;
  --button-padding: 0.75rem 1.5rem;
}

/* global.css - Utilities */
.button {
  padding: var(--button-padding);
  background: var(--color-brand-primary);
}
```

#### **✅ Vorteile:**
- **Zero Build-Step:** Keine Kompilierung notwendig
- **Native Browser-Support:** CSS Custom Properties funktionieren nativ
- **Einfach zu debuggen:** Was du schreibst = was im Browser läuft
- **Netlify-kompatibel:** Direktes Deployment ohne Build
- **Gute Performance:** Kein Overhead

#### **❌ Nachteile:**
- **Keine Mixins:** Wiederholte Glassmorphism-Patterns müssen kopiert werden
- **Keine Color-Functions:** `darken()`, `lighten()`, `transparentize()` nicht verfügbar
- **Keine Nesting:** Flache Struktur, schwer lesbar bei komplexen Selectors
- **Keine Loops:** Utility-Classes müssen manuell geschrieben werden
- **Maintenance:** Bei Glassmorphism wird viel Code dupliziert

#### **Bewertung für v4.0.0 Glassmorphism:**
🟡 **Machbar, aber nicht ideal** - Viel Copy-Paste für Glass-Effekte

---

### 📊 **Option 2: SCSS (Sass)**

#### **Was ist SCSS?**
CSS-Präprozessor mit Superset-Features: Variablen, Mixins, Functions, Nesting, Partials

#### **Beispiel-Implementierung:**

**A) SCSS-Struktur:**
```
src/styles/
├── abstracts/
│   ├── _variables.scss      # Farben, Spacing
│   ├── _functions.scss       # SCSS Functions
│   └── _mixins.scss          # Wiederverwendbare Patterns
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── _navigation.scss
├── utilities/
│   └── _helpers.scss
└── main.scss                 # Import-Orchestrator
```

**B) Glassmorphism-Mixin:**
```scss
// abstracts/_mixins.scss
@mixin glass($blur: 12px, $opacity: 0.7, $border-opacity: 0.3) {
  background: rgba(255, 255, 255, $opacity);
  backdrop-filter: blur($blur) saturate(180%);
  -webkit-backdrop-filter: blur($blur) saturate(180%);
  border: 1px solid rgba(255, 255, 255, $border-opacity);
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, $border-opacity);

  @supports not (backdrop-filter: blur($blur)) {
    background: rgba(255, 255, 255, 0.95);
  }
}

// Tinted Glass Variant
@mixin glass-tinted($color, $opacity: 0.15, $blur: 12px) {
  background: rgba($color, $opacity);
  backdrop-filter: blur($blur) saturate(180%);
  border: 1px solid rgba($color, $opacity + 0.1);
}
```

**C) Usage:**
```scss
// components/_cards.scss
.card-glass {
  @include glass(12px, 0.7, 0.3);
  border-radius: 16px;
  padding: 1.5rem;

  &:hover {
    @include glass(16px, 0.85, 0.4);
    transform: translateY(-4px);
  }
}

.testimonial-card {
  @include glass-tinted($color-brand-accent, 0.2, 12px);
  border-left: 4px solid $color-brand-accent;
}
```

**D) Color Functions:**
```scss
// abstracts/_variables.scss
$color-brand-primary: #c41e3a;
$color-brand-accent: #d4af37;

// Generate opacity variants automatically
@each $opacity in (100, 90, 75, 50, 25, 15, 10) {
  .bg-primary-#{$opacity} {
    background: rgba($color-brand-primary, $opacity / 100);
  }
}

// Output:
// .bg-primary-100 { background: rgba(196, 30, 58, 1); }
// .bg-primary-15 { background: rgba(196, 30, 58, 0.15); }
```

**E) Responsive Mixins:**
```scss
// abstracts/_mixins.scss
@mixin responsive($breakpoint) {
  @if $breakpoint == 'mobile' {
    @media (max-width: 768px) { @content; }
  }
  @else if $breakpoint == 'tablet' {
    @media (min-width: 769px) and (max-width: 1024px) { @content; }
  }
  @else if $breakpoint == 'desktop' {
    @media (min-width: 1025px) { @content; }
  }
}

// Usage:
.nav-list {
  display: flex;
  gap: 2rem;

  @include responsive('mobile') {
    flex-direction: column;
    gap: 1rem;
  }
}
```

#### **✅ Vorteile:**
- **Mixins:** Glassmorphism-Pattern einmal definieren, überall nutzen
- **Color Functions:** `darken($color, 10%)`, `rgba($color, 0.15)`, `lighten()`
- **Nesting:** Übersichtlichere Code-Struktur
- **Partials:** Modulare File-Struktur
- **Variables:** Plus Berechnungen (`$spacing * 2`)
- **Loops & Maps:** Auto-generate utility classes
- **@extend:** Component-Inheritance

#### **❌ Nachteile:**
- **Build-Step notwendig:** Sass-Compiler im Build-Prozess
- **Lernkurve:** Team muss SCSS kennen (aber ähnlich zu CSS)
- **Debugging komplexer:** Source-Maps notwendig
- **Build-Zeit:** Zusätzliche Kompilierung (aber minimal bei kleinen Projekten)

#### **Netlify-Integration:**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/abstracts/_variables.scss";`
        }
      }
    }
  }
});
```

**Netlify Build Command:**
```json
{
  "build": "astro check && astro build"
}
```
→ Astro kompiliert SCSS automatisch, kein extra Setup!

#### **Bewertung für v4.0.0 Glassmorphism:**
🟢 **IDEAL** - Mixins machen Glassmorphism-Code DRY und wartbar

---

### 📊 **Option 3: Tailwind CSS**

#### **Was ist Tailwind?**
Utility-First CSS Framework mit vorgefertigten Klassen

#### **Beispiel-Implementierung:**

**A) Tailwind Config:**
```javascript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary': {
          DEFAULT: '#c41e3a',
          50: 'rgba(196, 30, 58, 0.05)',
          100: 'rgba(196, 30, 58, 0.1)',
          // ...
        },
      },
      backdropBlur: {
        'glass': '12px',
        'glass-strong': '16px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.7)',
          'backdrop-filter': 'blur(12px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
        },
      });
    },
  ],
};
```

**B) Usage in HTML:**
```astro
<div class="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
  <h3 class="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
    Heading
  </h3>
  <p class="text-gray-700">Content</p>
</div>
```

#### **✅ Vorteile:**
- **Rapid Development:** Schnelles Prototyping mit Utility-Klassen
- **Konsistente Spacing:** Design-System in Config
- **Purge/Tree-Shaking:** Ungenutztes CSS wird automatisch entfernt
- **Responsive:** `md:flex lg:grid` Breakpoint-Prefixes
- **Dark Mode:** `dark:bg-gray-900` built-in
- **Plugin-Ecosystem:** Viele Community-Plugins

#### **❌ Nachteile:**
- **HTML-Bloat:** Viele Klassen in Markup (z.B. `class="flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-md..."`)
- **Lernkurve:** Team muss Tailwind-Naming lernen
- **Customization-Overhead:** Custom Glassmorphism braucht Plugin oder `@apply`
- **Build-Step:** PostCSS + Tailwind Compiler notwendig
- **Component-Duplication:** Gleiche Utility-Kombinationen in mehreren Components
- **Debugging schwer:** "Welche Klasse macht was?" schwer zu tracken

#### **Für Glassmorphism:**
```html
<!-- Viel Markup-Overhead: -->
<div class="bg-white/70 backdrop-blur-[12px] backdrop-saturate-[180%] border border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.15)] rounded-2xl">
  ...
</div>

<!-- vs SCSS Mixin: -->
<div class="card-glass">
  ...
</div>
```

#### **Bewertung für v4.0.0 Glassmorphism:**
🟡 **Machbar, aber verbose** - Viele Utility-Klassen für Glass-Effekte

---

## 3.2 Entscheidung: SCSS ✅

### **Begründung:**

#### **1. Glassmorphism-Komplexität**
Glassmorphism-Effekte erfordern:
- `background: rgba()`
- `backdrop-filter: blur() saturate()`
- Vendor-Prefixes (`-webkit-backdrop-filter`)
- Fallbacks für unsupported browsers
- Border + Box-Shadow Kombinationen

**SCSS Lösung:** Ein Mixin kapselt alles
```scss
@include glass(12px, 0.7);  // Done!
```

**Tailwind Lösung:** 8-10 Utility-Klassen pro Element
**Vanilla CSS:** Copy-Paste für jedes Element

---

#### **2. Maintainability**
**Problem:** 20+ Components mit Glassmorphism

**SCSS:** Mixin-Änderung propagiert zu allen Components
```scss
// Ändere einmal:
@mixin glass($blur) {
  backdrop-filter: blur($blur) saturate(200%);  // Changed from 180%
}
// → Alle .card-glass, .button-glass, .nav-glass aktualisiert
```

**Vanilla CSS/Tailwind:** Jedes Element manuell ändern

---

#### **3. Color Management**
**SCSS Color Functions:**
```scss
$primary: #c41e3a;

.button-hover {
  background: darken($primary, 10%);  // Automatic calculation
}

.glass-tinted {
  background: rgba($primary, 0.15);   // Easy transparency
}
```

**Vanilla CSS:** Manuell HSL-Werte berechnen
**Tailwind:** Alle Variants in Config vordefinieren

---

#### **4. Code-Organisation**
**SCSS Partials:**
```
styles/
├── abstracts/_mixins.scss       (Glassmorphism here)
├── base/_reset.scss
├── components/_buttons.scss     (Uses mixins)
├── components/_cards.scss       (Uses mixins)
└── main.scss
```

Klare Separation of Concerns

---

#### **5. Astro-Integration**
Astro unterstützt SCSS out-of-the-box:
```astro
<style lang="scss">
  @import '../styles/abstracts/mixins';

  .hero {
    @include glass(16px, 0.8);
  }
</style>
```

**Kein extra Build-Config notwendig!**

---

#### **6. Performance**
- SCSS kompiliert zu optimiertem CSS
- Astro's Build optimiert automatisch
- Kein Runtime-Overhead (wie Tailwind's JIT)
- Kleinere CSS-Bundles als Tailwind (nur genutzter Code)

---

#### **7. Team-Friendly**
- SCSS ist CSS + Features (easy to learn)
- Mixins sind self-documenting
- Kein Framework-Lock-in (kann zu Vanilla CSS zurück)

---

### **Entscheidungs-Matrix:**

| Kriterium | Vanilla CSS | **SCSS** | Tailwind |
|-----------|-------------|----------|----------|
| Glassmorphism DRY | ❌ | ✅ | 🟡 |
| Maintainability | ❌ | ✅ | 🟡 |
| Color Functions | ❌ | ✅ | 🟡 |
| Code-Organisation | 🟡 | ✅ | ❌ |
| Build-Komplexität | ✅ | ✅ | 🟡 |
| Astro-Integration | ✅ | ✅ | 🟡 |
| Netlify-Kompatibilität | ✅ | ✅ | ✅ |
| Lernkurve | ✅ | ✅ | ❌ |
| Bundle-Size | ✅ | ✅ | 🟡 |
| **GESAMT** | 5/9 | **9/9** | 4/9 |

---

## 3.3 SCSS-Implementierungsplan

### **Schritt 1: Package Installation**

```bash
npm install -D sass
```

→ Astro erkennt automatisch `.scss` Dateien

---

### **Schritt 2: File-Struktur Reorganisation**

**Neue Struktur:**
```
src/styles/
├── abstracts/
│   ├── _variables.scss           # Design Tokens (from tokens.css)
│   ├── _functions.scss            # Color manipulation functions
│   └── _mixins.scss               # Glassmorphism, Responsive, etc.
├── base/
│   ├── _reset.scss                # Modern CSS Reset
│   ├── _typography.scss           # Font styles
│   └── _utilities.scss            # Helper classes
├── components/
│   ├── _buttons.scss              # All button variants
│   ├── _cards.scss                # Card components
│   ├── _forms.scss                # Input fields
│   ├── _navigation.scss           # Nav + Header
│   └── _footer.scss               # Footer styles
├── layout/
│   ├── _container.scss            # Container utilities
│   └── _grid.scss                 # Grid systems
└── main.scss                      # Main import orchestrator
```

---

### **Schritt 3: Mixins-Bibliothek**

**abstracts/_mixins.scss:**
```scss
// ============================================
// GLASSMORPHISM MIXINS
// ============================================

/// Standard Glass Effect
/// @param {Number} $blur - Blur amount (default: 12px)
/// @param {Number} $opacity - Background opacity (default: 0.7)
/// @param {Number} $border-opacity - Border opacity (default: 0.3)
@mixin glass($blur: 12px, $opacity: 0.7, $border-opacity: 0.3) {
  background: rgba(255, 255, 255, $opacity);
  backdrop-filter: blur($blur) saturate(180%);
  -webkit-backdrop-filter: blur($blur) saturate(180%);
  border: 1px solid rgba(255, 255, 255, $border-opacity);
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, $border-opacity);

  // Fallback for browsers without backdrop-filter support
  @supports not (backdrop-filter: blur($blur)) {
    background: rgba(255, 255, 255, 0.95);
  }
}

/// Tinted Glass Effect
/// @param {Color} $color - Tint color
/// @param {Number} $opacity - Tint opacity (default: 0.15)
@mixin glass-tinted($color, $opacity: 0.15, $blur: 12px) {
  background: rgba($color, $opacity);
  backdrop-filter: blur($blur) saturate(180%);
  -webkit-backdrop-filter: blur($blur) saturate(180%);
  border: 1px solid rgba($color, $opacity + 0.1);
  box-shadow: 0 8px 32px 0 rgba($color, 0.15);
}

/// Dark Mode Glass (inverted)
@mixin glass-dark($blur: 12px, $opacity: 0.75) {
  background: rgba(28, 28, 28, $opacity);
  backdrop-filter: blur($blur) saturate(180%);
  -webkit-backdrop-filter: blur($blur) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

// ============================================
// RESPONSIVE MIXINS
// ============================================

$breakpoints: (
  'mobile': 768px,
  'tablet': 1024px,
  'desktop': 1440px,
);

/// Responsive breakpoint mixin
/// @param {String} $breakpoint - Breakpoint name
@mixin responsive($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (max-width: #{map-get($breakpoints, $breakpoint)}) {
      @content;
    }
  }
}

// ============================================
// ANIMATION MIXINS
// ============================================

/// Smooth transition mixin
/// @param {List} $properties - CSS properties to transition
@mixin transition($properties...) {
  transition-property: $properties;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/// Fade-in animation
@mixin fade-in($duration: 0.3s) {
  animation: fadeIn $duration ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

/// Slide-up animation
@mixin slide-up($duration: 0.4s, $distance: 40px) {
  animation: slideUp $duration cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY($distance);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

// ============================================
// UTILITY MIXINS
// ============================================

/// Center element with flexbox
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/// Truncate text with ellipsis
@mixin truncate($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

/// Aspect ratio (for responsive images/videos)
@mixin aspect-ratio($width, $height) {
  aspect-ratio: $width / $height;

  @supports not (aspect-ratio: 1) {
    &::before {
      content: '';
      float: left;
      padding-top: ($height / $width) * 100%;
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
}
```

---

### **Schritt 4: Variables Migration**

**abstracts/_variables.scss:**
```scss
// ============================================
// COLORS (from tokens.css)
// ============================================

// Brand Colors
$color-brand-primary: #c41e3a;
$color-brand-accent: #d4af37;

// Neutrals
$color-gray-50: #f8f8f8;
$color-gray-900: #1a1a1a;

// Semantic
$color-success: #16a34a;
$color-warning: #ca8a04;
$color-danger: #dc2626;

// ============================================
// SPACING (from tokens.css)
// ============================================

$space-1: 0.25rem;   // 4px
$space-2: 0.5rem;    // 8px
$space-4: 1rem;      // 16px
$space-6: 1.5rem;    // 24px
$space-8: 2rem;      // 32px

// ============================================
// TYPOGRAPHY
// ============================================

$font-sans: 'Inter Variable', system-ui, sans-serif;
$font-serif: 'Playfair Variable', Georgia, serif;

$font-size-body: 1rem;
$font-size-heading-xl: clamp(2rem, 4vw + 0.5rem, 3rem);

// ============================================
// EFFECTS
// ============================================

$border-radius-sm: 0.25rem;
$border-radius-md: 0.5rem;
$border-radius-lg: 1rem;

$shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-card-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

// ============================================
// Z-INDEX SCALE
// ============================================

$z-navigation: 200;
$z-modal: 400;
$z-toast: 600;
```

---

### **Schritt 5: Component SCSS**

**components/_buttons.scss:**
```scss
@import '../abstracts/variables';
@import '../abstracts/mixins';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: $border-radius-md;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  border: none;
  @include transition(all);

  // Primary variant
  &-primary {
    background: linear-gradient(135deg, $color-brand-primary 0%, darken($color-brand-primary, 8%) 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba($color-brand-primary, 0.3);
    }
  }

  // Glass variant
  &-glass {
    @include glass(12px, 0.7, 0.3);
    color: $color-gray-900;

    &:hover {
      @include glass(16px, 0.85, 0.4);
      transform: translateY(-2px);
    }
  }

  // Responsive
  @include responsive('mobile') {
    width: 100%;
    justify-content: center;
  }
}
```

---

### **Schritt 6: Main SCSS Orchestrator**

**main.scss:**
```scss
// ============================================
// MAIN STYLESHEET ORCHESTRATOR
// ============================================

// 1. Abstracts (no CSS output, only definitions)
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';

// 2. Base (reset, typography)
@import 'base/reset';
@import 'base/typography';
@import 'base/utilities';

// 3. Layout
@import 'layout/container';
@import 'layout/grid';

// 4. Components
@import 'components/buttons';
@import 'components/cards';
@import 'components/forms';
@import 'components/navigation';
@import 'components/footer';

// 5. Dark Mode overrides
@media (prefers-color-scheme: dark) {
  @import 'themes/dark';
}
```

---

### **Schritt 7: Astro Integration**

**In BaseLayout.astro:**
```astro
---
import '../styles/main.scss';  // Changed from global.css
---
```

**In Components:**
```astro
<style lang="scss">
  @import '../styles/abstracts/mixins';

  .hero {
    @include glass(16px, 0.8);
    padding: 4rem 0;

    @include responsive('mobile') {
      padding: 2rem 0;
    }
  }
</style>
```

---

## 3.4 Code-Struktur Optimierung

### **Verbesserung 1: Component Extraction**

**Vorher (in index.astro):**
```astro
<a href="/speisekarte" class="button button-primary">
  Speisekarte ansehen
</a>

<style>
  .button { /* ... */ }
  .button-primary { /* ... */ }
</style>
```

**Nachher (Button.astro Component):**
```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const { variant = 'primary', size = 'md', href } = Astro.props;
---

<a href={href} class={`button button-${variant} button-${size}`}>
  <slot />
</a>

<style lang="scss">
  @import '../styles/abstracts/mixins';
  @import '../styles/components/buttons';
</style>
```

**Usage:**
```astro
<Button variant="glass" size="lg" href="/speisekarte">
  Speisekarte ansehen
</Button>
```

---

### **Verbesserung 2: Card Component**

**New: Card.astro:**
```astro
---
interface Props {
  variant?: 'default' | 'glass' | 'glass-tinted';
  elevation?: 'base' | 'elevated' | 'floating';
  class?: string;
}

const { variant = 'default', elevation = 'base', class: className } = Astro.props;
---

<article class={`card card-${variant} card-${elevation} ${className}`}>
  <slot />
</article>

<style lang="scss">
  @import '../styles/abstracts/mixins';

  .card {
    border-radius: 1rem;
    padding: 1.5rem;
    @include transition(transform, box-shadow);

    &-glass {
      @include glass(12px, 0.7);
    }

    &-glass-tinted {
      @include glass-tinted($color-brand-accent, 0.2);
    }

    &-elevated:hover {
      transform: translateY(-8px);
    }
  }
</style>
```

---

### **Verbesserung 3: Shared Styles Extraction**

**Problem:** Duplicate code in multiple components

**Solution:** Shared SCSS partials

**components/_shared.scss:**
```scss
// Shared component patterns
%card-base {
  border-radius: $border-radius-lg;
  padding: $space-6;
  @include transition(transform, box-shadow);
}

%glass-hover {
  &:hover {
    @include glass(16px, 0.85);
    transform: translateY(-4px);
  }
}

// Usage in components:
.menu-card {
  @extend %card-base;
  @extend %glass-hover;
}
```

---

## 3.5 Netlify Build-Konfiguration

### **astro.config.mjs:**
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Auto-import variables/mixins in all SCSS files
          additionalData: `
            @import "src/styles/abstracts/_variables.scss";
            @import "src/styles/abstracts/_mixins.scss";
          `
        }
      }
    }
  },
  build: {
    inlineStylesheets: 'auto',  // Inline small CSS for performance
  }
});
```

### **netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-lighthouse"

[context.production.environment]
  SASS_IMPLEMENTATION = "sass"
```

---

## 3.6 Zusammenfassung

### ✅ **Entscheidung: SCSS**

**Gründe:**
1. **Glassmorphism-Mixins** → DRY, maintainable
2. **Color Functions** → Easy opacity variants
3. **Nesting** → Better code organization
4. **Partials** → Modular structure
5. **Astro-native support** → No extra config
6. **Netlify-compatible** → Works out-of-the-box
7. **Performance** → Optimiert zu vanilla CSS
8. **Team-friendly** → CSS + Features, easy to learn

### 📁 **Finale Struktur:**
```
src/styles/
├── abstracts/      (Variables, Mixins, Functions)
├── base/           (Reset, Typography)
├── components/     (Button, Card, Nav, etc.)
├── layout/         (Container, Grid)
├── themes/         (Dark mode)
└── main.scss       (Import orchestrator)
```

### 🔄 **Migration Plan:**
1. Install Sass (`npm install -D sass`)
2. Rename `.css` → `.scss`
3. Extract mixins (Glassmorphism)
4. Migrate tokens.css → _variables.scss
5. Convert components to use mixins
6. Test build in Netlify
7. Optimize & document

---

**Nächster Schritt:** Abschnitt 4 - Implementation der Design-Änderungen mit SCSS
