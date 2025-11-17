import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const locations = [
  'Dorm',
  'Campus',
  'Coca-Cola Factory',
  'Gym',
  'Supermarket free supply spot',
  'Jail',
  'Port Baku',
  "William Wallace’s Daşşaq",
]

export default function Welcome() {
  const [selected, setSelected] = useState('')
  const navigate = useNavigate()

  const startScan = () => {
    if (!selected) return
    navigate(`/radar?loc=${encodeURIComponent(selected)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur rounded-2xl shadow-xl border border-white/40 p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 shadow-md flex items-center justify-center text-white text-2xl font-black">JL</div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-800">Welcome, Suad 👋</h1>
          <p className="mt-2 text-gray-600">Please confirm your current area of dislocation to begin the Juggernaut scan.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelected(loc)}
              className={`text-left rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
                selected === loc
                  ? 'border-pink-500 ring-pink-300 bg-pink-50/80 text-pink-800'
                  : 'border-gray-200 hover:border-gray-300 bg-white/70 text-gray-800'
              }`}
            >
              <span className="font-semibold">{loc}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between gap-3">
          <div className="text-sm text-gray-500">Personalized for Suad • Juggernaut Locator</div>
          <button
            onClick={startScan}
            disabled={!selected}
            className={`inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold transition-all shadow ${
              selected
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:opacity-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
            }`}
          >
            Start Scan
          </button>
        </div>
      </div>
    </div>
  )
}
