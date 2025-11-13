# Projekt-Briefing: Cinar Grill Premium Website

## Unternehmen & Branding

### Unternehmen
**Name:** Cinar Grill
**Branche:** Türkisches Grill-Restaurant / Gastronomie
**Standort:** [TODO: Stadt eintragen]
**Gründungsjahr:** [TODO: Jahr eintragen]

### Markenwerte
- **Authentizität:** Traditionelle türkische Grillkunst
- **Qualität:** Frische Zutaten, handwerkliche Zubereitung
- **Gastfreundschaft:** Herzlicher, persönlicher Service
- **Modern:** Zeitgemäße Interpretation klassischer Rezepte

### Tonalität
- Warm und einladend
- Professionell, aber nicht steif
- Qualitätsbewusst ohne Arroganz
- Familiär und authentisch

## Zielgruppen

### Primäre Persona: Die Genießer-Familie
- **Alter:** 30-50 Jahre
- **Motivation:** Qualitativ hochwertiges Essen in angenehmer Atmosphäre
- **Bedürfnisse:** Familienfreundlich, authentisch, gutes Preis-Leistungs-Verhältnis
- **Geräte:** Mobile-first (Smartphone beim Suchen), Desktop für Detailplanung

### Sekundäre Persona: Junge Foodies
- **Alter:** 18-35 Jahre
- **Motivation:** Neue kulinarische Erlebnisse, Social-Media-würdig
- **Bedürfnisse:** Moderne Präsentation, Online-Reservierung, vegetarische Optionen
- **Geräte:** Primär Mobile

### Tertiäre Persona: Geschäftskunden
- **Alter:** 25-60 Jahre
- **Motivation:** Business-Lunch, Catering
- **Bedürfnisse:** Schneller Service, professionelle Abwicklung
- **Geräte:** Desktop & Mobile

## Branding-Spezifikationen

### Farbpalette
**Primärfarben:**
- **Glut-Rot:** `#C1272D` (Hauptakzent, repräsentiert Grill & Leidenschaft)
- **Charcoal:** `#2D2D2D` (Eleganz, Tiefe)
- **Warm Beige:** `#F5E6D3` (Gastfreundschaft, Wärme)

**Sekundärfarben:**
- **Gold Accent:** `#D4AF37` (Premium-Touch)
- **Olivgrün:** `#4A5D23` (Frische, mediterran)
- **Terracotta:** `#E07A5F` (Erdigkeit, Tradition)

**Neutrale Farben:**
- **Reinweiß:** `#FFFFFF`
- **Rauch:** `#F8F9FA`
- **Schiefer:** `#6C757D`
- **Tiefschwarz:** `#0D0D0D`

### Typografie
**Display/Headlines:** Playfair Display (serif, elegant)
**Body/UI:** Inter (sans-serif, modern, hochgradig lesbar)
**Akzente:** Merriweather (serif, warm)

**Format:** WOFF2 (self-hosted für Performance & DSGVO)

### Logo
- TODO: SVG-Logo bereitstellen
- Fallback: Wortmarke "CINAR GRILL" in Playfair Display

## Informationsarchitektur

### Seitenstruktur

#### 1. Home (`/`)
- **Hero:** Full-Screen mit Glassmorphism-Overlay, CTA "Tisch reservieren"
- **USPs:** 3-4 Kernwerte (Qualität, Tradition, Frische, Atmosphäre)
- **Signature Dishes:** Karussell mit Top 6 Gerichten
- **Testimonials:** Kundenbewertungen
- **Instagram Feed:** Social Proof (Two-Click)
- **CTA Footer:** Reservierung & Kontakt

#### 2. Speisekarte (`/speisekarte`)
- **Kategorien:** Vorspeisen, Grillspezialitäten, Vegetarisch, Beilagen, Desserts, Getränke
- **Filter:** Allergene, vegetarisch/vegan, scharf
- **Präsentation:** Premium Card-Layout mit Bildern
- **Preise:** Transparent, inkl. Kennzeichnungen (1, 2, 3 für Zusatzstoffe)

#### 3. Über uns (`/ueber-uns`)
- **Geschichte:** Entstehung, Philosophie
- **Team:** Chef, Grillmeister (optional mit Fotos)
- **Qualität:** Lieferanten, Zertifikate
- **Galerie:** Restaurant-Atmosphäre

#### 4. Reservierung (`/reservierung`)
- **Formular:** Datum, Uhrzeit, Personenanzahl, Anmerkungen
- **Validierung:** Client & Server-side
- **Datenschutz:** DSGVO-konform, Checkbox
- **Backend:** Netlify Forms mit Honeypot

#### 5. Kontakt (`/kontakt`)
- **Öffnungszeiten:** Strukturierte Tabelle
- **Adresse & NAP:** Schema.org-Markup
- **Telefon/E-Mail:** Click-to-Call/Mail
- **Anfahrt:** Two-Click Google Maps (Consent)
- **Kontaktformular:** Alternative zu Reservierung

