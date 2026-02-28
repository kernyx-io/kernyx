import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      
      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-6 tracking-wide">
          KERNYX
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Competitive game build calculators and strategy guides.
          Optimize. Dominate. Win.
        </p>

        <Link
          href="/games/world-of-sea-battle"
          className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg text-lg font-semibold transition"
        >
          Explore World of Sea Battle
        </Link>
      </section>

      {/* Games Section */}
      <section className="px-8 pb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Supported Games
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Active Game */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">
              World of Sea Battle
            </h3>
            <p className="text-gray-400 mb-4">
              Ship build calculator and tactical strategy guides.
            </p>
            <Link
              href="/games/world-of-sea-battle"
              className="text-blue-400 hover:underline"
            >
              View Tools →
            </Link>
          </div>

          {/* Placeholder Game Slots */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 opacity-60">
            <h3 className="text-xl font-semibold mb-3">
              Coming Soon
            </h3>
            <p className="text-gray-400">
              More competitive titles launching soon.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 opacity-60">
            <h3 className="text-xl font-semibold mb-3">
              Coming Soon
            </h3>
            <p className="text-gray-400">
              Advanced build systems & optimization tools.
            </p>
          </div>

        </div>
      </section>

    </main>
  )
}
