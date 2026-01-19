const Grid = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-10 gap-2 p-4 bg-gray-100 rounded-lg">
        {Array.from({length: 100}).map((_, index) => (
          <div
            key={index}
            className="w-10 h-10 bg-blue-500 rounded transition-all duration-200 hover:bg-blue-600 hover:scale-110 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
