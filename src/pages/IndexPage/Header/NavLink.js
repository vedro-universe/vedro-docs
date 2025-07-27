const NavLink = ({ href, label, external }) => {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a 
      href={href}
      className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group no-underline"
      {...linkProps}
    >
      {label}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
    </a>
  );
};

export default NavLink;
