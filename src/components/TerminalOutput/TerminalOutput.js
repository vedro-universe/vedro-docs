import React from 'react';
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

class TerminalOutput extends React.Component {

  render () {
    const output = this.props.children || "";
    const html = convert.toHtml(output.trim());
    return (
      <pre dangerouslySetInnerHTML={{ __html: html }}
           style={{
              background: "#282c34",
              color: "#bbc2cf",
              fontFamily: "var(--ifm-font-family-monospace)",
              fontSize: "var(--ifm-code-font-size)",
            }}
      />
    );
  }

}

export default TerminalOutput;
