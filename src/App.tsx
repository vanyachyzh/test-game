import {useState} from 'react';
import Grid from './components/Grid';
import ScoreDisplay from './components/ScoreDisplay';
import ControlsSection from './components/ControlsSection';
import type {Score} from './types';
import Modal from './components/Modal';

const App = () => {
  const [timeMs, setTimeMs] = useState<string>('1000');
  const [score, setScore] = useState<Score>({player: 0, computer: 0});
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Interactive Mini-Game</h1>
        <ControlsSection timeMs={timeMs} setTimeMs={setTimeMs} />
        <ScoreDisplay score={score} />
        <Grid />
        <Modal isOpen={isOpen} score={score} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

export default App;
