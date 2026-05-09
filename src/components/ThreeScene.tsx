import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial, Sphere, useScroll, ScrollControls, Scroll } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';

function RotatingNodes({ count = 80, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.002 + Math.random() / 1000;
      // Arrange in more structured "neural layers"
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, speed, xFactor, yFactor, zFactor, rand: Math.random() });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, speed, xFactor, yFactor, zFactor, rand } = particle;
      t = particle.t += speed;
      const s = 0.2 + Math.sin(t) * 0.3;
      
      // Reactive movement based on mouse
      const sensitivity = 5;
      const targetX = xFactor + Math.sin(t) * 5 + (mouse.current.x * sensitivity * rand);
      const targetY = yFactor + Math.cos(t) * 5 + (mouse.current.y * sensitivity * rand);
      
      dummy.position.set(targetX, targetY, zFactor + Math.sin(t * 0.5) * 5);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(t, t * 1.5, t);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={2} transparent opacity={0.4} />
    </instancedMesh>
  );
}

function PortalCore() {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={4}>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#059669"
          roughness={0}
          metalness={1}
          distort={0.6}
          speed={4}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeScene({ introMode = false }: { introMode?: boolean }) {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div 
      className="fixed inset-0 z-0 bg-black"
      onMouseMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }}
    >
      <Canvas eventPrefix="client">
        <PerspectiveCamera makeDefault position={[0, 0, 50]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#059669" />
        
        <RotatingNodes count={150} mouse={mouse} />
        
        {introMode && (
          <group position={[0, 0, 40]}>
            <PortalCore />
          </group>
        )}
      </Canvas>
    </div>
  );
}
