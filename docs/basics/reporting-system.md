---
id: reporting-system
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reporting System

Reporting is a crucial aspect of any testing or development framework. Vedro provides a rich and flexible reporting system to help engineers track and understand the results of their scenarios.

By default, Vedro uses RichReporter, which offers a powerful, customizable, and intuitive interface.

## A Look into the RichReporter

To make the most of the RichReporter's capabilities, you can customize various settings either in the configuration file or directly on the command line during test execution.

### Show Timings

Test execution time is often a crucial metric in software testing. The RichReporter allows you to easily include timing information for each scenario and step by setting `show_timings` in your configuration file. Alternatively, you can specify this in the command line.

<Tabs>
  <TabItem value="command_line" label="Command Line" default>

```shell
$ vedro run --show-timings
```

  </TabItem>
  <TabItem value="config_file" label="Config File">

```python
# ./vedro.cfg.py
import vedro
import vedro.plugins.director.rich as rich_reporter


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class RichReporter(rich_reporter.RichReporter):
            enabled = True
            # highlight-start
            show_timings = True
            # highlight-end
```

  </TabItem>
</Tabs>

Output:

<TerminalOutput>
{`
[0mScenarios
[1m* auth / login[0m[1m
[0m [32m✔ login as registered user[0m[38;5;244m (0.21s)[0m[38;5;244m
[0m [32m✔ try to login as nonexisting user[0m[38;5;244m (0.11s)[0m[38;5;244m
[0m [32m✔ try to login with incorrect password[0m[38;5;244m (0.22s)[0m[38;5;244m
[0m 
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.53s)[0m[34m
[0m
`}
</TerminalOutput>

Moreover, you can pair this with `--show-steps` to show timings for individual test steps as follows:

```shell
$ vedro run --show-timings --show-steps
```

Output:

<TerminalOutput>
{`
[0mScenarios
[1m* auth / login[0m[1m
[0m [32m✔ login as registered user[0m[38;5;244m (0.36s)[0m[38;5;244m
[0m   [32m✔ given_user[0m[38;5;244m (0.19s)[0m[38;5;244m
[0m   [32m✔ when_user_logs_in[0m[38;5;244m (0.18s)[0m[38;5;244m
[0m   [32m✔ then_it_should_return_success_response[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m   [32m✔ and_it_should_return_created_token[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m 
[0m[1;32m# 1 scenarios, 1 passed, 0 failed, 0 skipped[0m[34m (0.36s)[0m[34m
[0m
`}
</TerminalOutput>

### Show Paths

At times, it might be necessary to know the paths of the executed scenarios. With RichReporter, you can enable `show_paths` either in your configuration or directly on the command line.

<Tabs>
  <TabItem value="command_line" label="Command Line" default>

```shell
$ vedro run --show-paths
```

  </TabItem>
  <TabItem value="config_file" label="Config File">

```python
# ./vedro.cfg.py
import vedro
import vedro.plugins.director.rich as rich_reporter


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class RichReporter(rich_reporter.RichReporter):
            enabled = True
            # highlight-start
            show_paths = True
            # highlight-end
```

  </TabItem>
</Tabs>

<TerminalOutput>
{`
[0mScenarios
[1m* auth / login[0m[1m
[0m [32m✔ login as registered user[0m[32m
[0m   [38;5;244m> scenarios/auth/login/login_as_registered_user.py[0m[38;5;244m
[0m [32m✔ try to login as nonexisting user[0m[32m
[0m   [38;5;244m> scenarios/auth/login/try_to_login_as_nonexisting_user.py[0m[38;5;244m
[0m [32m✔ try to login with incorrect password[0m[32m
[0m   [38;5;244m> scenarios/auth/login/try_to_login_with_incorrect_password.py[0m[38;5;244m
[0m 
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.81s)[0m[34m
[0m
`}
</TerminalOutput>

### Show Scenario Spinner

Additionally, RichReporter provides a feature to display a spinner for the scenario currently being executed. This feature can be activated by setting `show_scenario_spinner` in your configuration or specifying it in the command line.

<Tabs>
  <TabItem value="command_line" label="Command Line" default>

```shell
$ vedro run --show-scenario-spinner
```

  </TabItem>
  <TabItem value="config_file" label="Config File">

```python
# ./vedro.cfg.py
import vedro
import vedro.plugins.director.rich as rich_reporter


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class RichReporter(rich_reporter.RichReporter):
            enabled = True
            # highlight-start
            show_scenario_spinner = True
            # highlight-end
```

  </TabItem>
</Tabs>

<!-- :::info
This is just a sampling of the many configuration options available in RichReporter. For a comprehensive list, please visit the [RichReporter options](./rich-options) page.
::: -->

## Leveraging Multiple Reporters

Vedro facilitates the simultaneous use of multiple reporters. In fact, it encourages you to use multiple reporters concurrently to benefit from the unique strengths of each.

```shell
$ vedro run -r (--reporters) reporter1 reporter2 ...
```

For example, to use both RichReporter and [AllureReporter](/docs/integrations/allure-reporter), the command would be:

```shell
$ vedro run -r rich allure
```

Additionally, Vedro includes a 'silent' reporter option, which, as the name implies, allows tests to run without generating any terminal output:

```shell
$ vedro run -r silent
```
