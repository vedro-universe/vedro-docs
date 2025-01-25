import { PluginList, Plugin } from '@site/src/components/PluginList';
import VedroPluginList from '@site/src/components/VedroPluginList';
import Link from '@site/src/components/Link';

# Plugins

Explore Vedro’s plugin ecosystem, which consists of core plugins providing essential features and community-developed plugins that extend its functionality. Discover how to integrate these plugins into your project, and enhance your testing experience with the wide range of tools available.

:::info
**New to using plugins in Vedro?** Check out our <Link to="/docs/guides/using-plugins">Using Plugins guide</Link> to learn how to install, configure, and manage plugins in your project.
:::

## Community Plugins

The Vedro community actively contributes to the framework by developing plugins that expand its capabilities. Below is a list of popular third-party plugins that add various features like enhanced reporting and integrations:

<VedroPluginList />

Looking for more plugins? Explore the full list on <Link to="https://pypi.org/search/?q=vedro">PyPi</Link>.

:::tip
Interested in creating custom plugins? Learn how to develop your own in the <Link to="/docs/guides/writing-plugins">Writing Plugins guide</Link>.
:::

## IDE Plugins

These plugins integrate Vedro with popular Integrated Development Environments (IDEs), providing seamless workflows and a more user-friendly experience.

| Plugin                                                                                             | Description                                                                                                                | Info          |
|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|---------------|
| <Link to="https://plugins.jetbrains.com/plugin/18227-vedro">PyCharm Plugin</Link>                  | Integration with <Link to="https://www.jetbrains.com/pycharm/">PyCharm</Link> for easy scenario execution and debugging.   | Version 0.2.5 |
| <Link to="https://marketplace.visualstudio.com/items?itemName=vedro.vedro">VSCode Extension</Link> | Adds Vedro support to <Link to="https://code.visualstudio.com/">VSCode</Link>, allowing easy test runs and result viewing. | Version 0.1.1 |

## Core Plugins

Vedro comes with a rich set of built-in plugins that provide essential testing features. These plugins are designed to improve scenario management, reporting, and test execution, ensuring a flexible and robust testing experience.

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
    <Plugin key='dry-runner' name='DryRunner' pypi='vedro'
        desc='Simulates scenario execution without actually executing them'
    />
    <Plugin key='ensurer' name='Ensurer' pypi='vedro'
        desc='Adds configurable retry logic to functions and steps, including attempts, delay and exceptions to swallow'
    />
    <Plugin key='last-failed' name='LastFailed' pypi='vedro'
        desc='Runs only the previously failed scenarios'
    />
    <Plugin key='temp-keeper' name='TempKeeper' pypi='vedro'
        desc='Manages temporary directories and files'
    />
    <Plugin key='terminator' name='Terminator' pypi='vedro'
        desc='Handles test exit status based on test results and interruptions'
    />
</PluginList>

## Feedback

We are continuously working to improve Vedro and its ecosystem. If you have suggestions for new plugins or improvements to existing ones, please open an issue on our <Link to="https://github.com/vedro-universe/vedro">GitHub repository</Link> or reach out to us on <Link to="https://x.com/vedro_universe">Twitter</Link> with your ideas!
