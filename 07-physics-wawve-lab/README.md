# Physics Wave Lab

An interactive 3D wave physics simulation built with Next.js, Three.js, and React Three Fiber. Explore wave phenomena through real-time visualization with accurate physics calculations.

## Features

### 3D Wave Simulation
- Real-time 3D wave mesh rendering
- Accurate physics based on wave equation: `z = A·sin(kx - ωt + φ)`
- 60 FPS performance target
- Platform-optimized resolution (mobile/desktop)

### Interactive Controls
- **Basic Parameters**: Amplitude, Frequency, Phase, Speed, Damping
- **Advanced Features**: Interference patterns, Turbulence/Noise
- **Presets**: Pre-configured wave scenarios
- **Visual Settings**: Grid toggle, Resolution control

### Real-time Display
- Live wave equation and parameters
- Energy calculation (E ∝ A²)
- Performance metrics (FPS)
- Active mode indicators

### Wave Presets
- Default Wave
- High Frequency
- Low Frequency Damped
- Interference Pattern
- Turbulent Ocean
- Calm Ripple

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **3D Rendering**: Three.js + React Three Fiber
- **State Management**: Zustand
- **UI Controls**: Leva
- **Styling**: TailwindCSS
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   └── lab/
│       └── wave/
│           └── page.tsx      # Wave lab page
├── components/
│   ├── Scene.tsx             # 3D scene setup
│   ├── WaveMesh.tsx          # Wave mesh with physics
│   ├── HUD.tsx               # Information overlay
│   └── Controls.tsx          # Leva control panel
├── store/
│   └── waveStore.ts          # Zustand state management
├── types/
│   └── wave.ts               # TypeScript interfaces
└── lib/
    └── presets.ts            # Wave presets
```

## Physics Implementation

### Wave Equation
```
z = A·sin(kx - ωt + φ)·e^(-γr)
```

Where:
- **A**: Amplitude
- **k**: Wave number (k = ω/v)
- **ω**: Angular frequency (ω = 2πf)
- **t**: Time
- **φ**: Phase shift
- **γ**: Damping coefficient
- **r**: Distance from center

### Interference
Multiple wave sources are superimposed to create interference patterns:
```
z = (z₁ + z₂ + z₃) / 2
```

### Turbulence
Random noise is added using trigonometric functions:
```
noise = sin(3x + t) · cos(3y + 0.5t)
```

## Performance Optimization

- Dynamic resolution based on device (32x32 mobile, 64x64 desktop)
- Adaptive DPR (Device Pixel Ratio)
- Optimized render loop
- Shadows disabled for better performance

## Usage

1. **Landing Page**: Learn about wave physics and features
2. **Enter Lab**: Click "Enter the Lab" button
3. **Explore**:
   - Use mouse/touch to rotate, zoom, pan the 3D view
   - Adjust parameters in the control panel
   - Try different presets
   - Enable interference or turbulence
4. **Observe**: Watch the HUD for real-time physics calculations

## License

MIT

## Acknowledgments

Built following physics principles and modern web development best practices.
