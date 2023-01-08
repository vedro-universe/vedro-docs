import React from 'react';

import { PluginList, Plugin } from '../PluginList';


class VedroPluginList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { plugins: [] };
  }

  componentDidMount() {
    fetch("https://api.vedro.io/v1/plugins/top")
      .then(response => response.json())
      .then(plugins => this.setState({ plugins }))
    ;
  }

  renderPlugin(plugin) {
    return (
      <Plugin
        key={`${plugin.name}`}
        name={`${plugin.name}`}
        pypi={`${plugin.name}`}
        desc={`${plugin.description}`}
      />
    );
  }

  render () {
    return (
      <PluginList>
        {this.state.plugins.map(plugin => this.renderPlugin(plugin))}
      </PluginList>
    )
  }

}

export default VedroPluginList;
