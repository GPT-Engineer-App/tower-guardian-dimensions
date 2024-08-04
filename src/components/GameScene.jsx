import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';

const Tower = ({ position }) => {
  return (
    <Box position={position} args={[1, 2, 1]}>
      <meshStandardMaterial color="blue" />
    </Box>
  );
};

const Enemy = ({ position, onReachEnd, onDestroy }) => {
  const ref = useRef();
  const [health, setHealth] = useState(100);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.z += 0.05;
      if (ref.current.position.z > 10) {
        onReachEnd();
        onDestroy();
      }
    }
  });

  useEffect(() => {
    if (health <= 0) {
      onDestroy();
    }
  }, [health, onDestroy]);

  return (
    <Sphere ref={ref} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color="red" />
    </Sphere>
  );
};

const GameScene = ({ onEnemyReachEnd, onEnemyDestroy, onPlaceTower }) => {
  const [enemies, setEnemies] = useState([]);
  const [towers, setTowers] = useState([]);
  const { camera, scene } = useThree();

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const x = Math.random() * 10 - 5;
      setEnemies(prev => [...prev, { id: Date.now(), position: [x, 0.5, -10] }]);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, []);

  const handlePlaceTower = (event) => {
    if (event.button !== 0) return; // Only place tower on left click

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const { x, z } = intersects[0].point;
      setTowers(prev => [...prev, { id: Date.now(), position: [x, 1, z] }]);
      onPlaceTower();
    }
  };

  return (
    <group onClick={handlePlaceTower}>
      <Box position={[0, -0.5, 0]} args={[20, 1, 20]}>
        <meshStandardMaterial color="green" />
      </Box>
      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          position={enemy.position}
          onReachEnd={onEnemyReachEnd}
          onDestroy={() => {
            setEnemies(prev => prev.filter(e => e.id !== enemy.id));
            onEnemyDestroy();
          }}
        />
      ))}
      {towers.map((tower) => (
        <Tower key={tower.id} position={tower.position} />
      ))}
    </group>
  );
};

export default GameScene;
