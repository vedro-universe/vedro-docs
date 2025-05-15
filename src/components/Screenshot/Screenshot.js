import React from 'react';

class Screenshot extends React.Component {

  render() {
    const src = this.props.src.default;
    const width = this.props.width || "75%";
    const shadow = this.props.shadow === false ? 'none' : (this.props.shadow || "rgba(0, 0, 0, 0.35) 0px 5px 15px");
    return (
      <a target="_blank" href={src}>
        <img src={src} style={{
            width,
            boxShadow: shadow,
            cursor: "zoom-in",
          }}
        />
      </a>
    );
  }

}

export default Screenshot;
