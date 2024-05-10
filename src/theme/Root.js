import BrowserOnly from '@docusaurus/BrowserOnly';
import React from 'react';

import Analytics from '../components/Analytics';

function Root({children}) {
  return (
    <>
      {children}
      <BrowserOnly>{() => <Analytics />}</BrowserOnly>
    </>
  );
}

export default Root;
