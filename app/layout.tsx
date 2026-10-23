import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Side-Hustle Finder", description: "Three AIs pitch you an AI side hustle" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
