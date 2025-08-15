import Image from 'next/image'
import { notFound } from 'next/navigation'
import ChatWindow from '@/components/ChatWindow'
import { getPersona } from '@/lib/getPersona.server'

export default function ChatPage({ params }: { params: { id: string } }) {
  console.log('params.id:--', params.id)
  const persona = getPersona(params.id)
  if (!persona) return notFound()

  return (
    <section className="grid gap-6 md:grid-cols-[280px_1fr]">
      <aside className="rounded-2xl border border-slate-800 bg-card/60 p-5 h-fit">
        <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-ring/40">
          <Image src={persona.avatarUrl} alt={persona.name} fill className="object-cover" />
        </div>
        <h2 className="mt-4 text-lg font-semibold tracking-tight">{persona.name}</h2>
        <p className="text-sm text-muted">{persona.title}</p>
        <p className="mt-3 text-sm text-slate-300 leading-6">{persona.bio}</p>
      </aside>
      <div>
        <ChatWindow persona={persona} />
      </div>
    </section>
  )
}