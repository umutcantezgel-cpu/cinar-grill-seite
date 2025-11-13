# Netlify Deployment Guide - Cinar Grill Website

> **Schritt-für-Schritt-Anleitung** zum Deployment der Cinar Grill Website auf Netlify direkt aus GitHub.

---

## 📋 Voraussetzungen

- [x] GitHub-Account
- [x] Netlify-Account (kostenlos: https://app.netlify.com/signup)
- [x] Repository ist auf GitHub gepusht

---

## 🚀 Deployment-Schritte

### 1. Netlify-Account erstellen (falls noch nicht vorhanden)

1. Gehe zu https://app.netlify.com/signup
2. Wähle **"Sign up with GitHub"**
3. Autorisiere Netlify für dein GitHub-Account

### 2. Neue Site von GitHub importieren

1. **In Netlify Dashboard:**
   - Klicke auf **"Add new site"** → **"Import an existing project"**

2. **Git Provider auswählen:**
   - Wähle **"GitHub"**
   - Autorisiere Netlify (falls noch nicht geschehen)

3. **Repository auswählen:**
   - Suche nach `cinar-grill-seite`
   - Klicke auf das Repository

### 3. Build-Einstellungen konfigurieren

Netlify sollte automatisch erkennen, dass es sich um ein Astro-Projekt handelt. **Überprüfe folgende Einstellungen:**

```
Branch to deploy:        main (oder dein gewünschter Branch)
Build command:           npm run build
Publish directory:       dist
```

**Advanced Build Settings (Optional):**
```
Node version:            20
```

**WICHTIG:** Klicke auf **"Show advanced"** und füge hinzu:
- **Environment Variable:**
  - Key: `NODE_VERSION`
  - Value: `20`

### 4. Deploy starten

1. Klicke auf **"Deploy site"**
2. Netlify beginnt automatisch mit dem Build-Prozess
3. Warte ca. 1-3 Minuten (Du kannst den Build-Log live verfolgen)

### 5. Deployment überprüfen

Nach erfolgreichem Build:
- ✅ Status sollte **"Published"** sein
- ✅ Du erhältst eine temporäre URL (z.B. `https://random-name-123.netlify.app`)
- Klicke auf die URL, um die Website zu öffnen

---

## 🔧 Nach dem ersten Deployment

### Custom Domain einrichten (Optional)

1. **In Netlify:**
   - Site Settings → **Domain management**
   - Klicke auf **"Add custom domain"**

2. **Domain eingeben:**
   - Gib `cinargrill.de` ein
   - Klicke auf **"Verify"**

3. **DNS konfigurieren:**
   - Bei deinem Domain-Provider (z.B. STRATO, 1&1, GoDaddy):

   **Option A: Netlify DNS (empfohlen)**
   - Nameserver ändern zu Netlify's DNS
   - Netlify zeigt dir die Nameserver an

   **Option B: Externe DNS**
   - A-Record: `@` → `75.2.60.5`
   - CNAME-Record: `www` → `[deine-site].netlify.app`

4. **SSL-Zertifikat:**
   - Netlify aktiviert automatisch **HTTPS** (Let's Encrypt)
   - Warte ca. 24h für vollständige DNS-Propagierung

### Automatische Deployments aktivieren (Standard)

✅ **Bereits aktiv!** Jeder Push auf `main`-Branch triggert automatisch einen neuen Build.

**So funktioniert es:**
1. Du pusht Code auf GitHub (`git push origin main`)
2. Netlify erkennt den Commit
3. Automatischer Build startet
4. Bei Erfolg: Deployment auf Live-Site
5. Bei Fehler: Alter Stand bleibt online (rollback)

### Deploy Previews für Pull Requests

✅ **Bereits aktiv!** Jeder Pull Request bekommt eine eigene Preview-URL.

**Vorteile:**
- Teste Änderungen vor Merge
- Teile Preview-Link mit Team/Kunden
- Keine Auswirkung auf Live-Site

---

## 🔐 Security Headers überprüfen

Nach Deployment **UNBEDINGT prüfen:**

### 1. Security Headers Test

Besuche: https://securityheaders.com

- Gib deine Netlify-URL ein
- **Erwartetes Ergebnis:** Score **A** oder **A+**
- Alle wichtigen Header sollten grün sein:
  - ✅ Strict-Transport-Security
  - ✅ Content-Security-Policy
  - ✅ X-Content-Type-Options
  - ✅ X-Frame-Options
  - ✅ Referrer-Policy

### 2. SSL Test

Besuche: https://www.ssllabs.com/ssltest/

- Gib deine Domain ein
- **Erwartetes Ergebnis:** Score **A** oder **A+**

---

## 📊 Performance & Quality Gates

Nach Deployment **empfohlen:**

### Lighthouse Test

1. Öffne Chrome DevTools (F12)
2. Tab **"Lighthouse"**
3. Wähle:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - Device: **Mobile**
4. Klicke **"Analyze page load"**

**Erwartete Scores:**
- Performance: **≥ 95**
- Accessibility: **≥ 95**
- Best Practices: **≥ 95**
- SEO: **≥ 95**

### Accessibility Test

Online Tools:
- https://wave.webaim.org (WAVE)
- https://www.accessibilitychecker.org

**Erwartung:** 0 Errors, minimal Warnings

---

## 🛠️ Netlify-Funktionen nutzen

### Forms (Kontakt & Reservierung)

✅ **Bereits konfiguriert!**

Die Formulare verwenden `data-netlify="true"` Attribut.

**Nach Deployment prüfen:**
1. Netlify Dashboard → **Site Settings** → **Forms**
2. Teste Formular-Submissions
3. Submissions erscheinen im Netlify Dashboard
4. E-Mail-Benachrichtigungen konfigurieren:
   - Forms → **Form notifications**
   - Email notification hinzufügen

### Environment Variables (falls benötigt)

Wenn du später Secrets brauchst (z.B. API-Keys):

1. Site Settings → **Environment variables**
2. Klicke **"Add a variable"**
3. Key/Value eingeben
4. Re-deploy triggern

**Beispiele:**
```
GOOGLE_MAPS_API_KEY=...
ANALYTICS_ID=...
```

---

## 🔄 Deployment-Workflows

### Standard-Workflow (Main Branch)

```bash
# Lokal Änderungen machen
git add .
git commit -m "feat: Update homepage content"
git push origin main

# → Netlify baut automatisch neu und deployed
```

### Feature-Branch-Workflow

```bash
# Feature Branch erstellen
git checkout -b feature/neue-seite

# Änderungen machen & pushen
git add .
git commit -m "feat: Add new page"
git push origin feature/neue-seite

# → Netlify erstellt Deploy Preview

# Pull Request auf GitHub erstellen
# → Preview-URL wird im PR kommentiert

# Nach Review: Merge in main
# → Production-Deployment automatisch
```

---

## 📱 Build-Status überwachen

### Build-Benachrichtigungen

1. Site Settings → **Build & deploy** → **Deploy notifications**
2. Wähle Benachrichtigungstyp:
   - ✅ Deploy succeeded
   - ✅ Deploy failed
   - ✅ Deploy started
3. Kanal wählen:
   - E-Mail
   - Slack
   - Webhook

### Build-Logs einsehen

1. **Deployments** → Wähle einen Deploy
2. **Deploy log** zeigt Details:
   - npm install Ausgabe
   - Build-Warnungen/Fehler
   - Deploy-Zeit

---

## 🐛 Troubleshooting

### Build schlägt fehl

**Häufige Ursachen:**

1. **Node Version mismatch**
   ```
   Lösung: Environment Variable NODE_VERSION=20 setzen
   ```

2. **Dependencies fehlen**
   ```
   Lösung: Prüfe package.json, führe lokal npm install aus
   ```

3. **TypeScript-Fehler**
   ```
   Lösung: npm run check lokal ausführen, Fehler fixen
   ```

4. **Build Command falsch**
   ```
   Korrekt: npm run build
   Falsch: npm build oder astro build
   ```

### Site lädt nicht / 404-Fehler

1. **Publish Directory prüfen:**
   - Muss `dist` sein (nicht `build` oder `public`)

2. **Base URL in astro.config.mjs:**
   ```js
   site: 'https://deine-domain.de'
   ```

3. **_redirects File:**
   - Netlify sollte automatisch SPA-Fallback erstellen
   - Bei Problemen: `public/_redirects` erstellen

### Formular-Submissions funktionieren nicht

1. **Prüfe HTML-Attribute:**
   ```html
   <form name="contact" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="contact" />
   ```

2. **Honeypot aktiviert?**
   ```html
   data-netlify-honeypot="bot-field"
   ```

3. **Nach jedem HTML-Change:**
   - Neuer Deploy erforderlich
   - Netlify muss Formulare neu parsen

---

## 📈 Nach Go-Live Checklist

- [ ] Custom Domain konfiguriert & DNS propagiert
- [ ] HTTPS aktiv (grünes Schloss im Browser)
- [ ] Security Headers Score ≥ A
- [ ] Lighthouse Scores ≥ 95
- [ ] Formular-Submissions testen
- [ ] Alle Links funktionieren (kein 404)
- [ ] Mobile Ansicht testen (verschiedene Geräte)
- [ ] Google Search Console einrichten
- [ ] Sitemap einreichen: `/sitemap.xml`
- [ ] Analytics einrichten (optional, mit Consent)

---

## 🎉 Fertig!

Deine Website ist jetzt live auf Netlify! 🚀

**Nützliche Links:**
- Netlify Dashboard: https://app.netlify.com
- Netlify Docs: https://docs.netlify.com
- Astro Docs: https://docs.astro.build

**Support:**
- Netlify Community: https://answers.netlify.com
- GitHub Issues: https://github.com/umutcantezgel-cpu/cinar-grill-seite/issues

---

**Letzte Aktualisierung:** 2025-11-13
**Version:** 1.0.0
