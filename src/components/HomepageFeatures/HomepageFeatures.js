import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faPlug, faCheck } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

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
        Unleash the power of plugins. Including integrations with <a href='https://plugins.jetbrains.com/plugin/18227-vedro' target='_blank'>PyCharm</a>, <a href='https://github.com/vedro-universe/vedro-allure-reporter' target='_blank'>Allure</a> and <a href='https://github.com/vedro-universe/vedro-gitlab-reporter' target='_blank'>GitLab</a>
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
