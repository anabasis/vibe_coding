'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWaveStore } from '@/store/waveStore';

export function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { params, time, updateTime, updatePerformance } = useWaveStore();
  const lastTimeRef = useRef(0);

  // Create geometry based on resolution
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(
      10,
      10,
      params.resolution - 1,
      params.resolution - 1
    );
  }, [params.resolution]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const positions = mesh.geometry.attributes.position;
    const time_current = state.clock.getElapsedTime();

    // Update time in store
    updateTime(delta);

    // Calculate FPS
    const fps = 1 / delta;
    updatePerformance({ fps: Math.round(fps) });

    // Wave physics calculation: z = A·sin(kx - ωt + φ)
    const A = params.amplitude;
    const f = params.frequency;
    const omega = 2 * Math.PI * f; // Angular frequency
    const k = omega / params.speed; // Wave number
    const phi = params.phase;
    const dampingFactor = params.damping;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      // Distance from center for damping calculation
      const r = Math.sqrt(x * x + y * y);
      const damping = Math.exp(-dampingFactor * r);

      let z = 0;

      // Basic wave equation
      z = A * Math.sin(k * x - omega * time + phi) * damping;

      // Add interference pattern if enabled
      if (params.interference) {
        // Second wave source from opposite direction
        const z2 = A * Math.sin(-k * x - omega * time + phi) * damping;
        // Third wave source perpendicular
        const z3 = A * Math.sin(k * y - omega * time) * damping;
        z = (z + z2 + z3) / 2;
      }

      // Add turbulence/noise if enabled
      if (params.turbulence > 0) {
        const noise =
          (Math.sin(x * 3 + time) * Math.cos(y * 3 + time * 0.5)) *
          params.turbulence;
        z += noise * damping;
      }

      positions.setZ(i, z);
    }

    positions.needsUpdate = true;
    mesh.geometry.computeVertexNormals();

    lastTimeRef.current = time_current;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="#4a9eff"
        wireframe={false}
        side={THREE.DoubleSide}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}
