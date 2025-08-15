import Image from 'next/image'
import Link from 'next/link'
import type { Persona } from '@/lib/personas'

export default function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <Link href={`/chat/${persona.id}`} className="group block">
      <div className="rounded-2xl border border-slate-800 bg-card/70 p-5 hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-ring/40">
            <Image src={persona.avatarUrl} alt={persona.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold tracking-tight">{persona.name}</div>
            <div className="text-xs text-muted">{persona.title}</div>
          </div>
          <div className="text-xs text-muted group-hover:text-white transform transition-transform duration-300 group-hover:rotate-2">
            Open →
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-300 leading-6 line-clamp-3">{persona.bio}</p>
      </div>
    </Link>
  )
}