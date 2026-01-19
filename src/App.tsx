import {useState, useEffect, useRef, useCallback} from 'react';
import Grid from './components/Grid';
import ScoreDisplay from './components/ScoreDisplay';
import ControlsSection from './components/ControlsSection';
import type {Score} from './types';
import Modal from './components/Modal';

const App = () => {
  const [timeMs, setTimeMs] = useState<string>('1000');
  const [score, setScore] = useState<Score>({player: 0, computer: 0});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [activeSquare, setActiveSquare] = useState<number | null>(null);
  const [greenSquares, setGreenSquares] = useState<Set<number>>(new Set());
  const [redSquares, setRedSquares] = useState<Set<number>>(new Set());
  const timerRef = useRef<number | null>(null);
  const activeSquareRef = useRef<number | null>(null);
  const startNextRoundRef = useRef<(() => void) | null>(null);
  const greenSquaresRef = useRef<Set<number>>(new Set());
  const redSquaresRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    greenSquaresRef.current = greenSquares;
  }, [greenSquares]);

  useEffect(() => {
    redSquaresRef.current = redSquares;
  }, [redSquares]);

  const getRandomSquare = () => {
    const available = Array.from({length: 100}, (_, i) => i).filter(
      (i) => !greenSquaresRef.current.has(i) && !redSquaresRef.current.has(i)
    );
    if (available.length === 0) return Math.floor(Math.random() * 100);
    return available[Math.floor(Math.random() * available.length)];
  };

  const startNextRound = useCallback(() => {
    if (!isGameRunning) return;

    const newSquare = getRandomSquare();
    activeSquareRef.current = newSquare;
    setActiveSquare(newSquare);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      if (activeSquareRef.current === newSquare) {
        setRedSquares((prev) => new Set(prev).add(newSquare));
        setScore((prev) => {
          const newComputerScore = prev.computer + 1;
          if (newComputerScore >= 10) {
            setIsGameRunning(false);
            setIsOpen(true);
            setActiveSquare(null);
            activeSquareRef.current = null;
          } else {
            setActiveSquare(null);
            activeSquareRef.current = null;
            setTimeout(() => {
              if (startNextRoundRef.current) {
                startNextRoundRef.current();
              }
            }, 100);
          }
          return {...prev, computer: newComputerScore};
        });
      }
    }, Number(timeMs));
  }, [isGameRunning, timeMs]);

  useEffect(() => {
    startNextRoundRef.current = startNextRound;
  }, [startNextRound]);

  const handleSquareClick = (index: number) => {
    if (!isGameRunning || activeSquare !== index) return;

    setGreenSquares((prev) => new Set(prev).add(index));

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    activeSquareRef.current = null;
    setActiveSquare(null);

    setScore((prev) => {
      const newPlayerScore = prev.player + 1;
      if (newPlayerScore >= 10) {
        setIsGameRunning(false);
        setIsOpen(true);
      } else {
        setTimeout(() => {
          if (startNextRoundRef.current) {
            startNextRoundRef.current();
          }
        }, 100);
      }
      return {...prev, player: newPlayerScore};
    });
  };

  const startGame = () => {
    setScore({player: 0, computer: 0});
    setGreenSquares(new Set());
    setRedSquares(new Set());
    setIsGameRunning(true);
    setIsOpen(false);
    setTimeout(() => {
      if (startNextRoundRef.current) {
        startNextRoundRef.current();
      }
    }, 0);
  };

  const resetGame = () => {
    setIsGameRunning(false);
    setActiveSquare(null);
    activeSquareRef.current = null;
    setGreenSquares(new Set());
    setRedSquares(new Set());
    setScore({player: 0, computer: 0});
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Interactive Mini-Game</h1>
        <ControlsSection timeMs={timeMs} setTimeMs={setTimeMs} onStart={startGame} isGameRunning={isGameRunning} />
        <ScoreDisplay score={score} />
        <Grid
          activeSquare={activeSquare}
          greenSquares={greenSquares}
          redSquares={redSquares}
          onSquareClick={handleSquareClick}
        />
        <Modal isOpen={isOpen} score={score} onClose={resetGame} />
      </div>
    </div>
  );
};

export default App;
