const Benefit = ({ Icon, title, description }) => {
  return (
    <div className="group">
      <div className="p-6 h-full bg-white rounded-lg border border-gray-200 cursor-default hover:border-purple-300 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5">
        <div className="w-12 h-12 bg-purple-50 rounded-lg grid place-items-center mb-4 group-hover:bg-purple-100 transition-colors duration-200">
          <Icon 
            className="w-6 h-6 text-purple-600 block" 
            strokeWidth={2}
            style={{ transform: 'translateZ(0)' }} 
          />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Benefit;
