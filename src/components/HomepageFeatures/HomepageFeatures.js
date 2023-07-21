import Link from '@docusaurus/Link';
import { faCheck, faMagic, faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';

// fix flashing icons
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'No Magic',
    icon: faMagic,
    description: (
      <>
        Write test scenarios as a Python code
      </>
    ),
  },
  {
    title: 'Pluggable',
    icon: faPlug,
    description: (
      <>
        Unleash the power of plugins. Including integrations with <Link to='docs/integrations/pycharm-plugin' target='_blank'>PyCharm</Link>, <Link to='/docs/integrations/allure-reporter' target='_blank'>Allure</Link> and <Link to='/docs/integrations/gitlab-reporter' target='_blank'>GitLab</Link>
      </>
    ),
  },
  {
    title: 'Best Practices',
    icon: faCheck,
    description: (
      <>
        Use the distilled knowledge from dozens of quality engineers
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <p className="text--center">
        <FontAwesomeIcon icon={icon} size="4x" color="#9c26b0" style={{ fontSize: "4em" }} />
      </p>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
