import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const analyzeReel = async () => {
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      // Replace the URL below with your backend API endpoint
      const response = await fetch('https://your-backend-api.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // You may need to send more data depending on backend requirements
        body: JSON.stringify({ reelUrl: window.location.href })
      })
      if (!response.ok) throw new Error('Failed to analyze reel')
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[340px] w-[370px] rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.3)_0%,transparent_70%)] overflow-hidden"></div>
      <h1 className="text-3xl font-extrabold text-white drop-shadow mb-2 text-center tracking-tight">Instagram Reel Authenticity</h1>
      <p className="text-white/90 font-medium text-center mb-4">Analyze any Instagram reel to check if the information is right or wrong.</p>
      <button
        className="px-8 py-2 bg-white/90 text-pink-600 font-bold rounded-full shadow-lg hover:bg-white transition-colors duration-200 border-2 border-white/80 backdrop-blur disabled:opacity-60"
        onClick={analyzeReel}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Reel'}
      </button>
      {result && (
        <div className="mt-4 w-full bg-white/80 rounded-2xl p-4 shadow-inner border border-white/60">
          <h2 className="text-lg font-bold mb-2 text-pink-600">Result:</h2>
          <p className={result.isAuthentic ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {result.isAuthentic ? 'This reel contains authentic information.' : 'This reel may contain false or misleading information.'}
          </p>
          {result.details && <p className="text-gray-700 mt-2">{result.details}</p>}
        </div>
      )}
      {error && <p className="text-red-100 font-semibold mt-2 bg-red-500/70 px-3 py-1 rounded-xl shadow">{error}</p>}
    </div>
  )
}

export default App
