import type {FC} from 'react';
import type {SquareType} from '../types';

interface Props {
  squares: Array<SquareType>;
  onSquareClick: (index: number) => void;
}

const Grid: FC<Props> = ({squares, onSquareClick}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-10 gap-2 p-4 bg-gray-100 rounded-lg">
        {squares.map((status, index) => {
          let bgColor = 'bg-blue-500';

          if (status === 'success') {
            bgColor = 'bg-green-500';
          } else if (status === 'failed') {
            bgColor = 'bg-red-500';
          } else if (status === 'active') {
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
