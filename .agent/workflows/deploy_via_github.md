---
description: Deploy to Vercel via GitHub
---

# Deploy to Vercel via GitHub

This workflow guides you through pushing your code to GitHub and deploying it with Vercel.

## Part 1: Push to GitHub

1.  **Create a Repository**:
    - Go to [GitHub.com/new](https://github.com/new).
    - Name your repository (e.g., `seven-sages`).
    - Keep it **Public** or **Private**.
    - **Do not** initialize with README, .gitignore, or License (we already have them).
    - Click **Create repository**.

2.  **Push your code**:
    - Copy the commands under "…or push an existing repository from the command line".
    - They will look like this (run them in your terminal):
      ```powershell
      git remote add origin https://github.com/YOUR_USERNAME/seven-sages.git
      git branch -M main
      git push -u origin main
      ```

## Part 2: Deploy on Vercel

1.  **Go to Vercel**:
    - Visit [vercel.com/new](https://vercel.com/new).

2.  **Import Git Repository**:
    - You should see your new `seven-sages` repository in the list (you might need to click "Adjust GitHub App Permissions" if you don't see it).
    - Click **Import**.

3.  **Configure & Deploy**:
    - **Framework Preset**: Vite (should be auto-detected).
    - **Root Directory**: `./` (default).
    - Click **Deploy**.

4.  **Done!**:
    - Vercel will build your site. Once finished, you'll get a live URL (e.g., `https://seven-sages.vercel.app`).
    - Any future changes you push to GitHub will automatically redeploy your site!
