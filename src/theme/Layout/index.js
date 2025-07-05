import React from 'react';
import Layout from '@theme-original/Layout';
import AskAI from '@site/src/components/AskAI';
import { useLocation } from '@docusaurus/router';

export default function LayoutWrapper(props) {
  const { pathname } = useLocation();

  const isDocsPage = pathname.startsWith('/docs');

  return (
    <>
      <Layout {...props} />
      {isDocsPage && <AskAI />}
    </>
  );
}
