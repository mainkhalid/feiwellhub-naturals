'use client'

import { useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { adminGetMessages, adminToggleMessageRead, adminDeleteMessage } from '@/lib/admin-api'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)

  async function load() {
    const res = await adminGetMessages()
    setMessages(res.data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function toggleRead(id: number) {
    const res = await adminToggleMessageRead(id)
    if (res.data) {
      setMessages(m => m.map(x => x.id === id ? res.data : x))
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this message?')) return
    await adminDeleteMessage(id)
    setMessages(m => m.filter(x => x.id !== id))
    if (expanded === id) setExpanded(null)
  }

  function toggleExpand(id: number) {
    setExpanded(e => e === id ? null : id)
    // mark as read when expanded
    const msg = messages.find(m => m.id === id)
    if (msg && !msg.is_read) toggleRead(id)
  }

  const unread = messages.filter(m => !m.is_read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-bark">Messages</h1>
        <p className="text-sm text-text-muted mt-1">
          {messages.length} total · {unread} unread
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white border border-bark/10 rounded-xl px-6 py-16
                        text-center text-text-muted text-sm">
          No messages yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-150
                ${msg.is_read ? 'border-bark/10' : 'border-sage-light shadow-[0_2px_12px_rgba(106,140,105,0.1)]'}`}
            >
              {/* Header row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-cream/40
                           transition-colors select-none"
                onClick={() => toggleExpand(msg.id)}
              >
                <div className="shrink-0">
                  {msg.is_read
                    ? <MailOpen size={16} className="text-text-muted" />
                    : <Mail size={16} className="text-sage" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-sm ${msg.is_read ? 'text-text-muted' : 'font-semibold text-bark'}`}>
                      {msg.full_name}
                    </span>
                    <span className="text-xs text-text-muted">{msg.email}</span>
                    {msg.phone && (
                      <span className="text-xs text-text-muted">{msg.phone}</span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 truncate ${msg.is_read ? 'text-text-muted' : 'text-bark'}`}>
                    {msg.subject}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-text-muted hidden sm:block">
                    {new Date(msg.created_at).toLocaleDateString('en-KE', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); toggleRead(msg.id) }}
                    className="p-1.5 text-text-muted hover:text-sage transition-colors"
                    title={msg.is_read ? 'Mark unread' : 'Mark read'}
                  >
                    {msg.is_read ? <Mail size={14} /> : <MailOpen size={14} />}
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(msg.id) }}
                    className="p-1.5 text-text-muted hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                  {expanded === msg.id
                    ? <ChevronUp size={14} className="text-text-muted" />
                    : <ChevronDown size={14} className="text-text-muted" />}
                </div>
              </div>

              {/* Expanded message body */}
              {expanded === msg.id && (
                <div className="px-5 pb-5 pt-0 border-t border-bark/10">
                  <div className="bg-cream rounded-lg p-4 mt-3">
                    <p className="text-sm text-text-main leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="btn btn-sm btn-outline"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
