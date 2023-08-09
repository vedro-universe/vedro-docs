module.exports = {
  // defaultSidebar: [{type: 'autogenerated', dirName: '.'}],
  defaultSidebar: [
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start',
    },
    {
      type: 'doc',
      id: 'tutorial/tutorial',
      label: 'Tutorial 🚀',
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
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/using-plugins',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/valera-validator',
        'integrations/allure-reporter',
        'integrations/httpx-client',
        'integrations/pycharm-plugin',
        'integrations/gitlab-reporter',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      collapsed: false,
      items: [
        'best-practices/scenario-based',
        'best-practices/best-practice',
      ],
    },
  ],
};
