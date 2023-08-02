import React from 'react';

class VideoEmbed extends React.Component {

  render() {
    const src = this.props.src.default;
    const preview = this.props.preview.default;
    const width = this.props.width || null;
    const height = this.props.height || null;

    return (
      <video width={width} height={height} poster={preview} preload="none" controls loop muted>
        <source src={src} type="video/quicktime" />
      </video> 
    );
  }

}

export default VideoEmbed;
