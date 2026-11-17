GGC v9 — approved vision/mission and parent-company projects

Use with your ALREADY UPDATED local Git checkout. The script preserves all image files and makes a timestamped backup of HTML pages.

1. Extract this ZIP to any temporary folder.
2. Open VS Code terminal inside YOUR existing website repository (where index.html is).
3. Run:
   powershell -ExecutionPolicy Bypass -File "C:\path\to\extracted\apply-ggc-update.ps1"
4. Preview index.html, about.html and projects.html with Live Server.
5. git status; git add .; git commit -m "Add approved vision mission and parent-company projects"; git push origin main

Important: Existing images are not overwritten. The projects page uses images currently expected under assets/images/: manufacturing.jpg, hospital.jpg, hospitality.jpg, commercial.jpg, energy.jpg, automation.jpg. If you renamed these, adjust the src fields in projects.html.

Project descriptions refer to parent company published sectors, NOT verified individual named projects. Official portfolio: https://www.chaithanyaenterprises.com/projects

The public GitHub view available while building this package was stale; always apply to your own latest checkout.
