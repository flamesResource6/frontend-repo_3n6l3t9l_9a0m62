import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function Spinner({ colorFrom, colorTo }) {
  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-96">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur border border-white/30 shadow-inner" />
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`absolute inset-0 animate-spin-slow`}> 
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-[conic-gradient(var(--grad-colors))]`} style={{
            ['--grad-colors']: `${colorFrom}, transparent 40%`,
          }} />
        </div>
      </div>
      <div className="absolute inset-8 rounded-full border-2 border-white/40" />
      <div className="absolute inset-16 rounded-full border border-white/30" />
      <div className="absolute inset-24 rounded-full border border-white/20" />
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
    </div>
  )
}

export default function Radar({ mode }) {
  const navigate = useNavigate()
  const query = useQuery()
  const loc = query.get('loc') || 'Somewhere'

  const isJuggernaut = mode === 'juggernaut'
  const [status, setStatus] = useState('Scanning...')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true)
      if (isJuggernaut) {
        setStatus('No Mashallahs found around you')
      } else {
        setStatus('Nearest Oğrash is in Arizona, 8,552 kilometers away')
      }
    }, 10000)
    return () => clearTimeout(t)
  }, [isJuggernaut])

  const goNext = () => {
    if (isJuggernaut) {
      navigate(`/ogrash?loc=${encodeURIComponent(loc)}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${isJuggernaut ? 'bg-gradient-to-br from-pink-100 via-white to-orange-100' : 'bg-gradient-to-br from-emerald-50 via-white to-green-100'}`}>
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm text-gray-500 mb-2">Location: <span className="font-semibold text-gray-700">{loc}</span></p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-800">{isJuggernaut ? 'Juggernaut Radar' : 'Oğrash Locator'}</h2>

          <div className="mt-8">
            <Spinner colorFrom={isJuggernaut ? '#fb7185' : '#34d399'} colorTo={isJuggernaut ? '#f97316' : '#10b981'} />
          </div>

          <div className="mt-8 text-lg sm:text-xl font-semibold text-gray-700 animate-pulse">{status}</div>

          <div className="mt-8 flex items-center gap-3">
            {isJuggernaut && (
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded-xl text-gray-600 bg-white/70 border border-gray-200 hover:bg-white transition"
              >
                Change location
              </button>
            )}
            <button
              onClick={goNext}
              disabled={!done}
              className={`px-5 py-3 rounded-xl font-semibold transition shadow ${
                done
                  ? isJuggernaut
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
              }`}
            >
              {isJuggernaut ? 'Go to Oğrash Locator' : 'Back Home'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg);} }
      `}</style>
    </div>
  )
}
