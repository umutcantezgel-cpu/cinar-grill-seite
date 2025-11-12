# Definition of Done (DoD) – Acceptance Checklist

**Project**: Cinar Grill Enterprise Website
**Version**: 2.0.0
**Date**: 2024-11-12

This checklist must be completed and signed off before deployment to production.

---

## ✅ Performance

- [ ] **Lighthouse Performance Score**: ≥ 95 (mobile, p75)
- [ ] **LCP** (Largest Contentful Paint): ≤ 2.5s @ p75
- [ ] **INP** (Interaction to Next Paint): ≤ 200ms @ p75
- [ ] **CLS** (Cumulative Layout Shift): ≤ 0.1 @ p75
- [ ] **JavaScript Budget**: ≤ 50 KB per page
- [ ] **CSS Budget**: Optimized, single bundle, no critical bloat
- [ ] **Fonts**: WOFF2, self-hosted, preloaded
- [ ] **Critical Assets**: Preloaded (hero image, fonts)
- [ ] **Images**: Optimized (WebP/AVIF), lazy-loaded

**Evidence**: Lighthouse CI report in `docs/reports/lhci/`

---

## ✅ Accessibility (A11y)

- [ ] **Lighthouse Accessibility Score**: 100
- [ ] **Pa11y**: 0 critical issues, 0 serious issues
- [ ] **Axe-core**: 0 critical issues, 0 serious issues
- [ ] **WCAG 2.2 AA**: Full compliance
- [ ] **Keyboard Navigation**: All interactive elements accessible (Tab, Enter, Space)
- [ ] **Focus Management**: Visible focus rings, logical tab order
- [ ] **Touch Targets**: All buttons/links ≥ 24×24px (WCAG 2.2)
- [ ] **Landmarks**: Proper `<header>`, `<nav>`, `<main>`, `<footer>` structure
- [ ] **Headings**: Logical hierarchy (H1 → H2 → H3, no skips)
- [ ] **Labels**: All form controls have visible labels or `aria-label`
- [ ] **ARIA**: Proper `role`, `aria-*` attributes where needed
- [ ] **Alt Text**: All images have descriptive alt attributes
- [ ] **Reduced Motion**: `prefers-reduced-motion` respected
- [ ] **High Contrast**: Tested in high-contrast mode

**Evidence**: Pa11y & Axe reports in `docs/reports/axe/`, `docs/reports/pa11y/`

---

## ✅ Security

- [ ] **CSP (Content Security Policy)**: Strict mode, no `unsafe-*` directives
- [ ] **HSTS**: `max-age=31536000; includeSubDomains; preload`
- [ ] **SRI (Subresource Integrity)**: 100% coverage for CSS/JS/WOFF2
- [ ] **Trusted Types**: Active for scripts (`Require-Trusted-Types-for: 'script'`)
- [ ] **No Inline Scripts**: 0 inline `<script>` (except JSON-LD)
- [ ] **No Inline Styles**: 0 inline `<style>` tags or `style=` attributes
- [ ] **No Inline Event Handlers**: 0 `onclick`, `onload`, etc.
- [ ] **X-Frame-Options**: `DENY`
- [ ] **X-Content-Type-Options**: `nosniff`
- [ ] **Referrer-Policy**: `strict-origin-when-cross-origin`
- [ ] **Permissions-Policy**: Minimal permissions
- [ ] **COOP/COEP/CORP**: Cross-Origin policies active
- [ ] **External Links**: `rel="noopener"` on all external links
- [ ] **Dependencies**: No known vulnerabilities (`npm audit`)
- [ ] **SBOM**: Generated and stored

**Evidence**:
- SRI manifest in `dist/integrity.manifest.json`
- No-inline scan report: `npm run security:inline`
- SecurityHeaders.com grade: A
- Mozilla Observatory grade: A

---

## ✅ SEO

- [ ] **Lighthouse SEO Score**: ≥ 95
- [ ] **Unique Titles**: Each page has unique `<title>`
- [ ] **Unique Descriptions**: Each page has unique `<meta name="description">`
- [ ] **Canonical URLs**: All pages have `<link rel="canonical">`
- [ ] **Robots Meta**: Correct `robots` directives (index/noindex)
- [ ] **Sitemap**: `sitemap.xml` present and valid
- [ ] **Robots.txt**: Present and correct
- [ ] **Structured Data**: JSON-LD for Restaurant, LocalBusiness, Reviews
- [ ] **Open Graph**: Facebook meta tags complete
- [ ] **Twitter Cards**: Twitter meta tags complete
- [ ] **Heading Structure**: Single H1 per page, logical hierarchy
- [ ] **Internal Links**: All important pages linked
- [ ] **External Links**: Proper `rel` attributes
- [ ] **hreflang** (if i18n): Correct language tags

