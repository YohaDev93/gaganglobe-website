# GGC Website V6 — Multi-page preview

Built on the **approved navy-and-gold V3 design direction**, with separate static HTML pages and self-contained **original SVG illustrations**.

## How to preview
Open `index.html` via VS Code Live Server. Navigation works locally. All pages and illustrations are bundled. No build tools required.

## Publishing
Copy contents of this folder into the root of your existing `gaganglobe-website` clone, replacing old files. Run `git add .`, `git commit -m "Build GGC multi-page website"`, and `git push origin main`.

## Approval checklist BEFORE launch
- Confirm GGC proposed services and industry recruiting coverage.
- Confirm precise legal relationship and preferred public wording for parent company CEEIPL.
- Obtain parent company consent and an approved list before reproducing client names/logos. No client logos have been imported.
- Confirm `sales@` and `ops@` Google Workspace aliases receive email.
- Add approved registered office, telephone, actual open positions, and privacy policy before collecting candidate data.
- Review all page copy for final approval.

## Images
The `assets/images/*.svg` files are original vector illustrations created for this website; they are not photographs or third-party client/project pictures. Replace with licensed and approved project photography later.

## Sources for editorial reference
- https://www.chaithanyaenterprises.com/
- https://www.chaithanyaenterprises.com/specialization
- https://www.venindia.com/
- https://aarviencon.com/


## Version 7 updates
- Replaced illustration placeholders with real free-use stock photography from Pexels (loaded by URL).
- Converted the Contact page into a sendable static form using FormSubmit.
- Added a thank-you page for form submissions.

### Stock image sources used
- Team meeting: https://www.pexels.com/photo/diverse-business-team-meeting-in-modern-office-36733421/
- Interview: https://www.pexels.com/photo/candidate-having-an-interview-5439152/
- Industrial: https://www.pexels.com/photo/modern-industrial-production-facility-interior-38804512/
- Commercial building: https://www.pexels.com/photo/modern-office-building-facade-with-windows-28589010/
- Healthcare / hospital: https://www.pexels.com/photo/aerial-view-of-hospital-building-at-sunset-36078152/
- Hospitality: https://www.pexels.com/photo/exterior-of-a-building-19627822/
- Automation: https://www.pexels.com/photo/industrial-control-room-with-electrical-panels-38217230/
- Energy / substation: https://www.pexels.com/photo/high-voltage-electrical-substation-in-somerville-36358684/

### Form note
The contact form uses FormSubmit (`https://formsubmit.co/`). The first submission may trigger a verification email to the receiving mailbox before messages begin forwarding normally.


## V8 — Home sliding banner
The home hero now has 3 slides (recruitment, specialist hiring, industrial sectors) with auto-play every 6.5 seconds, navigation dots and arrows, and pauses while hovered or keyboard-focused. Auto-play is disabled when reduced motion is requested. Photographs are free-use Pexels stock photographs (externally hosted), not pictures of GGC employees or client projects.


## V8.1 correction
- Kept 3 unique hero banner slides in the order: Banner 1 (team meeting), Banner 2 (job interview), Banner 3 (industrial facility).
- Reduced repeated use of the same hero images elsewhere on the home page.


## Version 8.2 — Local images (no remote image links)

All website image `src` attributes now point to local files under `assets/images/`.
The ZIP includes local copies of the three hero photos cropped from the supplied website screenshots; five industry-specific local illustration placeholders are also included.

**For original, higher-quality Pexels photos**: Open Windows PowerShell in this project folder and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\download-original-photos.ps1
```

The script downloads all eight original stock images once, saving directly to `assets/images/` and replacing the included local previews. Afterwards the website uses **only local paths** and can be deployed to GitHub Pages without external photo dependencies.

Photo downloads require internet access once. Fonts (Google Fonts) and contact submission (FormSubmit) remain external web services.

Do not copy reference companies' project photos or client logos without permission.
