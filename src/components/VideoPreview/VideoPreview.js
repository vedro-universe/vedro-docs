import React from 'react';

class VideoPreview extends React.Component {

  render() {
    const src = this.props.src.default;
    const preview = this.props.preview.default;
    const width = this.props.width || "250px";

    return (
      <video width={width} poster={preview} preload="none" controls loop muted>
        <source src={src} type="video/quicktime" />
      </video> 
    );
  }

}

export default VideoPreview;
