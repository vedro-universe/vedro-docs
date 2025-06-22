import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Vedro</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
            <a href="/plugins" className="text-gray-300 hover:text-white transition-colors">Plugins</a>
            <a href="/community" className="text-gray-300 hover:text-white transition-colors">Community</a>
            <a 
              href="https://github.com/vedro-universe/vedro" 
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3">
            <a href="/docs" className="block text-gray-300 hover:text-white transition-colors">Docs</a>
            <a href="/plugins" className="block text-gray-300 hover:text-white transition-colors">Plugins</a>
            <a href="/community" className="block text-gray-300 hover:text-white transition-colors">Community</a>
            <a 
              href="https://github.com/vedro-universe/vedro" 
              className="block text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
