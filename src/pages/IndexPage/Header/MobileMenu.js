const MobileMenu = ({ isOpen, navItems }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-gray-50 border-t border-gray-200">
      <div className="px-4 py-3 space-y-3">
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors py-2"
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
