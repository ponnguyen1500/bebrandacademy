# Bê Brand Academy v5.3 — Refined Speaker & Footer Layout

Complete editable React + Vite source project. Includes the official transparent Bê Brand Light/Dark logos, Talkshow content, responsive design, and Google Tag Manager `GTM-K4LHPRZB`.

## Run on Windows with VS Code

1. Unzip the project and open the `BeBrandAcademy-v5.3-Speaker-Layout-Fix` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run `npm.cmd install`.
4. Run `npm.cmd run dev` and open the local Vite address displayed in the terminal.
5. When ready to publish, run `npm.cmd run build` to generate the `dist/` folder.

## Design refinements in v5.3

- **Speaker section moved to position 02:** immediately after the featured Talkshow, before Challenges (03) and Journey (04). Section numbering, header and footer navigation updated.
- **Header-only theme control:** footer Light/Dark switch removed; header sliding switch and saved preference remain intact.
- **Full Gmail address on one line:** responsive footer grid reflows to give contact information sufficient width on tablets and phones.

## Design refinements inherited from v5.2

- **Compact professional header:** desktop header ~100px, tablet ~88–94px, phones ~76px.
- **Official Bê Brand full-symbol logo:** shown at a considered smaller size; no new wordmark, redrawing, distortion, background tile, effects, or color modifications.
- **Elegant Light/Dark switch:** a sliding circular thumb with Sun/Moon state, smooth motion, keyboard support, accessible switch role, and persisted user preference.
- **Improved featured Talkshow banner:** date and event information are separated by a dedicated vertical divider with balanced whitespace.
- **Vietnamese name integrity:** "Đặng Bảo Nhân" remains on one line in speaker cards, session metadata, and event details, with a responsive font size that fits mobile screens.
- **Layered luxury gradients:** subtle cream/charcoal/red light and depth on the *backgrounds*, not on any logo.
- **Poster remains intact:** `BRANDING / & / PERFORMANCE`, with PERFORMANCE unbroken on one line.
- **GTM preserved:** `GTM-K4LHPRZB` remains in `<head>` and `<body>` in `index.html`.

## Project structure

```text
src/
  App.jsx           All website components and UI behavior
  styles.css        Brand themes, gradients, sizing, responsive breakpoints
  content.js        Talkshow copy, sessions, speakers, FAQs, registration link
  main.jsx          React app mount
public/
  favicon.png       Bê Brand favicon
  logo-light.png    Official logo full-symbol light variant (transparent PNG)
  logo-dark.png     Official logo full-symbol dark variant (transparent PNG)
  logos/
    logo-light.png
    logo-dark.png
    logo-light.svg
    logo-dark.svg
index.html          SEO/metadata, GTM container
package.json        Dependencies and scripts
vite.config.js      Vite + React configuration
netlify.toml        Netlify build/deployment configuration
DEPLOY-GODADDY-NETLIFY.md   GitHub/Netlify/GoDaddy deployment guide
BRAND-COMPLIANCE.md Brand usage and content limitations
CHANGELOG.md       Summary of v5.2 UI changes
```

## Brand colors and typography

- Red: `#C23B27`
- Cream: `#DED2C1` (main Light Mode background)
- Brand charcoal: `#3D3E38`
- Dark canvas: `#0B0D0C` (requested blackboard black)
- Headline: Clash Display (English); Be Vietnam Pro fallback for Vietnamese headings to preserve tone marks
- Body: Roboto Slab

Fonts load from their public online providers at runtime. Font files are **not** distributed in this project.

## Talkshow and production considerations

- Academy Debut date displayed: **21 November 2026**, based on the owner's latest instruction; an older internal roadmap also mentioned **15 November 2026**. Verify before publishing.
- "The Foundation of Branding & Performance" is a 5-session Talkshow series.
- Event price of **299,000 VND** on the site is explicitly marked **draft / subject to confirmation**.
- The registration URL is blank in `src/content.js`, so registration currently opens the official Bê Brand Facebook page. Replace `talkshow.registrationUrl` with the verified ticket URL before public launch.
- Time and details for future sessions still require confirmation.
- This frontend **does not process payments or store registrations**. Configure a suitable registration/checkout provider before selling tickets.
- Preview/Tag Assistant testing is needed to confirm your GTM configuration and tags once online. Consider privacy and consent requirements before enabling tracking.

## Testing

- Source JSX parsed and CSS syntax checked successfully.
- Layout statically rendered and examined at desktop and mobile sizes, including Light/Dark mode.
- Full `npm run build` was **not** executed in this environment because the npm registry could not be reached (`EAI_AGAIN`); please run the build command in VS Code on your machine before publication.
