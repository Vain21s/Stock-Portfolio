import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, PerspectiveCamera, Sphere, Torus } from '@react-three/drei';

// Animated Orbital Ring
const OrbitalRing = ({ radius, speed, height, color }) => {
  const ringRef = useRef();
  
  useFrame((state) => {
    ringRef.current.rotation.y = state.clock.elapsedTime * speed;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={ringRef}>
      <Torus args={[radius, 0.02, 16, 100]} position={[0, height, 0]}>
        <meshPhongMaterial color={color} />
      </Torus>
    </group>
  );
};

// Animated Sphere with Value Display
const ValueSphere = ({ position, value, color }) => {
  const sphereRef = useRef();
  const [scale, setScale] = useState(1);
  
  useFrame((state) => {
    sphereRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    sphereRef.current.rotation.y += 0.01;
    
    // Pulse effect
    const newScale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    setScale(newScale);
  });

  return (
    <group ref={sphereRef} position={position}>
      <Sphere args={[0.3, 32, 32]} scale={[scale, scale, scale]}>
        <meshPhongMaterial color={color} metalness={0.8} roughness={0.2} />
      </Sphere>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ${value}
      </Text>
    </group>
  );
};

// Data Point Particle System
const DataPoints = ({ count = 50 }) => {
  const pointsRef = useRef();
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate random particles with their own properties
    const newParticles = Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ],
      speed: Math.random() * 0.02 + 0.01
    }));
    setParticles(newParticles);
  }, [count]);

  useFrame((state) => {
    pointsRef.current.children.forEach((point, i) => {
      const particle = particles[i];
      point.position.y += Math.sin(state.clock.elapsedTime * particle.speed) * 0.02;
      point.rotation.z += 0.01;
    });
  });

  return (
    <group ref={pointsRef}>
      {particles.map((particle, i) => (
        <Sphere 
          key={i} 
          args={[0.05, 8, 8]} 
          position={particle.position}
        >
          <meshPhongMaterial 
            color="#4ade80" 
            emissive="#4ade80" 
            emissiveIntensity={0.5} 
          />
        </Sphere>
      ))}
    </group>
  );
};

const ThreeDScene = () => {
  // Internal state for simulated stock values
  const [mockStockValues, setMockStockValues] = useState({
    stock1: 1234.56,
    stock2: 1358.02
  });

  // Generate mock data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMockStockValues(prev => ({
        stock1: prev.stock1 + (Math.random() - 0.5) * 10,
        stock2: prev.stock2 + (Math.random() - 0.5) * 10
      }));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        
        {/* Basic lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        {/* Decorative elements */}
        <OrbitalRing radius={3} speed={0.3} height={0} color="#4ade80" />
        <OrbitalRing radius={4} speed={-0.2} height={1} color="#60a5fa" />
        <OrbitalRing radius={5} speed={0.1} height={-1} color="#f472b6" />

        {/* Value displays */}
        <ValueSphere 
          position={[-2, 0, 0]} 
          value={mockStockValues.stock1.toFixed(2)} 
          color="#4ade80" 
        />
        <ValueSphere 
          position={[2, 0, 0]} 
          value={mockStockValues.stock2.toFixed(2)} 
          color="#60a5fa" 
        />

        {/* Background particles */}
        <DataPoints count={50} />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDScene;