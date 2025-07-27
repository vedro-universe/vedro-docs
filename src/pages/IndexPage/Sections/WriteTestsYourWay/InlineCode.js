const InlineCode = ({ children }) => {
  return (
    <span className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-sm">
      {children}
    </span>
  );
};

export default InlineCode;
