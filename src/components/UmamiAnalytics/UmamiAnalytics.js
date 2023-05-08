import React from 'react';

class UmamiAnalytics extends React.Component {

  componentDidMount() {
    const devMode = ['localhost', '127.0.0.1'].includes(location.hostname);
    if (devMode) {
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.async = true;
    script.src = 'https://analytics.vedro.io/umami.js';
    script.setAttribute('data-website-id', 'c74fdad7-2166-48f6-aa72-014dcfd28be0');
    document.getElementsByTagName("body")[0].appendChild(script);
  }

  render() {
    return <></>;
  }

}

export default UmamiAnalytics;
