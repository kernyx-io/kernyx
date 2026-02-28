import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-slate-950 text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-800 bg-slate-900">
        <h1 className="text-2xl font-bold tracking-widest">KERNYX</h1>
        <div className="flex gap-6 text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/games" className="hover:text-white">Games</Link>
          <Link href="/guides" className="hover:text-white">Guides</Link>
          <Link href="/support" className="hover:text-white">Support</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <h2 className="text-5xl font-bold mb-6">
          Competitive Game Optimization Platform
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-8">
          Advanced build calculators, strategy guides, and optimization tools
          designed for competitive players across multiple game ecosystems.
        </p>
        <Link
          href="/games/world-of-sea-battle"
          className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-lg text-lg font-semibold transition"
        >
          Launch World of Sea Battle Tools
        </Link>
      </section>

      {/* FEATURED GAME */}
      <section className="px-10 py-20">
        <h3 className="text-3xl font-bold mb-10 text-center">
          Now Live
        </h3>

        <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-xl border border-slate-800">
          <h4 className="text-2xl font-semibold mb-4">
            World of Sea Battle
          </h4>
          <p className="text-gray-400 mb-6">
            Ship build optimization, tactical loadout comparisons,
            and naval strategy guides built for competitive dominance.
          </p>

          <div className="flex gap-6">
            <Link
              href="/games/world-of-sea-battle/calculator"
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              Ship Calculator
            </Link>

            <Link
              href="/games/world-of-sea-battle/guides"
              className="bg-slate-800 px-6 py-3 rounded-lg"
            >
              Strategy Guides
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="px-10 py-20 bg-slate-900">
        <h3 className="text-3xl font-bold text-center mb-12">
          Platform Features
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-semibold mb-3">Build Optimization</h4>
            <p className="text-gray-400">
              Compare loadouts, optimize stats, and maximize efficiency
              using dynamic calculation engines.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-semibold mb-3">Meta Analysis</h4>
            <p className="text-gray-400">
              Stay updated with patch-driven balance changes
              and competitive meta shifts.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-semibold mb-3">Multi-Game Support</h4>
            <p className="text-gray-400">
              Expanding ecosystem built to support multiple
              competitive titles under one unified platform.
            </p>
          </div>
        </div>
      </section>

      {/* AD PLACEHOLDER */}
      <section className="px-10 py-16 text-center border-t border-b border-slate-800">
        <p className="text-gray-500 mb-4">Advertisement</p>
        <div className="bg-slate-800 h-32 max-w-4xl mx-auto rounded-lg flex items-center justify-center text-gray-600">
          Ad Space Placeholder (728x90 or Responsive)
        </div>
      </section>

      {/* UPCOMING GAMES */}
      <section className="px-10 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">
          Expanding Ecosystem
        </h3>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Coming Soon", "Coming Soon", "Coming Soon", "Coming Soon"].map((game, i) => (
            <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800 opacity-70">
              <h4 className="text-lg font-semibold">{game}</h4>
              <p className="text-gray-500 mt-2">
                Future competitive title integration.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="px-10 py-20 bg-slate-900 text-center">
        <h3 className="text-3xl font-bold mb-6">
          Support Kernyx
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Help support development, hosting, and future game expansions.
          Donations directly contribute to new calculators and guides.
        </p>

        <a
          href="#"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold"
        >
          Donate / Support
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 px-10 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} Kernyx.io — Competitive Optimization Platform
      </footer>

    </main>
  )
}
