import Convert from 'ansi-to-html';

const convert = new Convert({
  newline: true,
  escapeXML: true,
  // DoomOne Theme
  // https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/schemes/DoomOne.itermcolors
  colors: {
    '0': '#000000',
    '1': '#ff6c6b',
    '2': '#98be65',
    '3': '#ecbe7b',
    '4': '#a9a1e1',
    '5': '#c678dd',
    '6': '#51afef',
    '7': '#bbc2cf',
    '8': '#000000',
    '9': '#ff6655',
    '10': '#99bb66',
    '11': '#ecbe7b',
    '12': '#a9a1e1',
    '13': '#c678dd',
    '14': '#51afef',
    '15': '#bfbfbf',
  }
});

const Terminal = ({
  children,
  title = "Terminal",
  className = "",
  color = "#bbc2cf",
  backgroundColor = "#282c34",
}) => {
  const output = children || "";
  const html = convert.toHtml(output.trim());

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg border border-gray-800 ${className}`}>
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-default"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-default"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-default"></div>
          </div>
          <span className="text-gray-400 text-sm font-medium ml-2">{title}</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        className="bg-gray-900 p-0 md:p-4 overflow-x-auto"
        style={{ backgroundColor }}
      >
        <div style={{ display: "table" }}>
          <pre dangerouslySetInnerHTML={{ __html: html }}
            style={{
              background: backgroundColor,
              color: color,
              fontFamily: "var(--ifm-font-family-monospace)",
              fontSize: "var(--ifm-code-font-size)",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              margin: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
