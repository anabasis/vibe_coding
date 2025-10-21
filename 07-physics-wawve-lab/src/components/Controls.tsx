'use client';

import { useControls, button, folder } from 'leva';
import { useWaveStore } from '@/store/waveStore';
import { wavePresets } from '@/lib/presets';

export function Controls() {
  const { updateParams, reset } = useWaveStore();

  useControls({
    'Basic Parameters': folder({
      amplitude: {
        value: 1.0,
        min: 0.1,
        max: 3.0,
        step: 0.1,
        label: 'Amplitude (A)',
        onChange: (value) => updateParams({ amplitude: value }),
      },
      frequency: {
        value: 0.5,
        min: 0.1,
        max: 3.0,
        step: 0.1,
        label: 'Frequency (f)',
        onChange: (value) => updateParams({ frequency: value }),
      },
      phase: {
        value: 0,
        min: 0,
        max: Math.PI * 2,
        step: 0.1,
        label: 'Phase (φ)',
        onChange: (value) => updateParams({ phase: value }),
      },
      speed: {
        value: 1.0,
        min: 0.1,
        max: 3.0,
        step: 0.1,
        label: 'Wave Speed',
        onChange: (value) => updateParams({ speed: value }),
      },
      damping: {
        value: 0.1,
        min: 0,
        max: 1.0,
        step: 0.05,
        label: 'Damping',
        onChange: (value) => updateParams({ damping: value }),
      },
    }),

    'Advanced Features': folder({
      interference: {
        value: false,
        label: 'Interference Pattern',
        onChange: (value) => updateParams({ interference: value }),
      },
      turbulence: {
        value: 0,
        min: 0,
        max: 1.0,
        step: 0.1,
        label: 'Turbulence',
        onChange: (value) => updateParams({ turbulence: value }),
      },
    }),

    'Visual Settings': folder({
      showGrid: {
        value: true,
        label: 'Show Grid',
        onChange: (value) => updateParams({ showGrid: value }),
      },
      resolution: {
        value: typeof window !== 'undefined' && window.innerWidth < 768 ? 32 : 64,
        min: 16,
        max: 128,
        step: 16,
        label: 'Mesh Resolution',
        onChange: (value) => updateParams({ resolution: value }),
      },
    }),

    Presets: folder({
      'Load Preset': {
        options: wavePresets.reduce((acc, preset) => {
          acc[preset.name] = preset.name;
          return acc;
        }, {} as Record<string, string>),
        onChange: (presetName) => {
          const preset = wavePresets.find((p) => p.name === presetName);
          if (preset) {
            updateParams(preset.params);
          }
        },
      },
    }),

    Actions: folder({
      'Reset to Default': button(() => reset()),
    }),
  });

  return null;
}
