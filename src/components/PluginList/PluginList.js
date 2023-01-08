import React from 'react';

class PluginList extends React.Component {

  renderHeader() {
    return (
      <thead>
          <tr>
            <th>Plugin</th>
            <th>Description</th>
            <th>Info</th>
          </tr>
        </thead>
    );
  }

  renderBody() {
    return (
      <tbody>
        {this.props.children}
      </tbody>
    );
  }

  render () {
    return (
      <table>
        {this.renderHeader()}
        {this.renderBody()}
      </table>
    )
  }

}

export default PluginList;
