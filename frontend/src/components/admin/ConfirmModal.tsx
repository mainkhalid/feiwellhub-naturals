'use client'

import { AlertTriangle, X } from 'lucide-react'

interface Props {
  open:       boolean
  title:      string
  message:    string
  confirmLabel?: string
  danger?:    boolean
  onConfirm:  () => void
  onCancel:   () => void
}

export default function ConfirmModal({
  open, title, message, confirmLabel = 'Confirm',
  danger = true, onConfirm, onCancel,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"
           onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)]
                      w-full max-w-[400px] p-6 animate-fade-up">
        <button onClick={onCancel} aria-label="Close"
          className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-bark
                     rounded-lg hover:bg-gray-100 transition-colors">
          <X size={16} />
        </button>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4
          ${danger ? 'bg-red-50' : 'bg-sage-pale'}`}>
          <AlertTriangle size={22} className={danger ? 'text-red-500' : 'text-sage'} />
        </div>

        <h3 id="modal-title" className="font-display text-xl text-bark mb-2">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed mb-6">{message}</p>

        <div className="flex gap-3">
          <button onClick={onCancel}
            className="btn btn-ghost flex-1 justify-center">
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`btn flex-1 justify-center text-white
              ${danger
                ? 'bg-red-500 border-red-500 hover:bg-red-600'
                : 'bg-sage border-sage hover:bg-sage/90'}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
