import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';

const Tower = ({ position }) => {
  return (
    <Box position={position} args={[1, 2, 1]}>
      <meshStandardMaterial color="blue" />
    </Box>
  );
};

const Enemy = ({ position, onReachEnd }) => {
  const ref = useRef();
  const [reachedEnd, setReachedEnd] = useState(false);

  useFrame(() => {
    if (ref.current && !reachedEnd) {
      ref.current.position.z += 0.05;
      if (ref.current.position.z > 10) {
        setReachedEnd(true);
        onReachEnd();
      }
    }
  });

  return (
    <Sphere ref={ref} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color="red" />
    </Sphere>
  );
};

const GameScene = () => {
  const [enemies, setEnemies] = useState([]);
  const [towers, setTowers] = useState([]);
  const [lives, setLives] = useState(10);

  const spawnEnemy = () => {
    const x = Math.random() * 10 - 5;
    setEnemies([...enemies, { id: Date.now(), position: [x, 0.5, -10] }]);
  };

  const placeTower = (x, z) => {
    setTowers([...towers, { id: Date.now(), position: [x, 1, z] }]);
  };

  const handleEnemyReachEnd = () => {
    setLives(lives - 1);
  };

  return (
    <>
      <Box position={[0, -0.5, 0]} args={[20, 1, 20]}>
        <meshStandardMaterial color="green" />
      </Box>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} position={enemy.position} onReachEnd={handleEnemyReachEnd} />
      ))}
      {towers.map((tower) => (
        <Tower key={tower.id} position={tower.position} />
      ))}
    </>
  );
};

export default GameScene;
