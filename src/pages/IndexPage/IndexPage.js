import Footer from './Footer';
import Header from './Header';
import BeautifulOutput from './Sections/BeautifulOutput';
import HeroSection from './Sections/HeroSection';
import JoinCommunity from './Sections/JoinCommunity';
import PlainPythonAssertions from './Sections/PlainPythonAssertions';
import PluginFirstArchitecture from './Sections/PluginFirstArchitecture';
import Section from './Sections/Section';
import WriteTestsYourWay from './Sections/WriteTestsYourWay';
import useHashScroll from './Utils/useHashScroll';

const IndexPage = () => {
  useHashScroll();

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection />
          </div>
        </div>

        {/* Section 1: Write Tests Your Way */}
        <Section
          id="write-tests-your-way"
          label="FLEXIBLE SYNTAX"
          title="Write Tests Your Way"
          description="Vedro adapts to you, not the other way around. Keep it minimal with simple functions. Add structure with self-documenting steps. Go full control with class-based scenarios. Every test follows the proven Arrange-Act-Assert pattern, just pick your approach."
          bgClass="bg-white"
        >
          <WriteTestsYourWay />
        </Section>

        {/* Section 2: Plain Python Assertions */}
        <Section
          id="plain-python-assertions"
          label="ZERO LEARNING CURVE"
          title="Plain Python Assertions"
          description="No magic, no DSL, no learning curve. Vedro uses Python's built-in assert statement, the one you already know and love. Write assertions exactly as you would in any Python code."
          bgClass="bg-gray-50"
        >
          <PlainPythonAssertions />
        </Section>

        {/* Section 3: Beautiful Output */}
        <Section
          id="beautiful-output"
          label="DEBUG WITH EASE"
          title="Beautiful Output"
          description="When tests fail, every second counts. Vedro's rich terminal output shows exactly what went wrong: clean color-coded diffs, relevant stack traces, and step-by-step context. Spend time fixing bugs, not deciphering error messages."
          bgClass="bg-white"
        >
          <BeautifulOutput />
        </Section>

        {/* Section 4: Plugin-First Architecture */}
        <Section
          id="plugin-first-architecture"
          label="EXTEND EVERYTHING"
          title="Plugin-First Architecture"
          description="Everything in Vedro is a plugin, even core features. This isn't just extensibility, it's a fundamental design principle that gives you complete control over your testing experience."
          bgClass="bg-gray-50"
        >
          <PluginFirstArchitecture />
        </Section>

        {/* CTA Section: Join Community */}
        <JoinCommunity />

        <Footer />
      </div>
    </div>
  );
};

export default IndexPage;
