# Side-Hustle Finder

Enter your skills, hours per week and budget, and xAI, OpenAI and OpenRouter each pitch one AI money idea side by side.

## Run it on Windows

1. Install **Node.js LTS** from https://nodejs.org (accept the defaults), then open a new **Command Prompt**.
2. Unzip `side-hustle-finder.zip`, e.g. to your Desktop.
3. In Command Prompt:
   ```
   cd %USERPROFILE%\Desktop\side-hustle-finder
   npm install
   copy .env.example .env
   npm run dev
   ```
4. Open http://localhost:3000 and click **Find my hustles**.

`.env` starts with `USE_FIXTURES=1`, so the app uses the saved answers in `fixtures/` (works offline).
To use the real AIs, open `.env` in Notepad, paste your (freshly rotated) keys and model names, and set `USE_FIXTURES=0`. Restart `npm run dev`.

## Deploy

```
npx vercel
```
Then add the same variables from `.env` in the Vercel dashboard (Project → Settings → Environment Variables) and run `npx vercel --prod`.

Never commit `.env` — it's already in `.gitignore`.
