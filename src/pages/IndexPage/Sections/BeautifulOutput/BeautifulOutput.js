import { Clock, Eye, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import { otherOutput, vedroOutput } from './outputExamples';
import Terminal from './Terminal';
import ToggleSwitch from './ToggleSwitch';

const Feature = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const FeatureWithHover = ({ icon: Icon, title, description }) => {
  return (
    <div className="group flex gap-4 p-2 -m-2 rounded-lg transition-all duration-200 hover:bg-purple-50/50 cursor-default">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-purple-200">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-900 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const FeatureGrid = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12">
        <FeatureWithHover 
          icon={Eye} 
          title="Smart Diffs at a Glance" 
          description="See exactly what changed with character-level highlighting. No more squinting at walls of text to spot the difference between expected and actual values." 
        />
        <FeatureWithHover 
          icon={Zap} 
          title="Context Without Clutter" 
          description="Get just the right amount of information. Vedro shows you the failing assertion with surrounding context, not overwhelming stack dumps." 
        />
        <FeatureWithHover 
          icon={Target} 
          title="Step-by-Step Visibility" 
          description="Watch your test execution flow with clear step names and timing. Know exactly where things went wrong and how long each step took." 
        />
        <FeatureWithHover 
          icon={Clock} 
          title="Real-Time Progress" 
          description="Monitor test execution with live progress indicators. See which tests are running, passing, or failing as it happens, not after everything completes." 
        />
    </div>
  );
}

const BeautifulOutput = () => {
  const [showTraditional, setShowTraditional] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowTraditional(!showTraditional);
      setTimeout(() => setIsAnimating(false), 50);
    }, 100);
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <ToggleSwitch 
          isTraditional={showTraditional}
          onToggle={handleToggle}
        />
      </div>

      <div className="relative">
        <div className={`transition-all duration-300 ease-in-out ${
          isAnimating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'
        }`}>
          <div className={`relative ${showTraditional ? 'opacity-100' : 'opacity-100'}`}>
            <Terminal className="transition-all duration-500 ease-in-out" title="">
              {showTraditional ? otherOutput : vedroOutput}
            </Terminal>
          </div>
        </div>
      </div>

      <FeatureGrid />
    </div>
  );
};

export default BeautifulOutput;
