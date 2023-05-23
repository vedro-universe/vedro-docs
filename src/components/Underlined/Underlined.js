import React from 'react';

import "./Underlined.css";

class Underlined extends React.Component {

  render() {
    const { children } = this.props;
    return <span className='underlined'>{children}</span>;
  }

}

export default Underlined;
