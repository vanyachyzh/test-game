import type {FC} from 'react';
import type {SquareType} from '../types';

interface Props {
  squares: Array<SquareType>;
  onSquareClick: (index: number) => void;
}

const Grid: FC<Props> = ({squares, onSquareClick}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-10 gap-1 p-2 bg-gray-100 rounded-lg w-full max-w-full">
        {squares.map((status, index) => {
          let bgColor = 'bg-blue-500';

          if (status === 'success') {
            bgColor = 'bg-green-500';
          } else if (status === 'failed') {
            bgColor = 'bg-red-500';
          } else if (status === 'active') {
            bgColor = 'bg-yellow-500 cursor-pointer';
          }

          return (
            <div
              key={index}
              onClick={() => onSquareClick(index)}
              className={`aspect-square w-full ${bgColor} rounded transition-all duration-200 hover:scale-110`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
