---
description: Deploy the Seven Sages website to Vercel
---

# Deploy to Vercel

This workflow will guide you through deploying your Vite + React application to Vercel.

1.  **Install Vercel CLI** (if not already installed):
    ```powershell
    npm install -g vercel
    ```

2.  **Login to Vercel**:
    ```powershell
    vercel login
    ```
    *Follow the instructions in the terminal to log in via your browser.*

3.  **Deploy**:
    Run the following command in your project root:
    ```powershell
    vercel
    ```

4.  **Configure Project**:
    - Set up and deploy? **Y**
    - Which scope? **[Select your account]**
    - Link to existing project? **N**
    - Project name? **seven-sages** (or press Enter)
    - In which directory is your code located? **./** (press Enter)
    - Want to modify these settings? **N** (Vite settings are usually auto-detected correctly)

5.  **Production Deployment**:
    Once you are happy with the preview deployment, deploy to production:
    ```powershell
    vercel --prod
    ```

6.  **Visit your site**:
    The terminal will output a Production URL (e.g., `https://seven-sages.vercel.app`). Click it to see your live website!
