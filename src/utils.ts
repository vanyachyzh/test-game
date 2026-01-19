import type {RefObject} from 'react';
import type {SquareType} from './types';

export const clearTimer = (timerRef: RefObject<number | null>) => {
  if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }
};

export const getRandomSquareIndex = (squares: SquareType[]): number => {
  const availableIndices = squares.reduce<number[]>((acc, status, i) => {
    if (status === 'inactive') acc.push(i);

    return acc;
  }, []);

  // Randomly select one index
  return availableIndices[Math.floor(Math.random() * availableIndices.length)];
};
