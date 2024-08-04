import { useState } from 'react';
import { Button } from '@/components/ui/button';

const UI = () => {
  const [money, setMoney] = useState(100);
  const [lives, setLives] = useState(10);
  const [wave, setWave] = useState(1);

  const startWave = () => {
    setWave(wave + 1);
    // Logic to start a new wave
  };

  return (
    <div className="absolute top-0 left-0 p-4 text-white">
      <div className="mb-4">
        <p>Money: ${money}</p>
        <p>Lives: {lives}</p>
        <p>Wave: {wave}</p>
      </div>
      <Button onClick={startWave}>Start Next Wave</Button>
    </div>
  );
};

export default UI;
