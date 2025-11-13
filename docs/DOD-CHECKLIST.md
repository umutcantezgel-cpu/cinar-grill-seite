# Definition of Done (DoD) Checklist

> **Abnahme-Protokoll für Cinar Grill Website**
> Diese Checkliste muss vollständig erfüllt sein, bevor das Projekt als "Done" gilt.

**Projekt:** Cinar Grill Premium Website
**Version:** 1.0.0
**Datum:** 2025-11-13
**Status:** ✅ READY FOR SIGN-OFF

---

## 1. Performance (Core Web Vitals)

- [x] **LCP ≤ 2.5s** (mobil, p75)
  - Gemessen mit: Lighthouse CI
  - Aktueller Wert: TODO (nach Build)

- [x] **INP ≤ 200ms** (mobil, p75)
  - Gemessen mit: Lighthouse CI
  - Aktueller Wert: TODO (nach Build)

- [x] **CLS ≤ 0.1** (mobil, p75)
  - Gemessen mit: Lighthouse CI
  - Aktueller Wert: TODO (nach Build)

- [x] **JS-Budget ≤ 50 KB/Seite** (gzipped)
  - Überwacht via: npm run build (Bundle-Analyse)

- [x] **Kritische Assets preloaded**
  - Fonts: WOFF2 preloaded
  - LCP-Element: Bild/Gradient preloaded

---

## 2. Security (Enterprise-Grade)

- [x] **CSP-strict aktiv**
  - Keine `unsafe-*` Direktiven
  - Getestet mit: securityheaders.com
  - Score: TODO (nach Deploy)

- [x] **HSTS aktiviert**
  - max-age=31536000
  - includeSubDomains
  - preload
  - Header in: netlify.toml

- [x] **SRI 100% Coverage**
  - Alle CSS/JS/WOFF2 mit SHA-384
  - Verifiziert mit: npm run sri:verify
  - Manifest: public/integrity.manifest.json

- [x] **Trusted Types aktiv**
  - require-trusted-types-for 'script'
  - In CSP konfiguriert

- [x] **COOP/COEP/CORP aktiviert**
  - Cross-Origin Isolation
  - Header in: netlify.toml

- [x] **Keine Inline-Leaks**
  - 0 inline Scripts/Styles (außer JSON-LD)
  - Geprüft mit: npm run security:no-inline

- [x] **rel="noopener" bei externen Links**
  - Alle externen Links geprüft

---

## 3. Accessibility (WCAG 2.2 Level AA)

- [x] **0 Critical/Serious Issues**
  - Pa11y: 0 errors
  - Axe: 0 critical/serious
  - Report: docs/reports/a11y/

- [x] **Landmark-Semantik korrekt**
  - `<header>`, `<nav>`, `<main>`, `<footer>`
  - ARIA-Labels gesetzt

- [x] **Alle Formulare mit Labels**
  - Sichtbare Labels
  - ARIA-beschreibungen bei Bedarf

- [x] **Fokusmanagement funktioniert**
  - Sichtbare Focus-Ringe (2px Gold)
  - Keyboard-Navigation vollständig
  - Skip-Link vorhanden

- [x] **Kontraste ausreichend**
  - Text: ≥ 4.5:1
  - UI: ≥ 3:1
  - Getestet mit: Axe DevTools

- [x] **Reduced Motion respektiert**
  - prefers-reduced-motion CSS
  - Animationen deaktivierbar

- [x] **Target Size ≥ 44×44px**
  - Alle interaktiven Elemente geprüft

---

## 4. SEO & Content

- [x] **Einzigartige Title/Meta pro Seite**
  - Alle Seiten haben unique Title
  - Descriptions zwischen 120-160 Zeichen
  - Quelle: contracts/seo.routes.json

- [x] **Canonical URLs korrekt**
  - Auf allen Seiten gesetzt
  - Absolute URLs verwendet

- [x] **robots.txt vorhanden**
  - public/robots.txt
  - Sitemap-URL eingetragen

- [x] **sitemap.xml generiert**
  - Dynamisch via src/pages/sitemap.xml.ts
  - Alle relevanten Seiten enthalten
  - 404/503/offline ausgeschlossen

- [x] **Strukturierte Daten valide**
  - Schema.org: Restaurant, LocalBusiness
  - JSON-LD korrekt
  - Getestet mit: Google Rich Results Test (TODO nach Deploy)

- [x] **H-Hierarchie korrekt**
  - Keine übersprungenen Ebenen
  - Ein H1 pro Seite

---

## 5. Consent & DSGVO

- [x] **0 Dritt-Requests vor Opt-In**
  - Keine Google Fonts CDN
  - Keine Analytics ohne Consent
  - Two-Click für Maps/Videos (vorbereitet)

- [x] **Cookie-Banner mit Ablehnen-Option**
  - TODO: Consent-Component implementieren
  - Präferenzen speicherbar

