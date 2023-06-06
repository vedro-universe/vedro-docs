import React from 'react';

class Screenshot extends React.Component {

  render() {
    const src = this.props.src.default;
    const width = this.props.width || "250px";
    return (
      <a target="_blank" href={src}>
        <img src={src} style={{
            width,
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            cursor: "zoom-in",
          }}
        />
      </a>
    );
  }

}

export default Screenshot;
