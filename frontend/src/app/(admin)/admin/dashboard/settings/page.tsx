'use client'

import { useEffect, useState } from 'react'
import { Save, CheckCircle, Store, Truck, Bell, Share2 } from 'lucide-react'
import { adminGetSettings, adminUpdateSettings } from '@/lib/admin-api'

const TABS = [
  { id: 'store',    label: 'Store Info',   Icon: Store  },
  { id: 'delivery', label: 'Delivery',     Icon: Truck  },
  { id: 'alerts',   label: 'Alerts',       Icon: Bell   },
  { id: 'social',   label: 'Social Media', Icon: Share2 },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [activeTab, setActiveTab] = useState('store')

  useEffect(() => {
    adminGetSettings()
      .then(res => setSettings(res.data ?? {}))
      .finally(() => setLoading(false))
  }, [])

  function update(key: string, value: string) {
    setSettings(s => ({ ...s, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await adminUpdateSettings(settings)
      if (res.data) {
        setSettings(res.data)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-bark">Settings</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage your store configuration and preferences.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="btn btn-primary disabled:opacity-60">
          {saved ? (
            <span className="flex items-center gap-2 text-white">
              <CheckCircle size={15} /> Saved!
            </span>
          ) : saving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-cream border-t-transparent
                               rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save size={15} /> Save Changes
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
        {/* Tab nav */}
        <nav className="bg-white border border-gray-100 rounded-2xl p-2 flex flex-col gap-0.5">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm
                font-medium transition-all duration-150 text-left
                ${activeTab === id
                  ? 'bg-sage-pale text-sage'
                  : 'text-text-muted hover:text-bark hover:bg-cream'}`}>
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className="bg-white border border-gray-100 rounded-2xl p-7">

          {/* Store Info */}
          {activeTab === 'store' && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl text-bark mb-1">Store Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="form-label">Store Name</label>
                  <input type="text" className="form-input"
                    value={settings.store_name ?? ''}
                    onChange={e => update('store_name', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input"
                    value={settings.store_email ?? ''}
                    onChange={e => update('store_email', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-input"
                    placeholder="+254 700 000 000"
                    value={settings.store_phone ?? ''}
                    onChange={e => update('store_phone', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">WhatsApp Number
                    <span className="text-text-muted font-normal text-xs ml-1">(with country code, no +)</span>
                  </label>
                  <input type="text" className="form-input"
                    placeholder="254700000000"
                    value={settings.whatsapp_number ?? ''}
                    onChange={e => update('whatsapp_number', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input"
                    placeholder="Nairobi, Kenya"
                    value={settings.store_location ?? ''}
                    onChange={e => update('store_location', e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">Business Hours</label>
                  <input type="text" className="form-input"
                    placeholder="Mon-Fri: 8am-6pm, Sat: 9am-4pm"
                    value={settings.business_hours ?? ''}
                    onChange={e => update('business_hours', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Delivery */}
          {activeTab === 'delivery' && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl text-bark mb-1">Delivery Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Delivery Fee (Ksh)</label>
                  <input type="number" min="0" className="form-input"
                    value={settings.delivery_fee ?? ''}
                    onChange={e => update('delivery_fee', e.target.value)} />
                  <p className="text-xs text-text-muted mt-1.5">
                    Standard delivery fee charged per order
                  </p>
                </div>
                <div>
                  <label className="form-label">Free Delivery Above (Ksh)</label>
                  <input type="number" min="0" className="form-input"
                    value={settings.free_delivery_above ?? ''}
                    onChange={e => update('free_delivery_above', e.target.value)} />
                  <p className="text-xs text-text-muted mt-1.5">
                    Orders above this amount get free delivery
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">Delivery Zones</label>
                  <textarea rows={3} className="form-input resize-none"
                    placeholder="Nairobi CBD, Westlands, Kilimani, Karen…"
                    value={settings.delivery_zones ?? ''}
                    onChange={e => update('delivery_zones', e.target.value)} />
                  <p className="text-xs text-text-muted mt-1.5">
                    Comma-separated list of areas you deliver to
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Alerts */}
          {activeTab === 'alerts' && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl text-bark mb-1">Alert Thresholds</h2>
              <div>
                <label className="form-label">Low Stock Threshold</label>
                <input type="number" min="1" className="form-input max-w-[200px]"
                  value={settings.low_stock_threshold ?? '10'}
                  onChange={e => update('low_stock_threshold', e.target.value)} />
                <p className="text-xs text-text-muted mt-1.5">
                  You'll receive a notification when a product's stock falls to or below this number.
                  Currently: <strong>{settings.low_stock_threshold ?? 10} units</strong>
                </p>
              </div>

              <div className="mt-4 p-4 bg-sage-pale rounded-xl border border-sage-light">
                <p className="text-sm text-sage font-medium">
                  💡 Notifications appear in the bell icon at the top of the admin panel.
                  They refresh automatically every 30 seconds.
                </p>
              </div>
            </div>
          )}

          {/* Social */}
          {activeTab === 'social' && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl text-bark mb-1">Social Media Links</h2>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="form-label">Instagram URL</label>
                  <input type="url" className="form-input"
                    placeholder="https://instagram.com/feiwellhub"
                    value={settings.instagram_url ?? ''}
                    onChange={e => update('instagram_url', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Facebook URL</label>
                  <input type="url" className="form-input"
                    placeholder="https://facebook.com/feiwellhub"
                    value={settings.facebook_url ?? ''}
                    onChange={e => update('facebook_url', e.target.value)} />
                </div>
              </div>
              <div className="mt-2 p-4 bg-cream rounded-xl border border-gray-100">
                <p className="text-sm text-text-muted">
                  These links appear in the storefront footer. Leave blank to hide the icon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
