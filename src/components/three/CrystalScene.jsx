import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, AdaptiveDpr } from '@react-three/drei';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * Floating crystal cluster — the Hero's 3D centerpiece.
 * Faceted ruby gems drift and rotate in space, catching red/white light,
 * and the whole cluster subtly parallaxes toward the cursor.
 */

// Deterministic layout so the cluster looks the same on every load.
const CRYSTALS = [
  { kind: 'ico', pos: [-3.4, 1.4, -1], scale: 1.15, detail: 0, glow: 0.35, floatSpeed: 1.1, rotSpeed: 0.18, hue: 'ruby' },
  { kind: 'octa', pos: [3.2, 1.9, -2], scale: 0.9, detail: 0, glow: 0.5, floatSpeed: 1.4, rotSpeed: -0.22, hue: 'amethyst' },
  { kind: 'ico', pos: [2.6, -1.6, 0.5], scale: 1.4, detail: 1, glow: 0.28, floatSpeed: 0.9, rotSpeed: 0.14, hue: 'ruby' },
  { kind: 'octa', pos: [-2.8, -1.9, -0.5], scale: 1.05, detail: 0, glow: 0.45, floatSpeed: 1.25, rotSpeed: 0.2, hue: 'amethyst' },
  { kind: 'ico', pos: [0.2, 2.6, -3], scale: 0.7, detail: 0, glow: 0.6, floatSpeed: 1.6, rotSpeed: -0.16, hue: 'amethyst' },
  { kind: 'tetra', pos: [-0.6, -2.7, -1.5], scale: 0.85, detail: 0, glow: 0.4, floatSpeed: 1.2, rotSpeed: 0.24, hue: 'ruby' },
  { kind: 'octa', pos: [4.2, -0.2, -3.5], scale: 1.0, detail: 0, glow: 0.3, floatSpeed: 1.0, rotSpeed: 0.17, hue: 'ruby' },
  { kind: 'ico', pos: [-4.4, -0.4, -2.5], scale: 0.8, detail: 0, glow: 0.42, floatSpeed: 1.35, rotSpeed: -0.2, hue: 'amethyst' },
];

// Duotone gem materials: ruby (crimson) and amethyst (violet)
const HUES = {
  ruby: { color: '#2a0606', emissive: '#ff1a1a' },
  amethyst: { color: '#150630', emissive: '#8b5cf6' },
};

function Geometry({ kind, detail }) {
  switch (kind) {
    case 'octa':
      return <octahedronGeometry args={[1, detail]} />;
    case 'tetra':
      return <tetrahedronGeometry args={[1, detail]} />;
    case 'ico':
    default:
      return <icosahedronGeometry args={[1, detail]} />;
  }
}

function Crystal({ data, reducedMotion }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.x += delta * data.rotSpeed * 0.5;
    meshRef.current.rotation.y += delta * data.rotSpeed;
  });

  const mesh = (
    <mesh ref={meshRef} position={data.pos} scale={data.scale}>
      <Geometry kind={data.kind} detail={data.detail} />
      <meshPhysicalMaterial
        color={HUES[data.hue]?.color ?? HUES.ruby.color}
        metalness={0.85}
        roughness={0.12}
        transmission={0.2}
        thickness={1.5}
        ior={1.7}
        clearcoat={1}
        clearcoatRoughness={0.15}
        emissive={HUES[data.hue]?.emissive ?? HUES.ruby.emissive}
        emissiveIntensity={data.glow}
        flatShading
        envMapIntensity={1.6}
      />
    </mesh>
  );

  if (reducedMotion) return mesh;

  return (
    <Float speed={data.floatSpeed} rotationIntensity={0.6} floatIntensity={1.1}>
      {mesh}
    </Float>
  );
}

function Cluster({ reducedMotion, crystals }) {
  const groupRef = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  // Track the cursor at the window level (the canvas itself is pointer-events:none,
  // so clicks pass through to the Hero content).
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion || !groupRef.current) return;
    const targetY = pointer.current.x * 0.35;
    const targetX = pointer.current.y * 0.25;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {crystals.map((data, i) => (
        <Crystal key={i} data={data} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}

const CrystalScene = () => {
  const reducedMotion = usePrefersReducedMotion();

  // Thin the cluster + cap pixel ratio on smaller screens for performance.
  const { crystals, dpr } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      crystals: isMobile ? CRYSTALS.slice(0, 5) : CRYSTALS,
      dpr: isMobile ? [1, 1.25] : [1, 1.5],
    };
  }, []);

  return (
    <Canvas
      className="pointer-events-none!"
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 8], fov: 45 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-6, -2, -2]} intensity={120} color="#ff2a2a" distance={28} decay={2} />
      <pointLight position={[6, 3, 4]} intensity={90} color="#8b5cf6" distance={30} decay={2} />

      <React.Suspense fallback={null}>
        <Cluster reducedMotion={reducedMotion} crystals={crystals} />

        {/* Inline light environment (no HDR fetch) — gives the facets reflections to catch. */}
        <Environment resolution={256}>
          <Lightformer intensity={2.5} position={[0, 2, -6]} scale={[12, 6, 1]} color="#ff2a2a" />
          <Lightformer intensity={3.5} position={[-5, 1, 2]} scale={[6, 6, 1]} color="#ffffff" />
          <Lightformer intensity={2.5} position={[5, -2, 2]} scale={[6, 6, 1]} color="#a78bfa" />
          <Lightformer intensity={1.5} position={[0, -4, 1]} scale={[10, 4, 1]} color="#2a0a3a" />
        </Environment>
      </React.Suspense>

      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
};

export default CrystalScene;
