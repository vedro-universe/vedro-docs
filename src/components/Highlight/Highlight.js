import React from 'react';

class Highlight extends React.Component {

  render() {
    const { color, children } = this.props;
    return (
      <span
        style={{
          backgroundColor: color,
          borderRadius: "2px",
          color: "#fff",
          padding: "0.2rem",
        }}>
        {children}
      </span>
    );
  }

}

export default Highlight;
