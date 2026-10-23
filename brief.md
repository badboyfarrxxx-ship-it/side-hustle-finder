# Side-Hustle Finder — brief

## One-liner
Enter your skills, weekly hours and budget; three AIs (xAI, OpenAI, OpenRouter) each pitch an AI money idea side by side, with a first step you can take today.

## User
Me: someone learning how to make money with AI.

## Demo path (the ONLY priority)
1. Open the live URL — one screen.
2. Fill 3 fields: Skills (text), Hours/week (number), Budget $ (number).
3. Click "Find my hustles".
4. Three cards appear, labelled xAI / OpenAI / OpenRouter. Each shows:
   - Idea name
   - Why it fits me (1 line)
   - Est. first-month earnings range
   - First step today (1 concrete action)
5. Works identically with USE_FIXTURES=1 (no Wi-Fi).

## Output contract (each AI returns JSON)
{ "idea": string, "why": string, "earnings": string, "firstStep": string }

## Out of scope
Accounts, settings, admin, history, payments.

## Bonus (only after hour 32, pick at most one)
- Save results to Supabase and show "past hustles"
- "Pick winner" button that asks one AI to compare the three
