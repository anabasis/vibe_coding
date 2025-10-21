'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { WaveMesh } from './WaveMesh';
import { useWaveStore } from '@/store/waveStore';

export function Scene() {
  const { params } = useWaveStore();

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: [0, 8, 12],
          fov: 50,
        }}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.5}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff88cc" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#88ccff" />

        {/* Grid for spatial reference */}
        {params.showGrid && (
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#4b5563"
            fadeDistance={30}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={false}
            position={[0, -0.01, 0]}
          />
        )}

        {/* Wave mesh */}
        <WaveMesh />

        {/* Camera controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
