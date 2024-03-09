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
    const { to, children, className } = this.props;

    if (!to || !children) {
      return null;
    }

    let target = this.props.target;
    if (!target) {
      target = to.startsWith("http://") || to.startsWith("https://") ? "_blank" : "_self";
    }
    const rel = (target === "_blank") ? "noopener noreferrer" : undefined;

    return (
      <DocLink
        className={className}
        to={to}
        target={target}
        rel={rel}
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
