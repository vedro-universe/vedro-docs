// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  defaultSidebar: [
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start',
    },
    {
      type: 'doc',
      id: 'tutorial/tutorial',
      label: 'Tutorial',
    },
    {
      type: 'category',
      label: 'Basics',
      collapsed: false,
      items: [
        'basics/selecting-and-ignoring',
        'basics/reporting-system',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/skipping-scenarios',
        'features/parameterized-scenarios',
        'features/scenario-ordering',
        'features/fail-fast',
        'features/tags',
        'features/scope',
        'features/parallel-execution',
        'features/anti-flaky/anti-flaky',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/using-plugins',
        'guides/testing-exceptions',
        'guides/measuring-coverage',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/allure-reporter',
        'integrations/httpx-client',
        'integrations/pycharm-plugin',
        'integrations/vscode-extension',
        'integrations/gitlab-reporter',
        'integrations/flake8-linter',
        'integrations/unittest-bridge',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      collapsed: false,
      items: [
        'best-practices/scenario-based-tests',
        'best-practices/avoid-ifs',
        'best-practices/best-practice',
      ],
    },
  ],

};

export default sidebars;
