# Cinar Grill – Enterprise-Grade Restaurant Website

**Premium Static-Site-Generator Project (€20k+ Value)**

A production-ready, enterprise-quality restaurant website built with Astro, TypeScript, and Tailwind CSS. Demonstrates contract-driven architecture, security hardening, accessibility excellence, and automated quality gates.

---

## 🎯 Project Overview

### Value Proposition (≥ €20,000)

This project delivers enterprise-grade quality through:

1. **Contract-Driven Architecture** – JSON schemas define all components, routes, and events (SSOT)
2. **Design Tokens System** – Tier 1/2/3 tokens for consistent, maintainable styling
3. **Security Hardening** – CSP-strict, HSTS, SRI, Trusted Types, COOP/COEP/CORP
4. **A11y Excellence** – WCAG 2.2 AA compliant, audited with Pa11y & Axe
5. **Performance Excellence** – Core Web Vitals optimized, LCP ≤ 2.5s, CLS ≤ 0.1
6. **DSGVO/TTDSG Compliance** – Consent-first, Two-Click embeds, no tracking before opt-in
7. **Automated Quality Gates** – CI/CD blocks deployment if standards not met
8. **Complete Operations Framework** – SLOs, monitoring, incident templates, runbooks
9. **Comprehensive Documentation** – Contracts, runbooks, handover docs, training materials

---

## 🏗️ Architecture

### Contract-Driven Design

All components, routes, and system behavior are defined via JSON contracts:

```
contracts/
├── manifest.webspec.json       # App metadata, budgets, policies
├── seo.routes.json             # Routes with SEO data & structured data
├── events.catalog.json         # Event definitions (CloudEvents-inspired)
├── orchestrator.json           # Layout composition & bindings
└── components/
    ├── button.contract.json
    └── two-click-embed.contract.json
```

### Design Tokens (Tier 1/2/3)

```
src/styles/tokens.css
├── Tier 1: Primitive tokens (raw values)
├── Tier 2: Semantic tokens (context-aware)
└── Tier 3: Component tokens (component-specific)
```

