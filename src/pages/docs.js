import React from 'react';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Docs() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Redirect to={`${siteConfig.baseUrl}docs/quick-start`} />
  );
}
