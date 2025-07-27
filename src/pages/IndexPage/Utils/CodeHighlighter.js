import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);

const CodeHighlighter = ({ 
  code, 
  language = 'python', 
  className = '',
  ...props 
}) => {
  return (
    <SyntaxHighlighter 
      language={language}
      style={atomOneDark}
      className={className}
      {...props}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;
