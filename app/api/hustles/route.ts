// app/api/hustles/route.ts
import { askXai, askOpenAI, askOpenRouter } from "@/lib/api";
import { SYSTEM_PROMPT, userPrompt, parseHustle } from "@/lib/prompt";

export async function POST(req: Request) {
  const { skills, hours, budget } = await req.json();
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: userPrompt(skills, Number(hours), Number(budget)) },
  ];
  const [xai, openai, openrouter] = await Promise.all([
    askXai(messages), askOpenAI(messages), askOpenRouter(messages),
  ]);
  return Response.json({
    xai: parseHustle(xai),
    openai: parseHustle(openai),
    openrouter: parseHustle(openrouter),
  });
}
