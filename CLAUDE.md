# Hackathon rules for this repo
Event: <event name> · submit by <date/time> · theme: AI side-hustle finder
Brief: brief.md. The demo path is the only priority.

Stack (locked; ask before adding any dependency)
- Next.js + Tailwind · Supabase · deployed on Vercel

Rules
- Every external API call goes through lib/api.ts
- If USE_FIXTURES=1 or a call fails, return the saved JSON from fixtures/ instead of an error
- No settings, admin or account screens unless asked
- Keys live in .env only. Never commit them
- After each change, run the app and click the demo path
