---
id: using-plugins
toc_max_heading_level: 2
---

import TerminalOutput from '@site/src/components/TerminalOutput';

# Using Plugins

In the software development sphere, the saying "*Explicit is better than implicit*" frequently echoes amongst Python developers. This idea, taken from the [The Zen of Python](https://peps.python.org/pep-0020/) — a collection of guiding principles for writing computer programs — champions clarity, simplicity, and above all, explicitness. It suggests that code should be written in such a way that its function and intent are clear to the reader. The Vedro framework takes this principle to heart in its approach to plugin configuration.

## Explicit Configuration

In most frameworks or libraries, enabling a plugin is often a matter of simply installing it. The framework then implicitly imports and uses the plugin. While this approach may seem convenient, it can also lead to unintended consequences. For instance, a plugin might conflict with existing code, or its function may not be immediately apparent to someone reading the code.

Vedro, on the other hand, takes a different approach — one that is rooted in the Pythonic principle of explicitness. In Vedro, to enable a plugin, you need to explicitly configure it in your `vedro.cfg.py` file. This means you have to intentionally activate each plugin, specifying its use and underlining its role in your codebase.

For instance, after installing the [vedro-allure-reporter](https://pypi.org/project/vedro-valera-validator/) plugin:

```shell
pip3 install vedro_allure_reporter
```

You can configure it in your Vedro configuration file as follows:

```python
import vedro_allure_reporter
import vedro

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class AllureReporter(vedro_allure_reporter.AllureReporter):
            enabled = True
```

## The Benefits of Explicit Plugin Configuration

By explicitly configuring each plugin, you enjoy the following benefits:

1. **Clarity**: There's no ambiguity about which plugins are enabled and how they're configured.
2. **Control**: You have direct control over which plugins are being used and their configuration.
3. **Avoidance of Conflicts**: By having explicit control, you can prevent potential conflicts that can arise from automatic imports.
4. **Simplicity**: Despite seeming like an extra step, explicit configuration simplifies the process by removing implicit behavior.

## The Power of Python in Vedro Configuration

Vedro leverages Python for its configuration files. This offers a set of key benefits:

1. **Python Native**: No need to learn additional configuration formats such as INI or TOML. Python is all you need.
2. **Strict Typing**: You can utilize strict typing for plugin parameters, which helps avoid errors that can occur from incorrect configuration.
3. **Easy Exploration**: By explicitly importing each plugin, you can easily explore its capabilities. For example, you can navigate to the AllureReporter plugin's definition to understand its exposed parameters and default settings:

```python
class AllureReporter(PluginConfig):
    plugin = AllureReporterPlugin

    # Set directory for Allure reports
    report_dir: Path = Path("./allure_reports")

    # Attach tags to Allure report
    attach_tags: bool = True

    # Attach artifacts to Allure report
    attach_artifacts: bool = True
```

In this example, you can see the default settings of the AllureReporter plugin. You can modify these parameters in your `vedro.cfg.py` file based on your requirements.

## Using the Vedro Plugin Manager

However, when you're initializing a new project, it may become tedious to enable all of your favorite plugins one by one. Recognizing this, we've [introduced a built-in plugin manager](/blog/whats-new-vedro-v1.9) within Vedro. The plugin manager allows you to easily install multiple plugins with a single command while preserving the explicitness we've come to appreciate.

Consider the following command:

```shell
$ vedro plugin install vedro-valera-validator \
                       vedro-allure-reporter
```

With this command, Vedro not only installs the specified plugins, but it also automatically enables them in your `vedro.cfg.py` file:

```python
import vedro_allure_reporter
import vedro_valera_validator
import vedro

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class ValeraValidator(vedro_valera_validator.ValeraValidator):
            enabled = True

        class AllureReporter(vedro_allure_reporter.AllureReporter):
            enabled = True
```

This approach eliminates the need for repetitive and monotonous actions, such as installing and then manually enabling each plugin in your Vedro configuration file. Yet, it still preserves the explicitness of configuration. 

By enabling plugins this way, you still have the clarity of what plugins are enabled in your project. Also, you retain the power to modify, add, or remove the plugins from your configuration file manually at any point.

In essence, by incorporating the plugin manager into Vedro, we've managed to synergize the strengths of both implicit and explicit configurations. We've increased convenience and streamlined the plugin setup process while still retaining the clarity, control, and explicitness of manual configuration. This way, we've successfully eliminated the disadvantages of both approaches. 

## Enhanced Features of the Vedro Plugin Manager

In addition to setting plugins, the Vedro plugin manager boasts several other useful features to enhance your development workflow.

### Top Plugins

Are you unsure which plugins might be beneficial for your project, or simply curious about what's popular in the [Vedro community](/plugins)? The plugin manager includes a command to display the most popular plugins, which can be helpful in discovering new tools or solutions:

```shell
$ vedro plugin top
```

This command will output a list of the top plugins along with a brief description, ordered by their popularity:

<TerminalOutput>
{`
[38;5;244m┏━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━┓[0m
[38;5;244m┃[0m[1m [0m[1mPackage               [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mDescription                            [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mURL                                    [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mPopularity[0m[1m [0m[38;5;244m┃[0m
[38;5;244m┡━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━┩[0m
[38;5;244m│[0m[34m [0m[34mvedro-allure-reporter [0m[34m [0m[38;5;244m│[0m Allure reporter for Vedro framework     [38;5;244m│[0m pypi.org/project/vedro-allure-reporter  [38;5;244m│[0m       2677 [38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mvedro-gitlab-reporter [0m[34m [0m[38;5;244m│[0m GitLab reporter with collapsable        [38;5;244m│[0m pypi.org/project/vedro-gitlab-reporter  [38;5;244m│[0m       2671 [38;5;244m│[0m
[38;5;244m│[0m[34m                        [0m[38;5;244m│[0m sections for Vedro framework            [38;5;244m│[0m                                         [38;5;244m│[0m            [38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mvedro-valera-validator[0m[34m [0m[38;5;244m│[0m Validator for Vedro framework           [38;5;244m│[0m pypi.org/project/vedro-valera-validator [38;5;244m│[0m       2053 [38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mvedro-interactive     [0m[34m [0m[38;5;244m│[0m Interactive mode for Vedro framework    [38;5;244m│[0m pypi.org/project/vedro-interactive      [38;5;244m│[0m        640 [38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mvedro-advanced-tags   [0m[34m [0m[38;5;244m│[0m Vedro tags with boolean logic           [38;5;244m│[0m pypi.org/project/vedro-advanced-tags    [38;5;244m│[0m        357 [38;5;244m│[0m
[38;5;244m└────────────────────────┴─────────────────────────────────────────┴─────────────────────────────────────────┴────────────┘[0m
`}
</TerminalOutput>

This is a great way to stay updated with the latest and most widely-used plugins in the Vedro ecosystem.

### Installed Plugins

As your project grows, it's possible that you'll install and use numerous plugins, which can become difficult to manage or keep track of. Luckily, the Vedro plugin manager provides a simple command to list all installed plugins, along with their status (enabled or disabled):

```shell
vedro plugin list
```

Running this command will yield a list of all installed plugins in your project, along with their status:

<TerminalOutput>
{`
[38;5;244m┏━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┓[0m
[38;5;244m┃[0m[1m [0m[1mName             [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mPackage                    [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mDescription                                      [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mVersion[0m[1m [0m[38;5;244m┃[0m[1m [0m[1mEnabled[0m[1m [0m[38;5;244m┃[0m
[38;5;244m┡━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━┩[0m
[38;5;244m│[0m[34m [0m[34mRichReporter     [0m[34m [0m[38;5;244m│[0m[34m [0m[34mvedro.plugins.director.rich[0m[34m [0m[38;5;244m│[0m[34m [0m[34mEnhanced, customizable scenario reporting with   [0m[34m [0m[38;5;244m│[0m[34m [0m[34m1.9.0  [0m[34m [0m[38;5;244m│[0m[34m [0m[34mTrue   [0m[34m [0m[38;5;244m│[0m
[38;5;244m│[0m[34m                   [0m[38;5;244m│[0m[34m                             [0m[38;5;244m│[0m[34m [0m[34mrich output                                      [0m[34m [0m[38;5;244m│[0m[34m         [0m[38;5;244m│[0m[34m         [0m[38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mOrderer          [0m[34m [0m[38;5;244m│[0m[34m [0m[34mvedro.plugins.orderer      [0m[34m [0m[38;5;244m│[0m[34m [0m[34mConfigures the execution order of scenarios      [0m[34m [0m[38;5;244m│[0m[34m [0m[34m1.9.0  [0m[34m [0m[38;5;244m│[0m[34m [0m[34mTrue   [0m[34m [0m[38;5;244m│[0m
[38;5;244m│[0m[38;5;249m [0m[38;5;249mTagger           [0m[38;5;249m [0m[38;5;244m│[0m[38;5;249m [0m[38;5;249mvedro.plugins.tagger       [0m[38;5;249m [0m[38;5;244m│[0m[38;5;249m [0m[38;5;249mAllows scenarios to be selectively run based on  [0m[38;5;249m [0m[38;5;244m│[0m[38;5;249m [0m[38;5;249m1.9.0  [0m[38;5;249m [0m[38;5;244m│[0m[38;5;249m [0m[38;5;249mFalse  [0m[38;5;249m [0m[38;5;244m│[0m
[38;5;244m│[0m[38;5;249m                   [0m[38;5;244m│[0m[38;5;249m                             [0m[38;5;244m│[0m[38;5;249m [0m[38;5;249muser-defined tags                                [0m[38;5;249m [0m[38;5;244m│[0m[38;5;249m         [0m[38;5;244m│[0m[38;5;249m         [0m[38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mDryRunner        [0m[34m [0m[38;5;244m│[0m[34m [0m[34mvedro.plugins.dry_runner   [0m[34m [0m[38;5;244m│[0m[34m [0m[34mSimulates scenario execution without actually    [0m[34m [0m[38;5;244m│[0m[34m [0m[34m1.9.0  [0m[34m [0m[38;5;244m│[0m[34m [0m[34mTrue   [0m[34m [0m[38;5;244m│[0m
[38;5;244m│[0m[34m                   [0m[38;5;244m│[0m[34m                             [0m[38;5;244m│[0m[34m [0m[34mexecuting them                                   [0m[34m [0m[38;5;244m│[0m[34m         [0m[38;5;244m│[0m[34m         [0m[38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mVedroAdvancedTags[0m[34m [0m[38;5;244m│[0m[34m [0m[34mvedro_advanced_tags        [0m[34m [0m[38;5;244m│[0m[34m [0m[34mVedro tags with boolean logic                    [0m[34m [0m[38;5;244m│[0m[34m [0m[34m0.1.0  [0m[34m [0m[38;5;244m│[0m[34m [0m[34mTrue   [0m[34m [0m[38;5;244m│[0m
[38;5;244m└───────────────────┴─────────────────────────────┴───────────────────────────────────────────────────┴─────────┴─────────┘[0m
`}
</TerminalOutput>

These features make the Vedro plugin manager not just a tool for installing and configuring plugins, but also an efficient system for managing and exploring them. With Vedro, you're always in control and can quickly adapt to the demands of your project, thanks to its explicit, yet convenient, design.
