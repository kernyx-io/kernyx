export default function CalculatorPage() {
  return (
    <main className="bg-slate-950 min-h-screen text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold mb-6">
          World of Sea Battle — Ship Calculator
        </h1>

        {/* Ad Placeholder Top */}
        <div className="bg-slate-800 h-24 rounded mb-8 flex items-center justify-center text-gray-500">
          Top Ad Space (728x90)
        </div>

        {/* Calculator Embed */}
        <div className="border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="/calculator.html"
            className="w-full h-[1400px]"
          />
        </div>

        {/* Bottom Ad */}
        <div className="bg-slate-800 h-32 rounded mt-10 flex items-center justify-center text-gray-500">
          Bottom Ad Space
        </div>

      </div>
    </main>
  )
}
