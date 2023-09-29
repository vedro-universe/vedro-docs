---
id: plugins
---

import { PluginList, Plugin } from '@site/src/components/PluginList';
import VedroPluginList from '@site/src/components/VedroPluginList';
import Link from '@site/src/components/Link';

# Plugins

## Community Plugins

Third-party plugins, created by the Vedro community, expand the framework's capabilities by adding new features, tools, and integrations.

<VedroPluginList />

And <Link to="https://pypi.org/search/?q=vedro">more..</Link>

:::tip

Interested in creating your own plugins? Learn how to do so <Link to="/docs/guides/writing-plugins">here</Link>

:::

## IDE Plugins

These are plugins specifically designed to integrate Vedro into popular IDEs, providing seamless workflows and a more user-friendly experience.

| Plugin                                                             | Description                                               | Info          |
|--------------------------------------------------------------------|-----------------------------------------------------------|---------------|
| <Link to="https://plugins.jetbrains.com/plugin/18227-vedro">PyCharm Plugin</Link> | PyCharm integration | Version 0.2.2 |

## Core Plugins

Built-in plugins provided by Vedro to deliver essential features.

<PluginList>
    <Plugin key='director' name='Director' pypi='vedro'
            desc='Manages and configures reporters for scenario execution'
    />
    <Plugin key='rich-reporter' name='Rich Reporter' pypi='vedro'
            desc='Enhanced, customizable scenario reporting with rich output'
    />
    <Plugin key='silent-reporter' name='Silent Reporter' pypi='vedro'
        desc='Minimizes output during scenario execution'
    />
    <Plugin key='pycharm-reporter' name='PyCharm Reporter' pypi='vedro'
        desc='Outputs scenario results in a PyCharm-friendly format'
    />
    <Plugin key='orderer' name='Orderer' pypi='vedro'
        desc='Configures the execution order of scenarios'
    />
    <Plugin key='deferrer' name='Deferrer' pypi='vedro'
        desc='Executes deferred functions at the end of each scenario'
    />
    <Plugin key='artifacted' name='Artifacted' pypi='vedro'
        desc='Manages artifacts for step and scenario results'
    />
    <Plugin key='interrupter' name='Interrupter' pypi='vedro'
        desc='Halts test execution after N failed scenarios or on specified signals'
    />
    <Plugin key='seeder' name='Seeder' pypi='vedro'
        desc='Sets seeds for deterministic random behavior in scenarios'
    />
    <Plugin key='skipper' name='Skipper' pypi='vedro'
        desc='Allows selective scenario skipping and selection based on file/directory or subject'
    />
    <Plugin key='slicer' name='Slicer' pypi='vedro'
        desc='Provides a way to distribute scenarios among multiple workers'
    />
    <Plugin key='tagger' name='Tagger' pypi='vedro'
        desc='Allows scenarios to be selectively run based on user-defined tags'
    />
    <Plugin key='repeater' name='Repeater' pypi='vedro'
        desc='Repeat scenarios a specified number of times'
    />
    <Plugin key='rerunner' name='Rerunner' pypi='vedro'
        desc='Reruns failed scenarios a specified number of times'
    />
    <Plugin key='assert-rewriter' name='AssertRewriter' pypi='vedro'
        desc='Rewrites assert statements to provide better error messages'
    />
    <Plugin key='dryRunner' name='DryRunner' pypi='vedro'
        desc='Simulates scenario execution without actually executing them'
    />
    <Plugin key='lastFailed' name='LastFailed' pypi='vedro'
        desc='Runs only the previously failed scenarios'
    />
    <Plugin key='terminator' name='Terminator' pypi='vedro'
        desc='Handles test exit status based on test results and interruptions'
    />
</PluginList>
