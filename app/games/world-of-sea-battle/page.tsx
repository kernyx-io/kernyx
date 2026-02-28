
import Link from "next/link"

export default function SeaBattle() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-4xl font-bold mb-6">
        World of Sea Battle
      </h1>

      <p className="text-gray-400 mb-8">
        Tactical naval combat build optimization.
      </p>

      <div className="flex gap-6">
        <Link
          href="/games/world-of-sea-battle/calculator"
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Ship Build Calculator
        </Link>

        <Link
          href="/games/world-of-sea-battle/guides"
          className="bg-slate-700 px-6 py-3 rounded-lg"
        >
          Strategy Guides
        </Link>
      </div>
    </main>
  )
}
