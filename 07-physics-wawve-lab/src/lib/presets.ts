import { WavePreset } from '@/types/wave';

export const wavePresets: WavePreset[] = [
  {
    name: 'Default',
    description: 'Standard wave with medium frequency',
    params: {
      amplitude: 1.0,
      frequency: 0.5,
      phase: 0,
      damping: 0.1,
      speed: 1.0,
      interference: false,
      turbulence: 0,
    },
  },
  {
    name: 'High Frequency',
    description: 'Rapid oscillations with many peaks',
    params: {
      amplitude: 0.8,
      frequency: 2.0,
      phase: 0,
      damping: 0.05,
      speed: 1.5,
      interference: false,
      turbulence: 0,
    },
  },
  {
    name: 'Low Frequency Damped',
    description: 'Slow waves with strong damping effect',
    params: {
      amplitude: 1.5,
      frequency: 0.2,
      phase: 0,
      damping: 0.5,
      speed: 0.5,
      interference: false,
      turbulence: 0,
    },
  },
  {
    name: 'Interference Pattern',
    description: 'Multiple wave sources creating interference',
    params: {
      amplitude: 1.2,
      frequency: 0.8,
      phase: 0,
      damping: 0.1,
      speed: 1.0,
      interference: true,
      turbulence: 0,
    },
  },
  {
    name: 'Turbulent Ocean',
    description: 'Chaotic waves with turbulence',
    params: {
      amplitude: 1.0,
      frequency: 0.6,
      phase: 0,
      damping: 0.2,
      speed: 1.2,
      interference: false,
      turbulence: 0.5,
    },
  },
  {
    name: 'Calm Ripple',
    description: 'Gentle ripples with minimal energy',
    params: {
      amplitude: 0.3,
      frequency: 0.3,
      phase: 0,
      damping: 0.3,
      speed: 0.8,
      interference: false,
      turbulence: 0,
    },
  },
];
