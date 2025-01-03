

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const ThreeDScene = () => {
  return (
    <Canvas style={{ height: '400px', width: '100%', marginBottom: '16px' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
      <Box position={[1.2, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial attach="material" color="royalblue" />
      </Box>
    </Canvas>
  );
};

export default ThreeDScene;
