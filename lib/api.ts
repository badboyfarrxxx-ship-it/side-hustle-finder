// lib/api.ts — every external API call goes through here (server-only)
import { promises as fs } from "fs";
import path from "path";

const USE_FIXTURES = process.env.USE_FIXTURES === "1";
const FIXTURE_DIR = path.join(process.cwd(), "fixtures");
const TIMEOUT_MS = 15000;

export type Msg = { role: "system" | "user" | "assistant"; content: string };

async function loadFixture<T>(name: string): Promise<T> {
  const file = path.join(FIXTURE_DIR, `${name}.json`);
  return JSON.parse(await fs.readFile(file, "utf8")) as T;
}

async function call<T>(fixture: string, url: string, init: RequestInit): Promise<T> {
  if (USE_FIXTURES) return loadFixture<T>(fixture);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`${fixture}: HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[api] ${fixture} failed, using fixture`, err);
    return loadFixture<T>(fixture);
  } finally {
    clearTimeout(timer);
  }
}

function chat(
  fixture: string,
  url: string,
  key: string | undefined,
  model: string,
  messages: Msg[],
  extra: Record<string, any> = {}
) {
  return call<any>(fixture, url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key || ""}`,
    },
    body: JSON.stringify({
      model,
      messages,
      ...extra,
    }),
  });
}

export async function askXai(messages: Msg[]) {
  return chat(
    "xai",
    "https://api.x.ai/v1/chat/completions",
    process.env.XAI_API_KEY,
    "grok-2-latest",
    messages
  );
}

export async function askOpenAI(messages: Msg[]) {
  return chat(
    "openai",
    "https://api.openai.com/v1/chat/completions",
    process.env.OPENAI_API_KEY,
    "gpt-4o-mini",
    messages
  );
}

export async function askOpenRouter(messages: Msg[]) {
  return chat(
    "openrouter",
    "https://openrouter.ai/api/v1/chat/completions",
    process.env.OPENROUTER_API_KEY,
    "openai/gpt-4o-mini",
    messages
  );
}
