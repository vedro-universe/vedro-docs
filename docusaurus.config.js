// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vedro',
  tagline: 'Pragmatic Testing Framework',
  url: 'https://vedro.io',
  baseUrl: '/',
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
          sidebarPath: './sidebars.js',
          breadcrumbs: true,
          editUrl: "https://github.com/vedro-universe/vedro-docs/edit/main",
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: {
          blogTitle: 'What\'s New',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  plugins: [
    [
      // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html', 'htm'],
        redirects: [
          {
            from: '/docs',
            to: '/docs/quick-start',
          },
        ]
      }
    ]
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
        logo: {
          alt: 'Logo',
          src: 'img/vedro-logo.png',
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
            href: '/community',
            label: 'Community',
            position: 'left',
          },
          {
            href: 'https://vedro-universe.slack.com',
            label: '💬 Join Slack',
            position: 'right',
          }
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
                to: '/docs/tutorial/api/chapter1-first-steps',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'X (Twitter)',
                href: 'https://x.com/vedro_universe',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/vedro_universe',
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
                to: 'blog',
                label: 'Changelog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/vedro-universe',
              },
              {
                label: 'PyPi',
                href: 'https://pypi.org/project/vedro/',
              },
            ],
          },
        ],
        copyright: `Made in the middle of nowhere with ❤️<br/>© ${new Date().getFullYear()}`,
      },
      prism: {
        theme: prismThemes.oceanicNext,
        additionalLanguages: ['json', 'bash'],
      },
    }),
};

export default config;
