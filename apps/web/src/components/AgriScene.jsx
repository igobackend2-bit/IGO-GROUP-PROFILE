import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

function TerrainMesh() {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(22, 22, 70, 70);
    const positions = geo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 1];
      positions[i + 2] =
        Math.sin(x * 0.5) * 0.45 +
        Math.cos(z * 0.4) * 0.35 +
        Math.sin(x * 0.2 + z * 0.3) * 0.65 +
        Math.cos(x * 0.8 - z * 0.5) * 0.2;
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -3, 0]}>
      <meshStandardMaterial
        color="#4ade80"
        wireframe
        transparent
        opacity={0.16}
        emissive="#16a34a"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function TerrainMeshGold() {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(22, 22, 40, 40);
    const positions = geo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 1];
      positions[i + 2] =
        Math.sin(x * 0.3 + 1) * 0.3 +
        Math.cos(z * 0.5 + 2) * 0.25 +
        Math.sin(x * 0.6 - z * 0.2) * 0.4;
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.06) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.6, 0, 0.3]} position={[2, -3.5, -2]}>
      <meshStandardMaterial
        color="#c8a84b"
        wireframe
        transparent
        opacity={0.07}
        emissive="#a07820"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function GreenParticles() {
  const positions = useMemo(() =>
    Array.from({ length: 150 }, () => ({
      pos: [(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 12],
      scale: Math.random() * 0.07 + 0.02,
      speed: Math.random() * 0.6 + 0.2,
    })), []);

  return (
    <Instances>
      <sphereGeometry args={[1, 5, 5]} />
      <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={1.2} transparent opacity={0.65} />
      {positions.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={0.6} rotationIntensity={0}>
          <Instance position={p.pos} scale={p.scale} />
        </Float>
      ))}
    </Instances>
  );
}

function GoldParticles() {
  const positions = useMemo(() =>
    Array.from({ length: 80 }, () => ({
      pos: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 10],
      scale: Math.random() * 0.05 + 0.015,
      speed: Math.random() * 0.4 + 0.15,
    })), []);

  return (
    <Instances>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="#c8a84b" emissive="#c8a84b" emissiveIntensity={1.4} transparent opacity={0.5} />
      {positions.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={0.9} rotationIntensity={0}>
          <Instance position={p.pos} scale={p.scale} />
        </Float>
      ))}
    </Instances>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} color="#071a0e" />
      <directionalLight position={[6, 10, 4]} intensity={0.9} color="#c8a84b" />
      <pointLight position={[-6, 4, -6]} intensity={0.6} color="#4ade80" />
      <pointLight position={[8, 2, 8]} intensity={0.3} color="#16a34a" />
      <Stars radius={100} depth={60} count={2000} factor={2.5} fade speed={0.4} />
      <TerrainMesh />
      <TerrainMeshGold />
      <GreenParticles />
      <GoldParticles />
    </>
  );
}

function AgriScene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 11], fov: 52 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      aria-hidden="true"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}

export default AgriScene;
