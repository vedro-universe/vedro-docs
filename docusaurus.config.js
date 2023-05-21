// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Vedro',
  tagline: 'Pragmatic BDD Framework',
  url: 'https://vedro.io',
  baseUrl: process.env.DEV_MODE ? '/' : '/en/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      navbar: {
        title: 'Vedro',
        logo: {
          alt: 'Logo',
          src: 'img/vedro.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'quick-start',
            position: 'left',
            label: 'Docs',
          },
          {
            href: '/plugins',
            label: 'Plugins',
            position: 'left',
          },
          {
            href: '/universe',
            label: 'Universe',
            position: 'left',
          },
          {
            to: 'blog',
            label: 'Blog',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quick Start',
                to: '/docs/quick-start',
              },
              {
                label: 'Tutorial',
                to: '/docs/tutorial/chapter1-first-steps',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discussions',
                href: 'https://github.com/tsv1/vedro/discussions',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/vedro_universe',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/tsv1/vedro',
              },
              {
                label: 'PyPi',
                href: 'https://pypi.org/project/vedro/',
              },
            ],
          },
        ],
        copyright: `Made in the middle of nowhere with ❤️<br/>© 2015-${new Date().getFullYear()}`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/oceanicNext'),
      },
    }),
});
