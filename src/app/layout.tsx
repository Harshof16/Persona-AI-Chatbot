import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chatbot - Chat with Personas",
  description: "Interact with AI personas in a customizable chat interface built with Next.js.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh">
          <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-bg/70 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <Link href={`/`} >
                {/* <h1 className="rounded-2xl border border-slate-800 bg-card/70 p-5 hover:border-slate-700 transition-colors shadow-sm">
          Persona Chatbot */}
                <div className="text-lg font-semibold tracking-tight">Persona Chat</div>
                {/* </h1> */}
              </Link>
              <nav className="flex gap-3 text-sm">
                <Link href="https://www.linkedin.com/in/harsh-shukla-921566154/" target="_blank" rel="noopener noreferrer" className="text-muted hover:underline">
                  LinkedIn
                </Link>
                •
                <Link href="https://github.com/Harshof16" target="_blank" rel="noopener noreferrer" className="text-muted hover:underline">
                  GitHub
                </Link>
                •
                <Link href="https://portfolio-personal-4xvx.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-muted hover:underline">
                  Portfolio
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
