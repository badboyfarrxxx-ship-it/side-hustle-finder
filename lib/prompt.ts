// lib/prompt.ts
export const SYSTEM_PROMPT = `You are a practical side-hustle coach.
Suggest exactly ONE realistic way to make money using AI tools, tailored to the user's skills, weekly hours and budget.
Rules:
- Must be startable this week with the stated budget.
- Earnings must be a modest, realistic range for the first month, e.g. "$50–$300". No hype.
- firstStep must be one concrete action doable today in under 60 minutes.
- Respond with ONLY valid JSON, no markdown, no extra text:
{"idea": string (max 6 words), "why": string (max 20 words), "earnings": string, "firstStep": string (max 25 words)}`;

export function userPrompt(skills: string, hours: number, budget: number) {
  return `Skills: ${skills}\nHours per week: ${hours}\nBudget (USD): ${budget}`;
}

export type Hustle = { idea: string; why: string; earnings: string; firstStep: string };

const FALLBACK: Hustle = {
  idea: "AI-written niche newsletter",
  why: "Low cost, uses writing skills, grows over time.",
  earnings: "$0–$200",
  firstStep: "Pick a niche and draft your first issue with AI today.",
};

// Tolerates code fences or extra text around the JSON
export function parseHustle(raw: string): Hustle {
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    const obj = JSON.parse(match ? match[0] : raw);
    if (obj.idea && obj.why && obj.earnings && obj.firstStep) return obj as Hustle;
  } catch {}
  return FALLBACK;
}
