import type {FC} from 'react';
import type {Score} from '../types';

interface Props {
  isOpen: boolean;
  score: Score;
  onClose: () => void;
}

const Modal: FC<Props> = ({isOpen, score: {player, computer}, onClose}) => {
  if (!isOpen) return null;
  const winner = player > computer ? 'Player' : player < computer ? 'Computer' : 'Tie';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Over!</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="text-center mb-8">
          {winner === 'Tie' ? (
            <div className="inline-block px-6 py-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
              <span className="text-2xl font-bold text-yellow-800">It's a Tie! 🎯</span>
            </div>
          ) : (
            <div
              className={`inline-block px-6 py-3 rounded-lg border-2 ${
                winner === 'Player' ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
              }`}
            >
              <span className={`text-2xl font-bold ${winner === 'Player' ? 'text-green-800' : 'text-red-800'}`}>
                {winner} Wins! 🏆
              </span>
            </div>
          )}
        </div>
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-lg font-semibold text-gray-700">Player Score</span>
            <span className="text-2xl font-bold text-green-600">{player}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-lg font-semibold text-gray-700">Computer Score</span>
            <span className="text-2xl font-bold text-red-600">{computer}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
