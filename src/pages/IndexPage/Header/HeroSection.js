const HeroSection = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32 pb-16 animate-fadeInUp">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent animate-fadeIn animation-delay-200 leading-tight pb-2">
          Vedro Testing Framework
        </h1>
        <p className="text-xl md:text-2xl animate-fadeIn animation-delay-400">
          <span className="text-gray-700 font-medium">Readable</span>
          <span className="text-gray-400 mx-2">·</span>
          <span className="text-gray-700 font-medium">Scalable</span>
          <span className="text-gray-400 mx-2">·</span>
          <span className="text-gray-700 font-medium">Pragmatic</span>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
