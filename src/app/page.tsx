"use client";

import PersonaCard from '@/components/PersonaCard'
import { personas } from '@/lib/personas'

export default function DashboardPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Choose a persona</h1>
      <p className="mt-2 text-sm text-muted">Pick who you want to chat with.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {Object.values(personas).map((p) => (
          <PersonaCard key={p.id} persona={p} />
        ))}
      </div>
    </section>
  )
}