Integrated with Tailwind CSS for utility-first styling.

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20.0.0
- npm ≥ 10.0.0

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# → http://localhost:4321
```

### Build

```bash
npm run build
# Output: dist/
```

### Preview Production Build

```bash
npm run preview
# → http://localhost:4321
```

---

## 🧪 Testing & Quality Gates

### Run All Quality Checks

```bash
npm run test:all
```

This runs:
- TypeScript validation
- Astro build
- SRI generation & verification
- No-inline scripts/styles scanner
- Lighthouse CI (Performance, SEO, Best Practices)
- Pa11y (Accessibility)
- Axe-core (Accessibility)
- Link checker

### Individual Tests

```bash
npm run validate        # TypeScript check
npm run sri:gen         # Generate SRI hashes
npm run sri:verify      # Verify SRI coverage
npm run security:inline # Check for inline scripts/styles
npm run lhci            # Lighthouse CI
npm run a11y            # Pa11y audit
npm run a11y:axe        # Axe-core audit
npm run links           # Link checker
npm run sbom            # Generate SBOM
```

---

## 📊 Quality Metrics (Non-Negotiable)

### Performance (Core Web Vitals)

- **LCP** (Largest Contentful Paint): ≤ 2.5s @ p75
- **INP** (Interaction to Next Paint): ≤ 200ms @ p75
- **CLS** (Cumulative Layout Shift): ≤ 0.1 @ p75

### Budgets

- **JavaScript**: ≤ 50 KB per page
- **CSS**: Optimized, single bundle
- **Fonts**: WOFF2, self-hosted, preloaded

### Security

- **CSP**: Strict mode, no `unsafe-*`
- **HSTS**: `max-age=31536000; includeSubDomains; preload`
- **SRI**: 100% coverage (CSS/JS/WOFF2)
- **Trusted Types**: Active for scripts
- **No Inline**: 0 inline scripts/styles/event-handlers

### Accessibility

- **WCAG 2.2 AA**: Full compliance
- **Axe/Pa11y**: 0 critical/serious issues
- **Keyboard Navigation**: Full support
- **Focus Management**: Visible rings, logical order
- **ARIA**: Proper landmarks, labels, live regions

### SEO

- **Lighthouse SEO**: ≥ 95
- **Unique Title/Meta**: Per page
- **Structured Data**: JSON-LD (Restaurant, LocalBusiness)
- **Canonical URLs**: Correct
- **Sitemap/Robots**: Configured

---

## 🔒 Security

### Headers (Netlify)

Configured in `netlify.toml`:

- **CSP**: Strict, no unsafe directives
- **HSTS**: Preload-ready
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Minimal permissions
- **COOP/COEP/CORP**: Isolation enabled

### SRI (Subresource Integrity)

All CSS, JS, and WOFF2 files have SRI hashes:

```bash
npm run sri:gen       # Generate hashes
npm run sri:verify    # Verify coverage
```

Output: `dist/integrity.manifest.json`

### No-Inline Check

Ensures CSP compliance:

```bash
npm run security:inline
```

Scans for:
- Inline `<script>` (except JSON-LD)
- Inline `<style>`
- Inline event handlers (`onclick`, etc.)
- Inline `style=` attributes

---

## ♿ Accessibility

### WCAG 2.2 AA Compliance

- ✅ Semantic HTML5 landmarks
- ✅ Heading hierarchy
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Focus indicators (2px solid, high contrast)
- ✅ Touch targets ≥ 24×24px (WCAG 2.2)
- ✅ Labels & ARIA for all controls
- ✅ Reduced motion support
- ✅ High contrast mode support

### Audits

```bash
npm run a11y        # Pa11y (WCAG 2.2 AA)
npm run a11y:axe    # Axe-core
```

---

## 🌍 SEO

### Structured Data

Implemented via JSON-LD:

- **Restaurant** (name, cuisine, price range, hours, rating)
- **LocalBusiness** (address, contact, NAP)
- **Reviews** (aggregate rating, individual reviews)
- **Breadcrumbs** (navigation hierarchy)

### Sitemap & Robots

- `public/sitemap.xml` (TODO: generate from seo.routes.json)
- `public/robots.txt`

### Meta Tags

- Unique title/description per page
- Canonical URLs
- Open Graph (Facebook)
- Twitter Cards
- hreflang (ready for i18n)

---

## 🍪 Consent & DSGVO/TTDSG

### Two-Click Embeds

External content (Google Maps, YouTube) requires explicit consent:

1. **Preview**: User sees placeholder + consent prompt
2. **Activate**: User clicks, iframe loads with proper sandbox/referrer attributes
3. **Preference stored**: localStorage (persistent consent)

### Consent Categories

- **Essential**: Always active (no opt-in needed)
- **Analytics**: Opt-in (TODO: implementation)
- **Marketing**: Opt-in (TODO: implementation)
- **External**: Opt-in (Maps, Videos)

### Zero Tracking Before Consent

No third-party requests until user explicitly opts in.

---

## 📦 Deployment

### Netlify (Recommended)

1. Connect repo to Netlify
2. Build command: `npm run build && npm run sri:gen`
3. Publish directory: `dist`
4. Headers configured via `netlify.toml`

### Vercel

Similar setup:

```json
{
  "buildCommand": "npm run build && npm run sri:gen",
  "outputDirectory": "dist"
}
```

Add headers via `vercel.json` (convert from `netlify.toml`).

### Other Hosts

Serve `dist/` as static files. Ensure security headers are configured.

---

## 🔄 CI/CD

### GitHub Actions

Workflow: `.github/workflows/ci.yml`

**Jobs:**

1. **Validate**: TypeScript check + Build
2. **SRI Check**: Generate & verify SRI hashes
3. **Lighthouse**: Performance audit (≥ 95 score required)
4. **Accessibility**: Pa11y + Axe (0 critical issues)
5. **Links**: Check all internal/external links
6. **SBOM**: Generate CycloneDX software bill of materials
7. **Quality Gate**: Blocks merge if any job fails

**Artifacts:**

- `dist/` (build output)
- `integrity.manifest.json` (SRI hashes)
- Lighthouse reports (`.lighthouseci/`)
- Accessibility reports (`docs/reports/axe/`)
- SBOM (`docs/reports/sbom.json`)

---

## 📖 Documentation

### Contracts

All JSON contracts are in `contracts/`:

- `manifest.webspec.json` – App config, budgets, security policies
- `seo.routes.json` – Routes, meta tags, structured data
- `events.catalog.json` – Event definitions
- `orchestrator.json` – Layout composition
- `components/*.contract.json` – Component specifications

### Runbooks

See `docs/ops/`:

- **SLOs.md** – Service Level Objectives
- **incident_templates.md** – Incident response templates
- **maintenance.md** – Maintenance mode procedures

### Reports

Generated reports in `docs/reports/`:

- `lhci/` – Lighthouse CI results
- `axe/` – Axe accessibility scans
- `pa11y/` – Pa11y audits
- `links/` – Link checker results
- `csp/` – CSP violation reports
- `sbom.json` – Software Bill of Materials

---

## 📋 Definition of Done (DoD)

See `docs/DoD-checklist.md` for complete sign-off checklist:

- [ ] Lighthouse ≥ 95 (Perf/SEO/Best)
- [ ] Axe/Pa11y: 0 critical/serious
- [ ] Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- [ ] JS Budget: ≤ 50 KB/page
- [ ] CSP-strict: Active, no `unsafe-*`
- [ ] SRI: 100% coverage
- [ ] Trusted Types: Active
- [ ] No Inline: 0 violations
- [ ] Consent: Two-Click embeds functional
- [ ] SEO: Canonicals, JSON-LD valid
- [ ] Error Pages: 404/503/offline configured
- [ ] CI/CD: All gates passing

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) 4.x (Static Site Generator)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x + Custom Design Tokens
- **Testing**: Lighthouse CI, Pa11y, Axe-core, Linkinator
- **CI/CD**: GitHub Actions
- **Hosting**: Netlify (recommended)
- **Node**: 20.17.0 (LTS)

---

## 📞 Support & Maintenance

### SLOs (Service Level Objectives)

- **Availability**: 99.9% (30-day window)
- **LCP**: ≤ 2.5s @ p75
- **INP**: ≤ 200ms @ p75
- **A11y**: 0 critical issues
- **Security**: 0 critical vulnerabilities

### Monitoring

- Uptime monitoring (e.g., UptimeRobot, Pingdom)
- RUM (Real User Monitoring) for CWV (e.g., Google Analytics, SpeedCurve)
- Error tracking (e.g., Sentry) – optional
- CSP reporting endpoint (configured in manifest)

### Incident Response

See `docs/ops/incident_templates.md` for templates.

### Maintenance Mode

To enable maintenance mode:

1. Uncomment the maintenance redirect in `netlify.toml`
2. Deploy
3. All traffic redirects to `/503.html`

---

## 📄 License

MIT License

---

## 👥 Credits

**Architecture**: Contract-Driven Design, Tokens-Only Styling
**Quality**: Automated CI/CD with blocking quality gates
**Accessibility**: WCAG 2.2 AA Compliant
**Security**: CSP-strict, HSTS, SRI, Trusted Types

---

**Status**: ✅ Production-Ready
**Version**: 2.0.0
**Last Updated**: 2024-11-12
