import CodeHighlighter from '../../Utils/CodeHighlighter';

const CodeTab = ({ tagline, description, code, language = 'python' }) => {
  return (
    <>
      {/* Tab Label */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-800">
          {tagline}
        </span>
      </div>

      {/* Tab Description */}
      <p className="text-gray-700 mb-6">
        {description}
      </p>

      {/* Code Block */}
      <div className="rounded-lg overflow-x-auto">
        <CodeHighlighter className="!p-6" language={language} code={code} />
      </div>
    </>
  );
};

export default CodeTab;
