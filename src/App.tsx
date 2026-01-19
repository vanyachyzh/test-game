import {useState, useEffect, useRef, useCallback} from 'react';
import Grid from './components/Grid';
import ScoreDisplay from './components/ScoreDisplay';
import ControlsSection from './components/ControlsSection';
import Modal from './components/Modal';
import type {GameState, Role, Score, SquareType} from './types';
import {DEFAULT_TIME_MS, INITIAL_SCORE, INITIAL_SQUARES, POINTS_PER_MOVE, WINNING_SCORE} from './constants';
import {clearTimer, getRandomSquareIndex} from './utils';

const App = () => {
  const [timeMs, setTimeMs] = useState<string>(String(DEFAULT_TIME_MS));
  const [score, setScore] = useState<Score>(INITIAL_SCORE);
  const [gamePhase, setGamePhase] = useState<GameState>('initial');
  const [squares, setSquares] = useState<Array<SquareType>>(INITIAL_SQUARES);
  const timerRef = useRef<number | null>(null);
  const activeSquareRef = useRef<number | null>(null); // Tracks current active square for timer checks
  const startNextMoveRef = useRef<(() => void) | null>(null); // Keeps latest startNextMove for async calls

  const updateScoreAndCheckWin = useCallback(
    (role: Role, failedSquare: number | null = null) =>
      setScore((prev) => {
        const newScore = prev[role] + POINTS_PER_MOVE;
        const isWin = newScore >= WINNING_SCORE;

        setSquares((prevSquares) => prevSquares.map((s, i) => (i === failedSquare ? 'failed' : s)));
        activeSquareRef.current = null;

        if (isWin) setGamePhase('finished');
        // Schedule the next move after a short delay (100ms) so the player can see
        // the previous square’s result (success or failed).
        else setTimeout(() => startNextMoveRef.current?.(), 100);

        return {...prev, [role]: newScore};
      }),
    []
  );

  const startNextMove = useCallback(() => {
    if (gamePhase !== 'running') return;

    const newActiveSquareIndex = getRandomSquareIndex(squares);
    // Store the active square in a ref so timers can reference it
    activeSquareRef.current = newActiveSquareIndex;

    setSquares((prev) =>
      prev.map((status, i) => {
        if (i === newActiveSquareIndex) return 'active'; // activate the new square
        if (status === 'active') return 'inactive'; // deactivate previous active square
        return status;
      })
    );

    clearTimer(timerRef);

    timerRef.current = setTimeout(() => {
      // If the player didn't click the active square in time,
      // the computer gets a point and the square is marked as failed
      if (activeSquareRef.current === newActiveSquareIndex) {
        updateScoreAndCheckWin('computer', newActiveSquareIndex);
      }
    }, Number(timeMs)); // Start a timer for the player reaction window
  }, [gamePhase, timeMs, updateScoreAndCheckWin, squares]);

  useEffect(() => {
    startNextMoveRef.current = startNextMove;
  }, [startNextMove]);

  const handleSquareClick = (index: number) => {
    if (gamePhase !== 'running' || squares[index] !== 'active') return;

    setSquares((prev) => prev.map((state, i) => (i === index ? 'success' : state)));
    clearTimer(timerRef);
    updateScoreAndCheckWin('player');
  };

  const startGame = () => {
    setScore(INITIAL_SCORE);
    setSquares(INITIAL_SQUARES);
    activeSquareRef.current = null;
    setGamePhase('running');
    setTimeout(() => startNextMoveRef.current?.(), 0);
  };

  const resetGame = () => {
    clearTimer(timerRef);
    setGamePhase('initial');
    setScore(INITIAL_SCORE);
    setSquares(INITIAL_SQUARES);
    activeSquareRef.current = null;
  };

  useEffect(() => clearTimer(timerRef), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 max-w-[400px] w-full">
        <ControlsSection
          timeMs={timeMs}
          setTimeMs={setTimeMs}
          onStart={startGame}
          isGameRunning={gamePhase === 'running'}
        />
        <ScoreDisplay score={score} />
        <Grid squares={squares} onSquareClick={handleSquareClick} />
        <Modal isOpen={gamePhase === 'finished'} score={score} onClose={resetGame} />
      </div>
    </div>
  );
};

export default App;
