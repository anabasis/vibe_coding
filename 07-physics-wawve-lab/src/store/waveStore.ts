import { create } from 'zustand';
import { WaveParams, PerformanceMetrics } from '@/types/wave';

interface WaveStore {
  // State
  params: WaveParams;
  time: number;
  performance: PerformanceMetrics;

  // Actions
  updateParams: (params: Partial<WaveParams>) => void;
  updateTime: (deltaTime: number) => void;
  updatePerformance: (metrics: Partial<PerformanceMetrics>) => void;
  reset: () => void;
}

// Default wave parameters
const defaultParams: WaveParams = {
  amplitude: 1.0,
  frequency: 0.5,
  phase: 0,
  damping: 0.1,
  speed: 1.0,
  interference: false,
  turbulence: 0,
  showGrid: true,
  resolution: typeof window !== 'undefined' && window.innerWidth < 768 ? 32 : 64,
};

const defaultPerformance: PerformanceMetrics = {
  fps: 60,
  time: 0,
};

export const useWaveStore = create<WaveStore>((set) => ({
  params: defaultParams,
  time: 0,
  performance: defaultPerformance,

  updateParams: (newParams) =>
    set((state) => ({
      params: { ...state.params, ...newParams },
    })),

  updateTime: (deltaTime) =>
    set((state) => ({
      time: state.time + deltaTime * state.params.speed,
      performance: {
        ...state.performance,
        time: state.time,
      },
    })),

  updatePerformance: (metrics) =>
    set((state) => ({
      performance: { ...state.performance, ...metrics },
    })),

  reset: () =>
    set({
      params: defaultParams,
      time: 0,
      performance: defaultPerformance,
    }),
}));
