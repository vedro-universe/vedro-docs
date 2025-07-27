import Head from '@docusaurus/Head';

import IndexPage from './IndexPage/IndexPage';

export default function Home() {
  const fonts = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  `;

  return (
    <>
      <Head>
        <title>Vedro Testing Framework</title>
        <meta name="description" content="Readable. Scalable. Pragmatic." />
        <style>{fonts}</style>
        <link rel="stylesheet" href="/css/index.min.css" />
      </Head>
      <main id="vedro-index">
        <IndexPage />
      </main>
    </>
  );
}
