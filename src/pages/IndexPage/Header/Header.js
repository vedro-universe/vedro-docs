import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import NavLink from './NavLink';

const navItems = [
  { href: '/docs', label: 'Docs' },
  { href: '/plugins', label: 'Plugins' },
  { href: '/community', label: 'Community' },
  { href: 'https://github.com/vedro-universe/vedro', label: 'GitHub', external: true }
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50 animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-700 cursor-default">
              Vedro
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} navItems={navItems} />
    </header>
  );
};

export default Header;
