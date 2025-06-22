import React from 'react';

const HeroSection = () => {
  return (
    <div className="pt-24 pb-12 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 pb-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Vedro Testing Framework
      </h1>
      <p className="text-xl md:text-2xl text-gray-400">
        <span className="text-gray-300">Readable.</span>{' '}
        <span className="text-gray-300">Scalable.</span>{' '}
        <span className="text-gray-300">Pragmatic.</span>
      </p>
    </div>
  );
};

export default HeroSection;
