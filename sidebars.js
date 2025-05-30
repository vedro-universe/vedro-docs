// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  defaultSidebar: [
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start',
    },
    // {
    //   type: 'doc',
    //   id: 'tutorial/tutorial',
    //   label: 'Tutorial',
    // },
    {
      type: 'category',
      label: 'Basics',
      collapsed: false,
      items: [
        'basics/assertions-and-reporting',
        'basics/selecting-and-ignoring',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      link: { type: 'generated-index' },
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
        'basics/reporting-system',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      link: { type: 'generated-index' },
      collapsed: false,
      items: [
        'guides/using-plugins',
        'guides/testing-exceptions',
        'guides/measuring-coverage',
        'guides/temporary-files',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      link: { type: 'generated-index' },
      collapsed: true,
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
      link: { type: 'generated-index' },
      collapsed: true,
      items: [
        'best-practices/scenario-based-tests',
        'best-practices/avoid-ifs',
        'best-practices/naming-for-better-tests',
        'best-practices/best-practice',
      ],
    },
  ],

};

export default sidebars;
