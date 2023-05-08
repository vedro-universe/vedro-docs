import BrowserOnly from '@docusaurus/BrowserOnly';
import React from 'react';

import UmamiAnalytics from '../components/UmamiAnalytics';

function Root({children}) {
  return (
    <>
      {children}
      <BrowserOnly>{() => <UmamiAnalytics />}</BrowserOnly>
    </>
  );
}

export default Root;
