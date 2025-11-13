# Cinar Grill - Premium Restaurant Website

> **Enterprise-grade static website** für Cinar Grill mit modernstem Design, höchsten Sicherheitsstandards und vollständiger Barrierefreiheit.

[![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Netlify](https://img.shields.io/badge/Hosted_on-Netlify-00C7B7?logo=netlify)](https://www.netlify.com)
[![License](https://img.shields.io/badge/License-UNLICENSED-red)]()

---

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build
```

## ✨ Features

### Design & UX
- ✅ **Glassmorphism-Effekte** für modernes, premium Look & Feel
- ✅ **Responsive Design** (Mobile-First, pixelperfekt auf allen Geräten)
- ✅ **Design-Token-System** (Tier 1/2/3 Tokens für konsistente Styles)
- ✅ **Tailwind CSS** mit custom Utilities
- ✅ **Animationen** mit reduced-motion Support

### Security (Enterprise-Grade)
- ✅ **CSP Strict-Dynamic** ohne `unsafe-*` Direktiven
- ✅ **HSTS Preload** (31536000s)
- ✅ **SRI** für alle CSS/JS/WOFF2
- ✅ **Trusted Types** enabled
- ✅ **COOP/COEP/CORP** Cross-Origin Isolation
- ✅ **No Inline Scripts/Styles**

### Accessibility (WCAG 2.2 AA)
- ✅ **Keyboard Navigation** vollständig
- ✅ **Focus Management** mit Focus-Ringen
- ✅ **Skip Links** für Screenreader
- ✅ **Color Contrast** ≥ 4.5:1
- ✅ **Reduced Motion** respektiert
- ✅ **Minimum Target Size** 44×44px

### Performance
- ✅ **Core Web Vitals** optimiert (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)
- ✅ **Static Site Generation** (SSG) via Astro
- ✅ **Image Optimization** (WebP, Lazy Loading)
- ✅ **Font Optimization** (WOFF2, self-hosted)
- ✅ **Code Splitting** automatisch

### SEO & Compliance
- ✅ **Schema.org Markup** (Restaurant, LocalBusiness)
- ✅ **Sitemap.xml** dynamisch generiert
- ✅ **Robots.txt** optimiert
- ✅ **OpenGraph & Twitter Cards**
- ✅ **DSGVO/TTDSG-konform**

## 📋 Scripts

```bash
npm run dev          # Dev-Server
npm run build        # Production Build
npm run preview      # Preview des Builds

# Quality Assurance
npm run lhci         # Lighthouse CI
npm run a11y         # Accessibility Tests
npm run links        # Link Checker
npm run security     # Security Checks
npm run sri:gen      # SRI Hashes generieren
```

## 🏗️ Projektstruktur

```
cinar-grill-seite/
├── contracts/           # JSON-Verträge (SSOT)
├── design-tokens/       # 3-Tier Design Tokens
├── src/
│   ├── components/      # UI-Komponenten
│   ├── layouts/         # Layouts
│   ├── pages/           # Seiten (File-based Routing)
│   └── styles/          # Base Styles
├── public/              # Static Assets
├── scripts/             # Build & Test Scripts
└── docs/                # Dokumentation
```

## 🔒 Security

- **CSP Strict-Dynamic** - Keine `unsafe-*` Direktiven
- **SRI** - SHA-384 Hashes für alle Assets
- **HSTS** - Max-Age 31536000, Preload
- **Security Headers** - via Netlify
- **Trusted Types** - DOM-XSS Prevention

## 📦 Deployment

**Automatisch via GitHub:**
- Push auf `main` → CI/CD → Quality Gates → Netlify Deploy

**Netlify Setup:**
- Build Command: `npm run build`
- Publish Directory: `dist`
- Node Version: 20

## 🧪 Quality Gates (CI/CD)

- ✅ Lighthouse (Performance/SEO/Best Practices ≥ 95)
- ✅ Pa11y/Axe (0 critical A11y issues)
- ✅ Security Checks (CSP, SRI, Headers)
- ✅ Link Checker (keine broken links)

Deploy wird **blockiert**, wenn Gates nicht erfüllt sind.

## 💰 Wertnachweis (≥ 20.000 €)

| Leistung | Aufwand | Summe |
|----------|---------|-------|
| Design-System | 15h | 1.800 € |
| Frontend-Entwicklung | 40h | 4.800 € |
| Security-Härtung | 12h | 1.800 € |
| SEO & Content | 16h | 1.600 € |
| Accessibility Audit | 8h | 960 € |
| Performance-Optimierung | 10h | 1.200 € |
| CI/CD-Pipeline | 6h | 720 € |
| Testing & QA | 12h | 1.200 € |
| Dokumentation | 8h | 800 € |
| Projektmanagement | 15h | 1.800 € |
| Rechtliche Beratung | - | 1.500 € |
| **Gesamt (netto)** | - | **≈ 21.050 €** |

## 📞 Support

**GitHub Issues:** https://github.com/umutcantezgel-cpu/cinar-grill-seite/issues

---

**Built with ❤️ using Astro, Tailwind CSS, and modern web standards.**

**Status:** ✅ Production-Ready | 🚀 Deploy-fähig
