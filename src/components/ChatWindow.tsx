'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChatMessage } from '@/types/chat'
import type { Persona } from '@/lib/personas'
import { ChatBubble } from './ChatBubble'

export default function ChatWindow({ persona }: { persona: Persona }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

    const placeholder = useMemo(() => {
        switch (persona.id) {
            case 'hitesh':
                return 'Ask about coding mindset, chai breaks, or career tips…';
            case 'piyush':
                return 'Ask about MERN stack, system design, or deployment strategies…';
            default:
                return 'Ask something interesting…';
        }
    }, [persona.id]);

  const send = async () => {
    if (!input.trim() || loading) return
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input.trim(), timestamp: new Date().toISOString() }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaId: persona.id, messages: newMessages })
      })
      const data = await res.json()
      const assistant: ChatMessage = { role: 'assistant', content: data.response ?? '…', timestamp: new Date().toISOString() }
      setMessages((prev) => [...prev, assistant])
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I ran into an error.', timestamp: new Date().toISOString() }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl border border-slate-800 bg-card/60">
      <div className="flex items-center gap-3 border-b border-slate-800/80 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <div className="text-sm text-slate-300">Chatting as <span className="font-semibold text-white">{persona.name}</span></div>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="text-center text-sm text-muted mt-8">
            Start a conversation with {persona.name.split(' ')[0]}.
          </div>
        )}
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role === 'user' ? 'user' : 'assistant'} timestamp={m.timestamp}>
            {m.content}
          </ChatBubble>
        ))}
        {loading && (
          <ChatBubble role="assistant">Thinking…</ChatBubble>
        )}
      </div>

      <div className="border-t border-slate-800/80 p-3">
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-slate-800 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/40"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send() }}
          />
          <button
            onClick={send}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}