#### 6. Rechtliches
- **Impressum** (`/impressum`)
- **Datenschutz** (`/datenschutz`)
- **AGB** (`/agb`) – falls Catering/Lieferung

#### 7. Systemseiten
- **404:** Humorvoll, Navigation zurück
- **503:** Wartungsmodus mit Retry-After
- **Offline:** PWA-Fallback

### Navigation
- **Header:** Sticky, mit Glassmorphism beim Scrollen
- **Desktop:** Horizontale Hauptnavigation
- **Mobile:** Hamburger-Menü (accessible)
- **Footer:** Sitemap, Rechtliches, Social Media, Kontakt

## Funktionale Module

### Priorisierte Features

1. **Reservierungssystem** (HIGH)
   - Netlify Forms + E-Mail-Benachrichtigung
   - Validierung: Datum/Zeit, Min. 1 Person, Max. 20 Personen
   - Bestätigung: Success-Page + E-Mail

2. **Speisekarte** (HIGH)
   - Dynamisch aus JSON generiert
   - Allergenkennzeichnung nach EU-Norm
   - Bilder optimiert (WebP, Lazy Loading)

3. **Two-Click Google Maps** (HIGH)
   - Consent-Pflicht erfüllt
   - Placeholder mit Adresse & statischer Karte
   - Click → Map lädt nach

4. **Consent-Banner** (HIGH)
   - Opt-In für: Analytics, Maps, Social Media
   - Ablehnen-Option prominent
   - Präferenzen speichern (localStorage + Cookie)

5. **Testimonials/Bewertungen** (MEDIUM)
   - Manuell kuratiert (keine API)
   - Schema.org Review-Markup
   - Karussell oder Grid

6. **Galerie** (MEDIUM)
   - Lightbox (accessible)
   - Lazy Loading
   - Alt-Texte verpflichtend

7. **Newsletter** (LOW - Nice-to-have)
   - Double-Opt-In
   - Netlify Functions + externe Service (Mailchimp/Brevo)

## SEO-Strategie

### Keywords (Beispiel-Region: Frankfurt)
- **Primary:** "Türkisches Restaurant Frankfurt", "Grill-Restaurant Frankfurt"
- **Secondary:** "Döner Frankfurt", "Köfte", "Lahmacun", "Adana Kebap"
- **Long-tail:** "Authentisches türkisches Essen Frankfurt", "Familienfreundliches Restaurant"

### Local SEO (NAP-Konsistenz)
- **Name:** Cinar Grill
- **Address:** [TODO: Straße, PLZ Stadt]
- **Phone:** [TODO: +49...]

### Schema.org
- **Type:** `Restaurant` + `LocalBusiness`
- **Properties:** name, address, telephone, openingHours, servesCuisine, priceRange, menu, aggregateRating

### Meta-Standards
- Unique Title/Description pro Seite
- OpenGraph + Twitter Cards
- Canonical URLs
- Hreflang (falls mehrsprachig: de-DE, en-US, tr-TR)

## Sprachen & i18n

### Phase 1 (Launch)
- **Deutsch (de-DE):** Primärsprache

### Phase 2 (Optional)
- **Türkisch (tr-TR):** Für authentischen Touch
- **Englisch (en-US):** Touristen

**URL-Strategie:** `/` (DE), `/en/`, `/tr/`
**Hreflang:** Korrekte Links im `<head>`

## Rechtliche Anforderungen

### Impressum (§ 5 TMG)
- Firmenname, Rechtsform
- Geschäftsführer
- Adresse
- Kontakt (E-Mail, Telefon)
- Handelsregister-Nr., Ust-ID
- Zuständige Aufsichtsbehörde (Gesundheitsamt)

### Datenschutz (DSGVO/TTDSG)
- Verantwortlicher
- Zweck der Datenverarbeitung (Reservierung, Kontakt, Newsletter)
- Rechtsgrundlage (Art. 6 Abs. 1 lit. a/b DSGVO)
- Speicherdauer
- Betroffenenrechte
- Netlify als Auftragsverarbeiter erwähnen

### Consent
- Kein Tracking ohne Opt-In
- Two-Click für Maps/Videos
- Cookie-Banner mit Ablehnen

## Technische Spezifikation

### Stack
- **Framework:** Astro 4.x (SSG, Static-First)
- **Styling:** Tailwind CSS 3.x + Custom Tokens
- **JavaScript:** Vanilla ESM (minimal, Progressive Enhancement)
- **Fonts:** Self-hosted WOFF2
- **Build:** Node.js 20 LTS
- **Hosting:** Netlify
- **CI/CD:** GitHub Actions

### Performance-Budgets
- **LCP:** ≤ 2.5s (mobil)
- **INP:** ≤ 200ms
- **CLS:** ≤ 0.1
- **JS:** ≤ 50 KB/Seite (gzipped)
- **Total Page Weight:** ≤ 1 MB (Initial Load)

