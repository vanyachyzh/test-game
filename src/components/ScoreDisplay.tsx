import type {FC} from 'react';
import type {Score} from '../types';

interface Props {
  score: Score;
}

const ScoreDisplay: FC<Props> = ({score: {player, computer}}) => {
  return (
    <div className="flex justify-center gap-8 mb-8">
      <div className="bg-green-50 border-2 border-green-500 rounded-lg px-6 py-4 text-center min-w-[150px]">
        <div className="text-sm text-gray-600 font-medium mb-1">Player</div>
        <div className="text-3xl font-bold text-green-700">{player}</div>
      </div>
      <div className="bg-red-50 border-2 border-red-500 rounded-lg px-6 py-4 text-center min-w-[150px]">
        <div className="text-sm text-gray-600 font-medium mb-1">Computer</div>
        <div className="text-3xl font-bold text-red-700">{computer}</div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
