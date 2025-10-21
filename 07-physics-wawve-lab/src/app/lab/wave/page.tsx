'use client';

import dynamic from 'next/dynamic';
import { Controls } from '@/components/Controls';
import { HUD } from '@/components/HUD';

// Dynamic import to avoid SSR issues with Three.js
const Scene = dynamic(
  () => import('@/components/Scene').then((mod) => ({ default: mod.Scene })),
  { ssr: false }
);

export default function WaveLab() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* 3D Scene */}
      <Scene />

      {/* HUD Overlay */}
      <HUD />

      {/* Leva Controls */}
      <Controls />

      {/* Back button */}
      <a
        href="/"
        className="fixed top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors z-10 font-mono text-sm"
      >
        ← Back to Home
      </a>
    </div>
  );
}
