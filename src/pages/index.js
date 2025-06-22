import React from 'react';
import Head from '@docusaurus/Head';

import IndexPage from './IndexPage/IndexPage';
import styles from './IndexPage/Styles';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vedro Testing Framework</title>
        <meta name="description" content="Readable. Scalable. Pragmatic." />
        <style>{styles}</style>
      </Head>
      <main id="vedro-index">
        <IndexPage />
      </main>
    </>
  );
}
