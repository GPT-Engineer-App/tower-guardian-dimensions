import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const UI = ({ onStartWave }) => {
  const [money, setMoney] = useState(100);
  const [lives, setLives] = useState(10);
  const [wave, setWave] = useState(1);

  const startWave = useCallback(() => {
    setWave(prev => prev + 1);
    onStartWave();
  }, [onStartWave]);

  const handleEnemyReachEnd = useCallback(() => {
    setLives(prev => Math.max(0, prev - 1));
  }, []);

  const handleEnemyDestroy = useCallback(() => {
    setMoney(prev => prev + 10);
  }, []);

  const handlePlaceTower = useCallback(() => {
    setMoney(prev => Math.max(0, prev - 50));
  }, []);

  return {
    UI: (
      <div className="absolute top-0 left-0 p-4 text-white">
        <div className="mb-4">
          <p>Money: ${money}</p>
          <p>Lives: {lives}</p>
          <p>Wave: {wave}</p>
        </div>
        <Button onClick={startWave} disabled={money < 50}>Start Next Wave</Button>
      </div>
    ),
    handlers: {
      handleEnemyReachEnd,
      handleEnemyDestroy,
      handlePlaceTower,
    }
  };
};

export default UI;
