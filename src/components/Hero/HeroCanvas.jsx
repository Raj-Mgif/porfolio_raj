import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function HeroGeometry() {
  const meshRef = useRef();
  const torusRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Smooth mouse follow for icosahedron
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3 + mouse.current.y * 0.15;
      meshRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.15;
    }
    
    // Counter-rotate torus
    if (torusRef.current) {
      torusRef.current.rotation.x = t * -0.08;
      torusRef.current.rotation.z = t * 0.05;
    }
  });

  // Track mouse movement
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#C8A96E" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ffffff" />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshStandardMaterial
            color="#C8A96E"
            wireframe={true}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
      
      <mesh ref={torusRef}>
        <torusGeometry args={[3.5, 0.012, 8, 100]} />
        <meshBasicMaterial color="#8B7355" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

function ParticleField() {
  const count = 600;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);
  
  const pointsRef = useRef();
  
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#C8A96E" transparent opacity={0.5} />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <HeroGeometry />
        <ParticleField />
      </Canvas>
    </div>
  );
}
