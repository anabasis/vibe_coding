// Wave parameters interface based on PRD
export interface WaveParams {
  // Basic parameters
  amplitude: number;        // A - wave amplitude
  frequency: number;        // f - wave frequency
  phase: number;           // φ - phase shift
  damping: number;         // damping factor
  speed: number;           // wave propagation speed

  // Advanced features
  interference: boolean;   // Enable interference pattern
  turbulence: number;      // Noise/turbulence intensity

  // Visual settings
  showGrid: boolean;
  resolution: number;      // Mesh resolution (32 for mobile, 64 for desktop)
}

export interface WavePreset {
  name: string;
  description: string;
  params: Partial<WaveParams>;
}

export interface PerformanceMetrics {
  fps: number;
  time: number;
}
