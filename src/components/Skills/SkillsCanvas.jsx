import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text, RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

const techStack = [
  "Node.js", "React", "Next.js", "MongoDB", 
  "Express", "Python", "Go", "Docker", 
  "AWS", "SQL", "GSAP", "Three.js"
];

function TechPill({ text, position }) {
  const api = useRef();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (api.current) {
        api.current.applyImpulse({
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
          z: 0
        }, true);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handlePointerOver = () => {
    if (api.current) {
      api.current.applyImpulse({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: 0
      }, true);
    }
  };

  const pillWidth = text.length * 0.35 + 0.8;

  return (
    <RigidBody 
      ref={api} 
      colliders="cuboid" 
      position={position} 
      restitution={1.1}
      friction={0} 
      linearDamping={0.1}
      angularDamping={0}
      lockRotations 
      onPointerOver={handlePointerOver}
      onPointerDown={handlePointerOver}
    >
      <RoundedBox args={[pillWidth, 1.2, 0.4]} radius={0.3} smoothness={4}>
        <meshStandardMaterial color="#C8A96E" roughness={0.2} metalness={0.5} />
      </RoundedBox>
      <Text 
        position={[0, 0, 0.21]} 
        fontSize={0.5} 
        color="#0F0F0D" 
        anchorX="center" 
        anchorY="middle" 
        fontWeight="bold"
      >
        {text}
      </Text>
    </RigidBody>
  );
}

function Boundaries() {
  return (
    <>
      <RigidBody type="fixed" position={[0, -4, 0]} restitution={1}>
        <CuboidCollider args={[8, 1, 4]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 4, 0]} restitution={1}>
        <CuboidCollider args={[8, 1, 4]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-4.5, 0, 0]} restitution={1}>
        <CuboidCollider args={[1, 8, 4]} />
      </RigidBody>
      <RigidBody type="fixed" position={[4.5, 0, 0]} restitution={1}>
        <CuboidCollider args={[1, 8, 4]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, -1]} restitution={1}>
        <CuboidCollider args={[8, 8, 1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 1]} restitution={1}>
        <CuboidCollider args={[8, 8, 1]} />
      </RigidBody>
    </>
  );
}

export default function SkillsCanvas() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />
      
      {/* Zero gravity so they float around endlessly bouncing off walls */}
      <Physics gravity={[0, 0, 0]}>
        <Boundaries />
        {techStack.map((tech, i) => (
          <TechPill 
            key={tech} 
            text={tech} 
            position={[
              (Math.random() - 0.5) * 5, 
              (Math.random() - 0.5) * 5, 
              0
            ]} 
          />
        ))}
      </Physics>
    </Canvas>
  );
}
