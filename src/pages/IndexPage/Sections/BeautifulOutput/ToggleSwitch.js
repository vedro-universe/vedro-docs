import { Sparkles, Terminal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const UnderlineToggle = ({ isTraditional, onToggle }) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // 50% of total toggle width
      const underlineWidth = containerWidth * 0.5 - (isTraditional ? -10 : 20);

      // Position underline at left or right edge
      const position = isTraditional 
        ? containerWidth - underlineWidth // Right edge
        : 0; // Left edge

      setUnderlineStyle({
        width: `${underlineWidth}px`,
        transform: `translateX(${position}px)`
      });
    }
  }, [isTraditional]);

  return (
    <div className="relative inline-flex" ref={containerRef}>
      <div className="flex gap-8">
        <button
          onClick={() => isTraditional && onToggle()}
          className={`pb-3 px-1 font-medium transition-all duration-300 ${
            !isTraditional 
              ? 'text-purple-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Sparkles className="w-4 h-4 inline mr-2" />
          Vedro Output
        </button>
        
        <button
          onClick={() => !isTraditional && onToggle()}
          className={`pb-3 px-1 font-medium transition-all duration-300 ${
            isTraditional 
              ? 'text-gray-800' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Terminal className="w-4 h-4 inline mr-2" />
          Traditional Output
        </button>
      </div>
      
      {/* Animated underline */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={underlineStyle}
        />
      </div>
    </div>
  );
};

export default UnderlineToggle;
