import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-blue-900/30 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Physics Wave Lab
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            Interactive 3D Wave Physics Simulation
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore wave phenomena through real-time 3D visualization.
            Experience interference patterns, damping effects, and turbulence
            in an immersive physics laboratory.
          </p>

          {/* CTA Button */}
          <Link
            href="/lab/wave"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Enter the Lab →
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">
                Real-time 3D Simulation
              </h3>
              <p className="text-gray-400">
                Watch waves evolve in real-time using accurate physics calculations
                based on the wave equation: z = A·sin(kx - ωt + φ)
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-3 text-purple-300">
                Interactive Controls
              </h3>
              <p className="text-gray-400">
                Adjust amplitude, frequency, phase, damping, and speed in real-time
                to see how each parameter affects wave behavior
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-3 text-pink-300">
                Advanced Physics
              </h3>
              <p className="text-gray-400">
                Explore interference patterns, wave superposition, turbulence effects,
                and damping phenomena
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Physics Info Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Wave Physics Fundamentals
          </h2>

          <div className="space-y-4 text-gray-300 font-mono text-sm md:text-base">
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <div className="text-gray-400 mb-2">Wave Equation:</div>
              <div className="text-blue-300">z = A·sin(kx - ωt + φ)</div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <div className="text-gray-400 mb-2">Angular Frequency:</div>
                <div className="text-purple-300">ω = 2πf</div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <div className="text-gray-400 mb-2">Wave Number:</div>
                <div className="text-pink-300">k = ω / v</div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <div className="text-gray-400 mb-2">Wave Energy:</div>
                <div className="text-green-300">E ∝ A²</div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <div className="text-gray-400 mb-2">Damping:</div>
                <div className="text-orange-300">e^(-γr)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500 border-t border-white/10">
        <p>Built with Next.js, Three.js, React Three Fiber, and Zustand</p>
        <p className="mt-2 text-sm">
          An interactive physics education platform
        </p>
      </footer>
    </div>
  );
}
