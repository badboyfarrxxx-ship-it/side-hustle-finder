"use client";
import { useState } from "react";
import type { Hustle } from "@/lib/prompt";

type Results = { xai: Hustle; openai: Hustle; openrouter: Hustle };

const PROVIDERS: { key: keyof Results; label: string; color: string }[] = [
  { key: "xai", label: "xAI", color: "from-fuchsia-500 to-pink-500" },
  { key: "openai", label: "OpenAI", color: "from-emerald-500 to-teal-500" },
  { key: "openrouter", label: "OpenRouter", color: "from-amber-500 to-orange-500" },
];

export default function Home() {
  const [skills, setSkills] = useState("");
  const [hours, setHours] = useState("5");
  const [budget, setBudget] = useState("50");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Results | null>(null);

  async function find(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setResults(null);
    try {
      const res = await fetch("/api/hustles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, hours: Number(hours), budget: Number(budget) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setResults(await res.json());
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">💸 Side-Hustle Finder</h1>
          <p className="mt-2 text-slate-600">Three AIs each pitch you one AI money idea, with a first step for today.</p>
        </header>

        <form onSubmit={find} className="mx-auto max-w-2xl space-y-4 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-100">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Skills</span>
            <textarea className={input} rows={3} required value={skills} onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. writing, Canva, a bit of video editing" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Hours / week</span>
              <input className={input} type="number" min={1} required value={hours} onChange={(e) => setHours(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Budget $</span>
              <input className={input} type="number" min={0} required value={budget} onChange={(e) => setBudget(e.target.value)} />
            </label>
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-60">
            {loading ? "Asking three AIs…" : "Find my hustles"}
          </button>
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
        </form>

        {(loading || results) && (
          <section className="mt-10 grid gap-6 md:grid-cols-3">
            {PROVIDERS.map((p) => {
              const h = results?.[p.key];
              return (
                <article key={p.key} className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100">
                  <div className={`bg-gradient-to-r ${p.color} px-5 py-3 text-sm font-bold uppercase tracking-wide text-white`}>{p.label}</div>
                  {h ? (
                    <div className="space-y-3 p-5">
                      <h2 className="text-xl font-bold text-slate-900">{h.idea}</h2>
                      <p className="text-slate-600">{h.why}</p>
                      <p className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">💰 {h.earnings} / first month</p>
                      <div className="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-900">
                        <span className="font-bold">First step today: </span>{h.firstStep}
                      </div>
                    </div>
                  ) : (
                    <div className="animate-pulse space-y-3 p-5">
                      <div className="h-6 w-3/4 rounded bg-slate-200" />
                      <div className="h-4 w-full rounded bg-slate-100" />
                      <div className="h-4 w-1/2 rounded bg-slate-100" />
                      <div className="h-12 w-full rounded bg-slate-100" />
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
