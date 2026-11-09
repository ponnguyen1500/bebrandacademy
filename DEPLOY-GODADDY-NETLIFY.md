# BÊ BRAND ACADEMY — PUBLISH TO bebrandacademy.com

This project already includes the official Bê Brand Light/Dark transparent PNG logos and the Google Tag Manager **GTM-K4LHPRZB** code.

## A. Test locally (Windows / VS Code)

1. Extract the ZIP and open the folder containing `package.json` in VS Code.
2. In Terminal > New Terminal, run:

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

3. Open the local address shown in the terminal (usually `http://localhost:5173/`).
4. Check Light/Dark mode, all buttons, mobile layout and the talkshow content.

## B. Produce the live website files

In the same VS Code terminal:

```powershell
npm.cmd run build
```

Vite creates the `dist` folder, which contains the production HTML/JS/CSS and the logo assets. **The `dist` folder is what should be uploaded to static hosting, not `src` and not the ZIP.** Do not use `npm run dev` as a production server.

## C. Publish to Netlify (easiest method; no GitHub required)

1. Sign in to https://app.netlify.com/ or create an account.
2. Open https://app.netlify.com/drop (Netlify Drop).
3. Drag the **`dist` folder** (not the whole project ZIP) from Windows File Explorer into the deployment area.
4. Netlify publishes a temporary `your-site-name.netlify.app` URL. Test it on desktop and phone.
5. To publish updates later, rebuild locally (`npm.cmd run build`) and drag the new `dist` folder to the same Netlify site's Deploys page. Alternatively, connect a GitHub repository for automatic deployment. This project also contains `netlify.toml`, so a Git-based Netlify build uses `npm run build` and publishes `dist`.

## D. Connect your GoDaddy domain without moving it

1. In Netlify, open your site > **Domain management** > **Add a domain** > **Add a domain you already own**.
2. Add `bebrandacademy.com`. Keep **External DNS** if you want GoDaddy to manage DNS.
3. Check Netlify's displayed DNS instructions for your specific project. On Netlify's standard network, typical records are:
   - **A** — Name `@` — Value `75.2.60.5` (root `bebrandacademy.com`)
   - **CNAME** — Name `www` — Value **`YOUR-REAL-NETLIFY-SITE-NAME.netlify.app`** (`www.bebrandacademy.com`)
   Use the *actual site name* assigned by Netlify for the CNAME. Check the project-specific Netlify values before saving.
4. Go to https://dcc.godaddy.com/ and open the domain > **DNS** / **Manage DNS**.
5. Add or modify only the relevant `@` A and `www` CNAME records to match Netlify. Resolve conflicting old `@` A / `www` records if present. **Do not delete unrelated MX/TXT/CNAME records used by email or domain verification.**
6. Return to Netlify, verify the domain and wait for the HTTPS certificate to become active. DNS propagation can take up to 24–48 hours.
7. Confirm both `https://bebrandacademy.com` and `https://www.bebrandacademy.com` work. Select one primary domain (e.g., non-www) in Netlify.

## E. Check GTM is working

The exact GTM ID is **GTM-K4LHPRZB**, installed in `index.html` twice:
- `<head>`: Google Tag Manager script
- Immediately after `<body>`: `<noscript>` iframe fallback

After publishing:
1. Open https://tagmanager.google.com/ and select `GTM-K4LHPRZB`.
2. Click **Preview** and enter `https://bebrandacademy.com` (or the temporary Netlify URL before connecting your domain).
3. Google Tag Assistant should connect and report the container.
4. Set up your Google Analytics 4 Google tag separately within GTM if you want analytics. GTM alone does not create a GA4 property or GA4 reporting.
5. Click **Submit / Publish** in GTM when your tags and consent settings are ready.

**Privacy:** Before enabling analytics/marketing tags, assess your cookie/consent and privacy-notice obligations for your visitors and markets. Simply adding GTM does not create a consent banner.

## F. Complete before a public paid-talkshow launch

- The current registration button goes to the official Bê Brand Facebook page until a real ticketing URL is added to `src/content.js`.
- Event ticket prices are marked as draft in source content; the November 15 vs November 21 schedule conflict in source materials still needs confirmation.
- The project is a static frontend: there is no built-in payment processor, database, email automation or checkout.
- Confirm venue/platform, talkshow start time, ticket availability, official payment and privacy policy before taking registrations.
- Consider basic visitor accessibility, image checks, SEO and mobile QA.

## References

- Google Tag Manager manual install: https://support.google.com/tagmanager/answer/14847097
- Netlify Drop: https://docs.netlify.com/deploy/create-deploys/
- Netlify external DNS: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/
- GoDaddy DNS: https://www.godaddy.com/help/manage-dns-records-680
