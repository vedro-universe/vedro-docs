import DocLink from '@docusaurus/Link';
import PropTypes from 'prop-types';
import React from 'react';

class Link extends React.Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    target: PropTypes.string,
  };

  render() {
    const { to, children, className, target } = this.props;

    if (!to || !children || typeof children !== "string") {
      return null;
    }

    return (
      <DocLink
        className={className}
        to={to}
        target={target}
        data-umami-event="goto"
        data-umami-event-url={to}
        data-umami-event-id={children}
      >
        {children}
      </DocLink>
    );
  };

}

export default Link;
