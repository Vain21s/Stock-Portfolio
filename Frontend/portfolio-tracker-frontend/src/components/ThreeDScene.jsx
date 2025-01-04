import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, PerspectiveCamera, Sphere, Cylinder } from '@react-three/drei';

// Candlestick component
const Candlestick = ({ position, isPositive, height = 1 }) => {
  const color = isPositive ? "#22c55e" : "#ef4444";
  return (
    <group position={position}>
      <Cylinder args={[0.1, 0.1, height, 8]} position={[0, height/2, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      <Box args={[0.3, 0.4, 0.3]} position={[0, height, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
    </group>
  );
};

// Animated floating coin
const FloatingCoin = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    meshRef.current.rotation.y += 0.02;
  });

  return (
    <group ref={meshRef} position={position}>
      <Cylinder args={[0.4, 0.4, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        $
      </Text>
    </group>
  );
};

// Stock trend graph
const TrendLine = ({ points, color }) => {
  const lineRef = useRef();
  
  useFrame((state) => {
    lineRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={lineRef}>
      {points.map((point, i) => {
        if (i < points.length - 1) {
          return (
            <Cylinder
              key={i}
              position={[(points[i][0] + points[i+1][0])/2, (points[i][1] + points[i+1][1])/2, 0]}
              rotation={[0, 0, Math.atan2(points[i+1][1] - points[i][1], points[i+1][0] - points[i][0])]}
              scale={[Math.hypot(points[i+1][0] - points[i][0], points[i+1][1] - points[i][1]), 0.05, 0.05]}
            >
              <meshStandardMaterial color={color} />
            </Cylinder>
          );
        }
        return null;
      })}
    </group>
  );
};

const ThreeDScene = () => {
  const [trendPoints, setTrendPoints] = useState([]);
  
  useState(() => {
    // Generate random trend line points
    const points = Array.from({ length: 10 }, (_, i) => [
      i * 0.5 - 2,
      Math.sin(i * 0.5) * 0.5 + Math.random() * 0.3
    ]);
    setTrendPoints(points);
  }, []);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-900">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        
        {/* Enhanced lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <spotLight position={[-10, 10, -10]} angle={0.3} intensity={1} color="#4ade80" />

        {/* Decorative elements */}
        <FloatingCoin position={[-2, 0, 0]} />
        <FloatingCoin position={[2, 0, 0]} />

        {/* Stock trend visualization */}
        <TrendLine points={trendPoints} color="#22c55e" />

        {/* Candlesticks */}
        <Candlestick position={[-1.5, -1, 0]} isPositive={true} height={1.2} />
        <Candlestick position={[-0.5, -1, 0]} isPositive={false} height={0.8} />
        <Candlestick position={[0.5, -1, 0]} isPositive={true} height={1.5} />
        <Candlestick position={[1.5, -1, 0]} isPositive={true} height={1.1} />

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
