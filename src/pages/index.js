import Head from '@docusaurus/Head';

import IndexPage from './IndexPage/IndexPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vedro Testing Framework</title>
        <meta name="description" content="Readable. Scalable. Pragmatic." />

        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap" 
          rel="stylesheet" 
        />

        <link rel="stylesheet" href="/css/index.min.css" />
      </Head>
      <main id="vedro-index">
        <IndexPage />
      </main>
    </>
  );
}
