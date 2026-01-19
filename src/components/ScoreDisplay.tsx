import type {FC} from 'react';
import type {Score} from '../types';

interface Props {
  score: Score;
}

const ScoreDisplay: FC<Props> = ({score: {player, computer}}) => (
  <div className="flex justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
    <div className="bg-green-50 border-2 border-green-500 rounded-lg px-4 py-3 sm:px-6 sm:py-4 text-center min-w-[120px] sm:min-w-[150px]">
      <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Player</div>
      <div className="text-2xl sm:text-3xl font-bold text-green-700">{player}</div>
    </div>
    <div className="bg-red-50 border-2 border-red-500 rounded-lg px-4 py-3 sm:px-6 sm:py-4 text-center min-w-[120px] sm:min-w-[150px]">
      <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Computer</div>
      <div className="text-2xl sm:text-3xl font-bold text-red-700">{computer}</div>
    </div>
  </div>
);

export default ScoreDisplay;
