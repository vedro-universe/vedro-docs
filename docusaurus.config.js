// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vedro Testing Framework',
  tagline: 'Readable. Scalable. Pragmatic.',
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
        redirects: []
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
            to: '/plugins',
            label: 'Plugins',
            position: 'left',
          },
          {
            to: '/community',
            label: 'Community',
            position: 'left',
          },
          {
            to: '/docs/ai',
            label: 'AI',
            position: 'left',
          },
          {
            href: 'https://github.com/vedro-universe',
            position: 'right',
            className: 'header-github-link',
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
                to: '/docs/tutorial/api/chapter1-first-steps',
              },
              {
                label: 'Experimental Features',
                to: '/docs/exp',
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
                to: 'faq',
                label: 'FAQ',
              },
              {
                to: 'blog',
                label: 'Changelog',
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
