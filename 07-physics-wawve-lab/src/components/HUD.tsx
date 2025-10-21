'use client';

import { useWaveStore } from '@/store/waveStore';

export function HUD() {
  const { params, performance, time } = useWaveStore();

  // Calculate wave energy E ∝ A²
  const energy = (params.amplitude ** 2).toFixed(2);
  const omega = (2 * Math.PI * params.frequency).toFixed(2);
  const k = (2 * Math.PI * params.frequency / params.speed).toFixed(2);

  return (
    <div className="fixed top-4 right-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 text-white font-mono text-sm min-w-[300px] z-10">
      {/* Title */}
      <div className="mb-4 pb-2 border-b border-white/20">
        <h3 className="text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Wave Parameters
        </h3>
      </div>

      {/* Wave equation */}
      <div className="mb-4 p-3 bg-white/5 rounded border border-white/10">
        <div className="text-xs text-gray-400 mb-1">Wave Equation:</div>
        <div className="text-sm">
          z = A·sin(kx - ωt + φ)
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Amplitude (A):</span>
          <span className="text-blue-300">{params.amplitude.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Frequency (f):</span>
          <span className="text-blue-300">{params.frequency.toFixed(2)} Hz</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Angular freq (ω):</span>
          <span className="text-blue-300">{omega} rad/s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Wave number (k):</span>
          <span className="text-blue-300">{k} rad/m</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Phase (φ):</span>
          <span className="text-blue-300">{params.phase.toFixed(2)} rad</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Speed:</span>
          <span className="text-blue-300">{params.speed.toFixed(2)} m/s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Damping:</span>
          <span className="text-blue-300">{params.damping.toFixed(2)}</span>
        </div>
      </div>

      {/* Energy */}
      <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded border border-purple-400/20">
        <div className="text-xs text-gray-400 mb-1">Wave Energy:</div>
        <div className="text-sm">
          E ∝ A² = <span className="text-purple-300 font-bold">{energy}</span>
        </div>
      </div>

      {/* Active modes */}
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2">Active Modes:</div>
        <div className="flex flex-wrap gap-2">
          {params.interference && (
            <span className="px-2 py-1 bg-green-500/20 border border-green-400/30 rounded text-xs text-green-300">
              Interference
            </span>
          )}
          {params.turbulence > 0 && (
            <span className="px-2 py-1 bg-orange-500/20 border border-orange-400/30 rounded text-xs text-orange-300">
              Turbulence
            </span>
          )}
          {!params.interference && params.turbulence === 0 && (
            <span className="px-2 py-1 bg-gray-500/20 border border-gray-400/30 rounded text-xs text-gray-300">
              Basic Mode
            </span>
          )}
        </div>
      </div>

      {/* Performance metrics */}
      <div className="pt-2 border-t border-white/20">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">FPS:</span>
          <span className={performance.fps >= 55 ? 'text-green-400' : 'text-yellow-400'}>
            {performance.fps}
          </span>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-400">Time:</span>
          <span className="text-gray-300">{time.toFixed(2)}s</span>
        </div>
      </div>
    </div>
  );
}
