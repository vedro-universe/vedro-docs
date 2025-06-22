import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
    </div>
  );
};

export default IndexPage;
