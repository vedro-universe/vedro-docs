---
id: vscode-extension
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Screenshot from '@site/src/components/Screenshot';
import Link from '@site/src/components/Link';

# VSCode Extension

The VSCode extension for Vedro is currently in its alpha version, designed to enhance the functionality of the Vedro testing framework within the <Link to="https://code.visualstudio.com/">Visual Studio Code</Link> environment.

### Installation

You can install the Vedro extension using either of the following methods:

1. **From the Marketplace**: Visit the <Link to="https://marketplace.visualstudio.com/items?itemName=vedro.vedro">extension page</Link> on the Visual Studio Code Marketplace and click "Install" to add it directly from there.
2. **From VSCode**: Navigate to `View -> Extensions` in the VSCode menu. Search for "Vedro" in the marketplace, then click the "Install" button.

### Usage

Once installed, the Vedro extension simplifies the execution of scenarios within your workspace. To initiate the execution process, click the green triangle icon next to the `Scenario` declaration.

### Configuration

To customize the behavior of the Vedro extension, adjust its settings within Visual Studio Code:

1. **Run Options**: Configure options for the `vedro run` command, such as `--dry-run`, by modifying the Run Options setting.
2. **Test Root**: Specify the root directory for your tests, relative to the project root, using the Test Root setting.