**Evidence**: Lighthouse SEO report, schema.org validator

---

## ✅ Consent & DSGVO/TTDSG

- [ ] **Consent Banner**: Functional, with "Accept" and "Reject" options
- [ ] **Two-Click Embeds**: Google Maps and YouTube require consent
- [ ] **No Tracking Before Consent**: Zero third-party requests until opt-in
- [ ] **Consent Storage**: Persistent (localStorage), versioned
- [ ] **Privacy Policy**: Complete, accessible, DSGVO-compliant
- [ ] **Imprint (Impressum)**: Complete, accessible, TMG-compliant
- [ ] **Cookie Info**: Documented in privacy policy

**Evidence**: Manual testing, network tab inspection (0 third-party requests on load)

---

## ✅ Functionality

- [ ] **All Pages Load**: Home, Menu, About, Contact, Legal, Error pages
- [ ] **Navigation**: Functional, responsive, keyboard-accessible
- [ ] **Forms**: Validation (client + server), honeypot, rate-limiting
- [ ] **Links**: All internal & external links work (0 broken links)
- [ ] **Responsive**: Mobile, tablet, desktop layouts correct
- [ ] **Browser Compatibility**: Tested in Chrome, Firefox, Safari, Edge
- [ ] **Error Pages**: 404, 503, offline pages functional and lightweight

**Evidence**: Manual testing, link checker report

---

## ✅ CI/CD & Quality Gates

- [ ] **All CI Jobs Pass**: TypeScript, Build, SRI, Lighthouse, A11y, Links
- [ ] **Quality Gate**: Deployment blocked if any check fails
- [ ] **Artifacts**: Reports uploaded to GitHub Actions
- [ ] **SBOM**: Generated and stored

**Evidence**: GitHub Actions workflow run (all green)

---

## ✅ Operations

- [ ] **Monitoring**: Uptime monitoring configured
- [ ] **SLOs Defined**: Availability, LCP, INP, A11y, Security
- [ ] **Incident Templates**: Created and documented
- [ ] **Runbooks**: Maintenance mode, rollback procedures
- [ ] **Backups**: Deployment artifacts stored
- [ ] **Rollback Plan**: Documented and tested

**Evidence**: `docs/ops/` documentation

---

## ✅ Documentation

- [ ] **README**: Complete, with Quick Start, Testing, Deployment
- [ ] **Contracts**: All JSON contracts documented
- [ ] **Design Tokens**: Documented in `src/styles/tokens.css`
- [ ] **Component Docs**: Contract files for all components
- [ ] **Runbooks**: Ops procedures documented
- [ ] **DoD Checklist**: This file, signed off
- [ ] **Handover Docs**: Ready for client/team

**Evidence**: Files in `docs/`, `contracts/`, `README.md`

---

## 📝 Sign-Off

### Development Team

- [ ] **Lead Developer**: Name, Date, Signature
- [ ] **QA Engineer**: Name, Date, Signature
- [ ] **Security Engineer**: Name, Date, Signature
- [ ] **Accessibility Specialist**: Name, Date, Signature

### Client/Stakeholder

- [ ] **Product Owner**: Name, Date, Signature
- [ ] **Technical Lead**: Name, Date, Signature

---

## 📊 Final Scores (Fill in actual values)

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| Lighthouse Performance | ≥ 95 | ___ | ☐ |
| Lighthouse Accessibility | 100 | ___ | ☐ |
| Lighthouse Best Practices | ≥ 95 | ___ | ☐ |
| Lighthouse SEO | ≥ 95 | ___ | ☐ |
| LCP (p75) | ≤ 2.5s | ___ | ☐ |
| INP (p75) | ≤ 200ms | ___ | ☐ |
| CLS (p75) | ≤ 0.1 | ___ | ☐ |
| Axe Critical Issues | 0 | ___ | ☐ |
| Pa11y Serious Issues | 0 | ___ | ☐ |
| Broken Links | 0 | ___ | ☐ |
| SRI Coverage | 100% | ___ | ☐ |
| Inline Violations | 0 | ___ | ☐ |
| SecurityHeaders Grade | A | ___ | ☐ |

---

## ✅ Final Approval

- [ ] **All checklist items completed**: YES / NO
- [ ] **All scores meet or exceed targets**: YES / NO
- [ ] **All sign-offs collected**: YES / NO
- [ ] **Ready for production deployment**: YES / NO

**Deployment Approved By**: ____________________
**Date**: ____________________
**Signature**: ____________________

---

**Notes**:

- This checklist must be completed BEFORE production deployment
- Any failing item must be resolved or explicitly waived with justification
- All evidence (reports, screenshots) must be archived in `docs/reports/`
- Revisit this checklist for each major release

---

**Status**: ⏳ Pending Completion
**Next Review**: After first build + test run
