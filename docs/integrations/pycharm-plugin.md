---
id: pycharm-plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Screenshot from '@site/src/components/Screenshot';

# PyCharm Plugin

[Vedro PyCharm plugin](https://plugins.jetbrains.com/plugin/18227-vedro) streamlines the process of executing and analyzing individual and parameterized scenarios right within your IDE, reducing the need to context-switch between your terminal and the PyCharm environment.

## Installation

There are two ways to install the plugin:
1. **From the Marketplace**: Go to the [plugin page](https://plugins.jetbrains.com/plugin/18227-vedro) and install it directly from there
2. **From PyCharm**: Navigate to `Preferences -> Plugins -> Marketplace` in the PyCharm menu. From there, search for "Vedro" in the marketplace, then click the "Install" button

<Screenshot src={require('./pycharm/install.png')} />

## Usage

Once installed, the Vedro plugin allows for easy execution of individual and parameterized scenarios.

For individual scenarios, a green triangle appears next to the `Scenario` declaration. Clicking this triangle runs the selected scenario.

<Screenshot src={require('./pycharm/scenario_run.png')} />

When working with parameterized scenarios, a double green triangle appears near the `@vedro.params` decorator. Clicking this double triangle runs the parameterized scenario.

<Screenshot src={require('./pycharm/parameterized_run.png')} />

A significant benefit of the plugin is that it provides a detailed report within the IDE. It presents all necessary information regarding the scenario execution, making it easier to identify and resolve issues.

<Screenshot src={require('./pycharm/output.png')} />

## Configuration

The PyCharm plugin for Vedro comes with a default configuration of `-r rich pycharm --pycharm-no-output` runner options. However, you can extend these options according to your requirements.

To adjust the runner options, select _"Edit configurations…"_ from the PyCharm menu. This opens a dialogue where you can add any framework arguments to the _"Runner options"_:

<Screenshot src={require('./pycharm/configuration.png')} />

For instance, you could add the `--show-timings` option to your runner options. This option will display the execution times for your scenarios.

:::note
The `--pycharm-no-output` option in the default configuration is included for backward compatibility 
:::