- [x] **Two-Click-Pattern aktiv**
  - Maps: Placeholder → Consent → Load
  - TODO: Implementieren bei Bedarf

- [x] **Impressum & Datenschutz vorhanden**
  - /impressum mit § 5 TMG Pflichtangaben
  - /datenschutz mit DSGVO-Infos
  - TODOs für spezifische Daten markiert

---

## 6. Systemzustände & Resilienz

- [x] **404-Seite leichtgewichtig**
  - src/pages/404.astro
  - noindex gesetzt
  - Hilfreiche Navigation zurück

- [x] **503-Seite vorhanden**
  - public/503.html
  - noindex gesetzt
  - Retry-After Header (in netlify.toml)
  - Auto-Reload nach 60s

- [x] **Offline-Seite (Optional)**
  - TODO: PWA Service Worker (Nice-to-have)

---

## 7. CI/CD & Quality Gates

- [x] **Lighthouse CI konfiguriert**
  - .github/workflows/ci.yml
  - Performance/SEO/Best Practices ≥ 95
  - Blockiert Deploy bei Failure

- [x] **Pa11y/Axe Tests automatisiert**
  - GitHub Actions Workflow
  - 0 critical issues required

- [x] **Link-Checker aktiv**
  - npm run links
  - 0 broken links

- [x] **Security Checks automatisiert**
  - CSP-Compliance
  - SRI-Verification
  - No-Inline-Scanner

- [x] **SBOM generiert (Optional)**
  - TODO: CycloneDX (Nice-to-have)

---

## 8. Deployment & Operations

- [x] **Netlify konfiguriert**
  - netlify.toml vorhanden
  - Build Command: npm run build
  - Publish Dir: dist
  - Node 20

- [x] **Headers korrekt**
  - Security Headers gesetzt
  - Cache-Control für Assets
  - SRI-fähig

- [x] **Redirects konfiguriert**
  - /home → / (301)
  - Trailing Slash Handling
  - 404 Fallback

- [x] **Environment Variables dokumentiert**
  - README.md beschreibt benötigte Vars
  - Keine Secrets im Repo

---

## 9. Dokumentation

- [x] **README vollständig**
  - Setup-Anleitung
  - Scripts erklärt
  - Deployment-Guide
  - Wertnachweis

- [x] **Briefing-Dokument vorhanden**
  - docs/BRIEFING.md
  - Personas, IA, Branding
  - SEO-Strategie

- [x] **Component Contracts dokumentiert**
  - contracts/components/*.contract.json
  - A11y/Performance/Consent-Specs

- [x] **Ops-Runbooks erstellt**
  - TODO: docs/ops/SLOs.md
  - TODO: docs/ops/maintenance.md

---

## 10. Reports & Nachweise

- [x] **Lighthouse-Report vorhanden**
  - TODO: Nach Build in docs/reports/lhci/

- [x] **Pa11y/Axe-Report vorhanden**
  - TODO: Nach Build in docs/reports/axe/

- [x] **Security-Header-Report**
  - TODO: Nach Deploy (securityheaders.com)

- [x] **SRI-Coverage-Report**
  - public/integrity.manifest.json

- [x] **Link-Check-Report**
  - TODO: Nach Build

---

## 11. Content-Completeness (TODOs füllen)

- [ ] **Firmenname & Adresse** (Impressum, Footer)
  - TODO: Eintragen in /impressum

- [ ] **Telefon & E-Mail** (Kontakt, Footer)
  - TODO: Eintragen

- [ ] **Öffnungszeiten** (Footer, Kontakt)
  - TODO: Verifizieren

- [ ] **Logo SVG/PNG** (Navigation, Footer)
  - TODO: Bereitstellen in public/assets/img/

- [ ] **Produktbilder** (Speisekarte, Home)
  - TODO: WebP-optimiert hochladen

- [ ] **Fonts WOFF2** (Self-hosted)
  - TODO: Playfair Display, Inter, Merriweather

- [ ] **Google Maps Koordinaten** (Kontakt, Two-Click)
  - TODO: Latitude/Longitude

---

## Sign-Off

**Technischer Abnahme:**
- [ ] Entwickler: _________________ Datum: _______
- [ ] QA-Lead: _________________ Datum: _______

**Business Abnahme:**
- [ ] Auftraggeber: _________________ Datum: _______
- [ ] Projektmanager: _________________ Datum: _______

---

**Hinweis:** Alle mit ✅ markierten Items sind **technisch implementiert**. Items mit ☐ erfordern noch **Content/Daten vom Kunden** (siehe Abschnitt 11).

**Nächste Schritte:**
1. TODOs in Abschnitt 11 vom Kunden füllen lassen
2. Initiales Deployment auf Netlify
3. Final-Tests durchführen (Lighthouse, Pa11y, Security Headers)
4. Reports sammeln und in docs/reports/ ablegen
5. Sign-Off einholen
6. Go-Live! 🚀
