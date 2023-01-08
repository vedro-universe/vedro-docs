import React from 'react';

class Plugin extends React.Component {

  render () {
    const { name, pypi, desc } = this.props;
    return (
      <tr>
        <td><a href={`https://pypi.org/project/${pypi}/`} target="_blank">{name}</a></td>
        <td>{desc}</td>
        <td><img src={`https://img.shields.io/pypi/v/${pypi}.svg?style=flat-square`} /></td>
      </tr>
    );
  }

}

export default Plugin;
