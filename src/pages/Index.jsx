import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import GameScene from '../components/GameScene';
import UI from '../components/UI';

const Index = () => {
  const { UI: UIComponent, handlers } = UI({ onStartWave: () => console.log('Wave started') });

  return (
    <div className="w-full h-screen relative">
      <Canvas className="w-full h-full">
        <Suspense fallback={null}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <GameScene
            onEnemyReachEnd={handlers.handleEnemyReachEnd}
            onEnemyDestroy={handlers.handleEnemyDestroy}
            onPlaceTower={handlers.handlePlaceTower}
          />
        </Suspense>
      </Canvas>
      {UIComponent}
    </div>
  );
};

export default Index;
