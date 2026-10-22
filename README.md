# Gagan Global Consulting — gaganglobe.com

Starter website for **https://gaganglobe.com/** built with HTML/CSS/JavaScript. No Node, React, backend or database needed.

## Preview

Open `index.html` locally or select **Open with Live Server** from VS Code.

## Change website content

- `index.html`: all headings, company details, services and page title
- `assets/styles.css`: colors, layout and fonts
- `assets/script.js`: mobile navigation and current year
- `assets/favicon.svg`: temporary GCC favicon; replace with approved logo
- `robots.txt`, `sitemap.xml`: search engine discovery (domain is already set to gaganglobe.com)

Business advisory, transformation, growth/partnership descriptions and hero messaging are **examples only**, not assertions about GCC's final services.

## GitHub

1. Create an **empty** repository named `gaganglobe-website` in your GitHub account (no README or .gitignore added by GitHub).
2. Open VS Code terminal in this extracted `gcc-starter` directory and run:

```sh
git init
git add .
git commit -m "Create Gagan Global Consulting starter website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gaganglobe-website.git
git push -u origin main
```

If the Git repository is already initialized, skip `git init`, `git branch`, and configure the remote only if absent.

## Publish and connect the domain

**Option A — Hostinger static hosting**: Add a website for `gaganglobe.com` in your Hostinger hosting plan and upload all website files into the domain's `public_html` folder, with `index.html` directly at its root. Enable SSL in hosting settings. A domain purchase alone does not necessarily include web hosting.

**Option B — GitHub Pages**: Enable Pages from `main` / root of the GitHub repository, add `gaganglobe.com` as the custom domain in GitHub Pages, then apply the DNS records GitHub gives you at your domain's DNS provider. Only point DNS when ready to go live. Enable HTTPS once the domain is verified and the certificate is available.

## Launch checklist

- [ ] Replace illustrative company claims/services with GCC-approved content
- [ ] Add approved brand logo and contact email
- [ ] Confirm domain DNS records and SSL
- [ ] Review mobile layouts and links
- [ ] Add privacy notice if collecting contact-form information or analytics
- [ ] Remove all draft messaging before official launch
