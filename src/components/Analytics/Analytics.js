import React from 'react';
import Hotjar from '@hotjar/browser';

class Analytics extends React.Component {

  componentDidMount() {
    const devMode = ['localhost', '127.0.0.1'].includes(location.hostname);
    if (devMode) {
      return;
    }

    // umami
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.async = true;
    script.src = 'https://al.vedro.io/script.js';
    script.setAttribute('data-website-id', 'c74fdad7-2166-48f6-aa72-014dcfd28be0');
    document.getElementsByTagName("head")[0].appendChild(script);

    // hotjar
    Hotjar.init(4942831, 6);
  }

  render() {
    return <></>;
  }

}

export default Analytics;
