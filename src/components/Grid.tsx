import type {FC} from 'react';

interface Props {
  activeSquare: number | null;
  greenSquares: Set<number>;
  redSquares: Set<number>;
  onSquareClick: (index: number) => void;
}

const Grid: FC<Props> = ({activeSquare, greenSquares, redSquares, onSquareClick}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-10 gap-2 p-4 bg-gray-100 rounded-lg">
        {Array.from({length: 100}).map((_, index) => {
          let bgColor = 'bg-blue-500';

          if (greenSquares.has(index)) {
            bgColor = 'bg-green-500';
          } else if (redSquares.has(index)) {
            bgColor = 'bg-red-500';
          } else if (activeSquare === index) {
            bgColor = 'bg-yellow-500';
          }

          return (
            <div
              key={index}
              onClick={() => onSquareClick(index)}
              className={`w-10 h-10 ${bgColor} rounded transition-all duration-200 hover:scale-110 cursor-pointer`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