### Security
- **CSP:** strict-dynamic, no unsafe-*
- **HSTS:** max-age=31536000; includeSubDomains; preload
- **SRI:** 100% Coverage (CSS/JS/WOFF2)
- **Trusted Types:** Enabled
- **COOP/COEP:** Cross-Origin-Isolated (wo sinnvoll)

### Accessibility
- **WCAG 2.2 Level AA**
- **Kontraste:** ≥ 4.5:1 (Text), ≥ 3:1 (UI)
- **Keyboard:** Vollständig navigierbar
- **Screen Reader:** ARIA-Labels, Landmarks
- **Reduced Motion:** respektiert

### Browser-Support
- **Modern Evergreens:** Chrome, Firefox, Safari, Edge (letzte 2 Versionen)
- **Progressive Enhancement:** Core-Funktionalität ohne JS

## Betriebsziele

### SLOs (Service Level Objectives)
- **Availability:** 99.5% Uptime (ermöglicht durch Netlify CDN)
- **Performance:** 95% aller Seitenaufrufe unter 3s LCP
- **Accessibility:** 0 Critical/Serious Issues (Pa11y/Axe)
- **Security:** 0 High/Critical Vulnerabilities

### Monitoring
- **Uptime:** Netlify Analytics + externer Monitor (UptimeRobot/Pingdom)
- **RUM:** Netlify Analytics (basic) oder cloudflare Web Analytics (privacy-first)
- **Errors:** Sentry (optional, mit Consent)

### Wartung
- **Content-Updates:** Monatlich (Speisekarte, Bilder)
- **Dependency-Updates:** Quartalsweise (npm audit fix)
- **Security-Patches:** Sofort bei Critical

## Wertnachweis (≥ 20.000 €)

### Lieferumfang

1. **Design-System:** 15 Std. × 120 €/h = 1.800 €
   - Tier 1/2/3 Tokens, Tailwind Config, Komponenten-Bibliothek

2. **Frontend-Entwicklung:** 40 Std. × 120 €/h = 4.800 €
   - 7 Seiten (Home, Menü, Über uns, Reservierung, Kontakt, Rechtliches, 404/503)
   - 15+ accessible Komponenten
   - Responsive Design (Mobile-First)

3. **Backend-Integration:** 8 Std. × 120 €/h = 960 €
   - Netlify Forms (Reservierung, Kontakt)
   - Two-Click Embeds
   - Consent-System

4. **Security-Härtung:** 12 Std. × 150 €/h = 1.800 €
   - CSP-strict, HSTS, SRI, Trusted Types
   - Penetration Testing (Basic)
   - Security-Header-Konfiguration

5. **SEO & Content:** 16 Std. × 100 €/h = 1.600 €
   - Schema.org Restaurant-Markup
   - Meta-Optimierung (7 Seiten)
   - Sitemap, Robots, Canonicals
   - Inhaltsstrukturierung

6. **Accessibility Audit:** 8 Std. × 120 €/h = 960 €
   - WCAG 2.2 AA Compliance
   - Pa11y/Axe Reports
   - Manuelle Tests (Keyboard, Screen Reader)

7. **Performance-Optimierung:** 10 Std. × 120 €/h = 1.200 €
   - Core Web Vitals Tuning
   - Image Optimization
   - Critical CSS, Preloading
   - Lighthouse Audits

8. **CI/CD-Pipeline:** 6 Std. × 120 €/h = 720 €
   - GitHub Actions Workflows
   - Quality Gates (Lighthouse, Pa11y, Security)
   - Automated Deployments

9. **Testing & QA:** 12 Std. × 100 €/h = 1.200 €
   - Cross-Browser Testing
   - Device Testing (Mobile, Tablet, Desktop)
   - User Acceptance Testing Support

10. **Dokumentation:** 8 Std. × 100 €/h = 800 €
    - Technical Documentation
    - User Guides (Content-Update)
    - Runbooks (Deployment, Maintenance)

11. **Projektmanagement:** 15 Std. × 120 €/h = 1.800 €
    - Requirements Engineering
    - Stakeholder Communication
    - Handover & Training

12. **Rechtliche Beratung & Vorlagen:** Pauschal 1.500 €
    - Impressum, Datenschutz, AGB (Vorlagen)
    - DSGVO-Compliance-Check

### **Summe:** ~19.140 € (netto)
**+ Reserve & Risikopuffer (10%):** ~21.050 €

### Langfristige Werte
- **Wiederverwendbare Komponenten:** Einsparung bei zukünftigen Projekten
- **Wartungsfreundlichkeit:** Reduzierte TCO
- **Performance → Conversion:** Schnellere Seiten = mehr Reservierungen
- **SEO → Sichtbarkeit:** Top-Rankings = organischer Traffic
- **Security → Vertrauen:** Keine Datenpannen, DSGVO-konform

---

**Status:** DRAFT – Review & Freigabe durch Stakeholder erforderlich
**Letzte Aktualisierung:** 2025-11-13
