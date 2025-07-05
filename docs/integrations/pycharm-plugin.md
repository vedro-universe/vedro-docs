---
id: pycharm-plugin
---

import Screenshot from '@site/src/components/Screenshot';

# PyCharm Plugin

:::tip What’s inside
* ▶️ Run individual or parameterized scenarios with a click
* 📊 View clean, structured test output inside PyCharm
* ⚙️ Customize runner options to fit your workflow
:::

## Introduction

The [Vedro PyCharm plugin](https://plugins.jetbrains.com/plugin/18227-vedro) makes it easy to run and debug your scenarios, without ever leaving the IDE. It adds inline controls to execute both individual and parameterized scenarios, plus a built-in test report for quick feedback.

No need to switch between terminal and editor: just click and go.

## Installation

You can install the plugin in two ways:

1. From the JetBrains Marketplace

    - Visit the [plugin page](https://plugins.jetbrains.com/plugin/18227-vedro)
    - Click **Install**

2. From within PyCharm

    - Go to `Preferences → Plugins → Marketplace`
    - Search for **Vedro**
    - Click **Install**

## Running Scenarios

After installation, you’ll see run icons directly in the editor:

### ▶️ Run individual scenarios

A single green triangle appears next to each scenario definition. Click it to run just that scenario.

<Screenshot src={require('./pycharm/scenario_run_cls.png')} shadow={false} width="45%" />

<Screenshot src={require('./pycharm/scenario_run_fn.png')} shadow={false} width="45%" />

### ⏩ Run parameterized scenarios

For parameterized scenarios, a **double triangle** appears next to each `@params` entry. Clicking it runs that specific parameterized case.

<Screenshot src={require('./pycharm/scenario_run_cls_params.png')} shadow={false} width="45%" />

<Screenshot src={require('./pycharm/scenario_run_fn_params.png')} shadow={false} width="45%" />

### 🗂️ Run from file or directory
You can also right-click any scenario file or directory and choose **“Run/Debug Vedro scenario(s)”** from the context menu. This is a quick way to run an entire group of related tests.

:::info Important
To ensure compatibility with PyCharm and other plugins, your project must contain a `vedro.cfg.py` file in the root directory (it can be completely empty).
:::

## Viewing Results

Test output is shown right inside the Run window, with a clear, structured summary: just like in the terminal.

<Screenshot src={require('./pycharm/output.png')} shadow={false} width="100%" />

You’ll see scenario names, step results, failures (if any), and execution time, all without leaving PyCharm.

## Configuration

By default, the plugin runs scenarios using the following options:

```
-r rich pycharm --pycharm-no-output
```

These options ensure smooth integration with PyCharm, with `--pycharm-no-output` included for backward compatibility.

### Customize Runner Options

To customize how scenarios are run:

1. Open **Run → Edit Configurations…**
2. Select your Vedro configuration
3. Add any extra arguments to the **Runner options** field

<Screenshot src={require('./pycharm/configuration.png')} shadow={false} width="100%" />

For example:

```
--show-timings --show-steps
```

This will enable step-by-step timing and detailed output during your test run.
