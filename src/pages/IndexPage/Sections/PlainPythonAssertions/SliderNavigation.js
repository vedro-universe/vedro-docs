import { ChevronLeft, ChevronRight } from 'lucide-react';

const SliderNavigation = ({ currentIndex, totalItems, onChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-7">
      <button
        onClick={() => onChange((prev) => Math.max(0, prev - 1))}
        disabled={currentIndex === 0}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`w-8 h-8 rounded-full font-medium text-sm transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-purple-600 text-white scale-110' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onChange((prev) => Math.min(totalItems - 1, prev + 1))}
        disabled={currentIndex === totalItems - 1}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default SliderNavigation;
