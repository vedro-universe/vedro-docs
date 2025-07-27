import { Brain, FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Benefit from './Benefit';
import CodeTab from './CodeTab';
import InlineCode from './InlineCode';

const MinimalTab = () => {
  const code = `
from pathlib import Path as File
from vedro import scenario

@scenario()
def create_file():
    # Arrange
    file = File('example.txt')
    
    # Act
    file.touch()
    
    # Assert
    assert file.exists()
`.trim()

  return (
    <CodeTab
      tagline="For teams who value simplicity"
      description="Start writing tests immediately with zero ceremony. If you know Python, you already know Vedro."
      code={code}
    />
  );
};

const StructuredTab = () => {
    const code = `
from pathlib import Path as File
from vedro import scenario, given, when, then

@scenario()
def create_file():
    with given('new file'):
        file = File('example.txt')
    
    with when('creating file'):
        file.touch()
    
    with then('file should exist'):
        assert file.exists()
`.trim()

  return (
    <CodeTab
      tagline="For teams who value clarity"
      description="Make your tests self-documenting with Vedro's context managers. Every step appears automatically in reports and terminal output."
      code={code}
    />
  );
};

const ExpressiveTab = () => {
    const code = `
from pathlib import Path as File
import vedro

class Scenario(vedro.Scenario):
    subject = 'create file'

    def given_new_file(self):
        self.file = File('example.txt')
    
    def when_creating_file(self):
        self.file.touch()
    
    @retry(attempts=3)
    def then_file_should_exist(self):
        assert self.file.exists()
`.trim()

  return (
    <CodeTab
      tagline="For teams who need control"
      description={
        <>
        Gain fine-grained control over test execution with Vedro's class-based approach. Decorate individual steps with <InlineCode>@retry</InlineCode>, <InlineCode>@timeout</InlineCode> or custom logic, they're just methods. Target flaky steps, not entire tests.
        </>
      }
      code={code}
    />
  );
};

const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
      isActive
        ? 'bg-white text-purple-600 shadow-sm'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {tab.label}
  </button>
);

const WriteTestsYourWay = () => {
  const [activeTab, setActiveTab] = useState('minimal');

  const tabs = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'structured', label: 'Structured' },
    { id: 'expressive', label: 'Expressive' }
  ];

  return (
    <div>
      <div className="mt-12">
        {/* Tab Headers */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={setActiveTab}
              />
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 rounded-xl p-8 overflow-hidden">
          <div key={activeTab} className="">
            {activeTab === 'minimal' && <MinimalTab />}
            {activeTab === 'structured' && <StructuredTab />}
            {activeTab === 'expressive' && <ExpressiveTab />}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Benefit 
            Icon={Sparkles}
            title="Start Simple, Grow Naturally"
            description="Begin with minimal style and evolve as your needs change. Add structure when it helps, not because it's required. Mix styles within the same project: simple tests stay simple, complex tests get structure."
          />
          <Benefit 
            Icon={FileText}
            title="Self-Documenting Tests"
            description="Steps automatically appear in test reports and terminal output without plugins or configuration. Code reviews become effortless when tests explain their intent clearly. No more guessing what a test does or why it failed."
          />
          <Benefit 
            Icon={Brain}
            title="One Mental Model"
            description="Whether you write bare functions, context-managed steps, or class-based methods, every test follows the same AAA flow. Consistent structure means faster onboarding and zero cognitive overhead when switching between tests."
          />
        </div>
      </div>
    </div>
  );
};

export default WriteTestsYourWay;
