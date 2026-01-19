import type {FC} from 'react';

interface Props {
  timeMs: string;
  setTimeMs: (timeMs: string) => void;
  onStart: () => void;
  isGameRunning: boolean;
}

const ControlsSection: FC<Props> = ({timeMs, setTimeMs, onStart, isGameRunning}) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
    <div className="flex items-center gap-2">
      <label htmlFor="time-input" className="text-gray-700 font-medium">
        Time (ms):
      </label>
      <input
        id="time-input"
        type="number"
        value={timeMs}
        onChange={({target: {value}}) => setTimeMs(value)}
        min="100"
        step="100"
        disabled={isGameRunning}
        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="1000"
      />
    </div>
    <button
      onClick={onStart}
      disabled={isGameRunning}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      Start
    </button>
  </div>
);

export default ControlsSection;
