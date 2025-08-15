'use client'
import { Role } from '@/types/chat';
import { ReactNode } from 'react'
import Markdown from 'react-markdown'

// Animated loader component
function ChatLoader() {
  return (
    <span className="flex gap-1">
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
    </span>
  )
}

export function ChatBubble({ role, children, timestamp }: { role: Role; children: ReactNode, timestamp?: string | number; }) {
  const isUser = role === 'user'
  const isThinking = children === 'Thinking…' && role === 'assistant'
   const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null

  return (
<div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
  <div className="flex flex-col max-w-[85%]">
    <div
      className={`${isUser ? 'bg-blue-600/80' : 'bg-card'} rounded-2xl px-4 py-3 text-sm leading-6 shadow border ${
        isUser ? 'border-blue-500/40' : 'border-slate-800'
      }`}
    >
      {isThinking ? (
        <ChatLoader />
      ) : (
        <Markdown
          components={{
            strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
            li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
          }}
        >
          {typeof children === 'string' ? children : String(children)}
        </Markdown>
      )}
    </div>
    {formattedTime && (
      <div
        className={`text-xs text-gray-500 mt-1.5 ${
          isUser ? 'text-right mr-1.5' : 'text-left ml-1.5'
        }`}
      >
        {formattedTime}
      </div>
    )}
  </div>
</div>

  )
}
