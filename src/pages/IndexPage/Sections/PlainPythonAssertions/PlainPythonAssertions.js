import { Check, X } from 'lucide-react';
import { useState } from 'react';
import CodeHighlighter from '../../Utils/CodeHighlighter';
import FeaturePoint from './FeaturePoint';
import SliderNavigation from './SliderNavigation';

const codeExamples = [
  {
    vedro: `
assert greeting == 'Hello Bob!'
    `,
    other: `self.assertEqual(greeting, 'Hello Alice!')
expect(greeting).toEqual('Hello Alice!')
expect(greeting).to.equal('Hello Alice!')`
  },
  {
    vedro: `
assert error_code not in [400, 500]
    `,
    other: `self.assertNotIn(error_code, [400, 500])
expect([400, 500]).not.toContain(error_code)
expect([400, 500]).to.not.include(error_code)`
  },
  {
    vedro: `
assert len(results) >= 10
    `,
    other: `self.assertGreaterEqual(len(results), 10)
expect(results.length).toBeGreaterThanOrEqual(10)
expect(results).to.have.length.of.at.least(10)`
  }
];

const CodeExample = ({ vedroCode, otherCode }) => {
  const codeBlocks = [
    {
      code: vedroCode,
      language: 'python',
      label: 'Vedro',
      labelColor: 'bg-emerald-500'
    },
    {
      code: otherCode.trim(),
      language: 'javascript',
      label: 'Other Frameworks',
      labelColor: 'bg-rose-500'
    }
  ];

  return (
    <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 relative">
      {codeBlocks.map((block, index) => (
        <div key={index} className="group">
          {/* Labels always visible on mobile, hidden on desktop */}
          <div className="mb-2 flex items-center gap-2 md:hidden">
            <div className={`w-2 h-2 ${block.labelColor} rounded-full`}></div>
            <span className="text-sm font-semibold text-gray-700">{block.label}</span>
          </div>
          <div className="relative">
            {/* Mobile: overflow-x-auto, Desktop: overflow-hidden */}
            <div className="rounded-xl overflow-x-auto md:overflow-hidden transition-all duration-200 h-full">
              <CodeHighlighter 
                className="!p-7"
                language={block.language}
                code={block.code}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FeatureComparison = () => {
  return (
    <div className="grid md:grid-cols-2">
      {/* Vedro Features */}
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Check className="w-6 h-6 text-emerald-600" strokeWidth={3} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Vedro</h3>
        </div>
        <ul className="space-y-4">
          <FeaturePoint isPositive={true}>Just plain Python assert</FeaturePoint>
          <FeaturePoint isPositive={true}>Any Python expression works</FeaturePoint>
          <FeaturePoint isPositive={true}>One obvious way to write</FeaturePoint>
        </ul>
      </div>

      {/* Other Frameworks Features */}
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
            <X className="w-6 h-6 text-rose-600" strokeWidth={3} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Other Frameworks</h3>
        </div>
        <ul className="space-y-4">
          <FeaturePoint isPositive={false}>Custom assertion APIs to learn</FeaturePoint>
          <FeaturePoint isPositive={false}>Limited to pre-defined matchers</FeaturePoint>
          <FeaturePoint isPositive={false}>Constant documentation checks</FeaturePoint>
        </ul>
      </div>
    </div>
  );
}

const PlainPythonAssertions = () => {
  const [currentExample, setCurrentExample] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Features Comparison */}
      <FeatureComparison />

      {/* Divider */}
      <div className="px-8 md:px-10">
        <div className="border-t border-gray-100"></div>
      </div>

      {/* Code Examples Section with Slider */}
      <div className="p-8 md:p-10 bg-gradient-to-b from-transparent to-gray-50/50">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">See the Difference</h3>
          <p className="text-gray-600 text-sm">Compare the simplicity of Vedro with the complexity of other frameworks</p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentExample * 100}%)` }}
            >
              {codeExamples.map((example, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <CodeExample 
                    vedroCode={example.vedro}
                    otherCode={example.other}
                  />
                </div>
              ))}
            </div>
          </div>

          <SliderNavigation 
            currentIndex={currentExample}
            totalItems={codeExamples.length}
            onChange={setCurrentExample}
          />

        </div>
      </div>
    </div>
  );
};

export default PlainPythonAssertions;
