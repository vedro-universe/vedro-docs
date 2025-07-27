import { Clock, Eye, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import Terminal from './Terminal';
import ToggleSwitch from './ToggleSwitch';

const vedroOutput = `
Scenarios
[1m* [0m[1m
[0m [31m✗ build active users query[0m[38;5;244m (0.01s)[0m[38;5;244m
[0m   [32m✔ given a query builder[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m   [32m✔ when building active user query[0m[38;5;244m (0.01s)[0m[38;5;244m
[0m   [31m✗ then it should match expected SQL[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m─────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/app/tests/[0m[1;33mbuild_user_queries.py[0m:[94m27[0m in [92mbuild_active_users_query[0m              [31m│[0m
[31m│[0m                                                                              [31m│[0m
[31m│[0m   [2m24 [0m                                                                        [31m│[0m
[31m│[0m   [2m25 [0m    query = user_query_builder.active_only().build()                    [31m│[0m
[31m│[0m   [2m26 [0m                                                                        [31m│[0m
[31m│[0m [31m❱ [0m27     [1;4;94massert[0m[1;4m query == [0m[1;4;33m"""[0m[1;4;33mSELECT u.id, u.name, u.email, u.created_at, u[0m    [31m│[0m
[31m│[0m   [2m28 [0m                                                                        [31m│[0m
[31m╰──────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [32m- "SELECT u.id, u.name, [0m[30;42mu.[0m[32memail, u.created_at, u.updated_at FROM users u LEFT JOIN preferences p ON u.id = p.user[0m
    [31m+ "SELECT u.id, u.name, email, u.created_at, u.updated_at FROM users u LEFT JOIN preferences p ON u.id = p.user_i[0m
 
 
[37m# --seed 9bcc2e2b-9281-4537-9e10-e7f6244c7d0e[0m[37m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.01s)[0m[34m
[0m
`.trim();

const otherOutput = `
[1m============================= test session starts ==============================[0m
platform linux -- Python 3.12.9
rootdir: /app
collected 1 item

tests/test_user_queries.py [31mF[0m[31m                                             [100%][0m

=================================== FAILURES ===================================
[31m[1m________________________ test_build_active_users_query _________________________[0m

    [0m[94mdef[39;49;00m[90m [39;49;00m[92mtest_build_active_users_query[39;49;00m():[90m[39;49;00m
        user_query_builder = UserQueryBuilder()[90m[39;49;00m
    [90m[39;49;00m
        query = user_query_builder.active_only().build()[90m[39;49;00m
    [90m[39;49;00m
>       [94massert[39;49;00m query == [33m"""[39;49;00m[33mSELECT u.id, u.name, u.email, u.created_at, u.updated_at FROM users u LEFT JOIN preferences p ON u.id = p.user_id LEFT JOIN addresses a ON u.id = a.user_id LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = true AND u.verified = true AND u.created_at > [39;49;00m[33m'[39;49;00m[33m2025-01-01[39;49;00m[33m'[39;49;00m[33m ORDER BY u.created_at DESC[39;49;00m[33m"""[39;49;00m[90m[39;49;00m
[1m[31mE       AssertionError: assert 'SELECT u.id,...eated_at DESC' == 'SELECT u.id,...eated_at DESC'[0m
[1m[31mE         [0m
[1m[31mE         [0m[91m- SELECT u.id, u.name, u.email, u.created_at, u.updated_at FROM users u LEFT JOIN preferences p ON u.id = p.user_id LEFT JOIN addresses a ON u.id = a.user_id LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = true AND u.verified = true AND u.created_at > '2025-01-01' ORDER BY u.created_at DESC[39;49;00m[90m[39;49;00m[0m
[1m[31mE         ?                      --[90m[39;49;00m[0m
[1m[31mE         [92m+ SELECT u.id, u.name, email, u.created_at, u.updated_at FROM users u LEFT JOIN preferences p ON u.id = p.user_id LEFT JOIN addresses a ON u.id = a.user_id LEFT JOIN orders o ON u.id = o.user_id ...[0m
[1m[31mE         [0m
[1m[31mE         ...Full output truncated (1 line hidden), use '-vv' to show[0m

[1m[31mtests/test_user_queries.py[0m:24: AssertionError
[36m[1m=========================== short test summary info ============================[0m
[31mFAILED[0m tests/test_user_queries.py::[1mtest_build_active_users_query[0m - AssertionError: assert 'SELECT u.id,...eated_at DESC' == 'SELECT u.id,...ea...
[31m============================== [31m[1m1 failed[0m[31m in 0.03s[0m[31m ===============================[0m  
`.trim();

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
