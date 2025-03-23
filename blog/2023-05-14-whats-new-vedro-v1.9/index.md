---
slug: whats-new-vedro-v1.9
tags: [vedro, changelog]
hide_table_of_contents: false
---

import Link from '@site/src/components/Link';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SubscribeTip from '../_subscribe_for_updates.md';

# What's New in Vedro v1.9

Greetings to all Vedro users. Today we are introducing <Link to="https://pypi.org/project/vedro/">Vedro v1.9</Link>, an update aimed at improving your testing experiences. This new version notably focuses on two primary improvements: the simplification of plugin management and the enhancement of reporting capabilities. Let's now examine this update in detail.

<!--truncate-->

## Simplifying Plugin Management

This update introduces a new command, that simplifies the process of managing plugins.

```shell
$ vedro plugin install vedro-gitlab-reporter
```

This command not only installs the plugin, but also enables it in your `vedro.cfg.py` file:

```python
import vedro
import vedro_gitlab_reporter

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class GitlabReporter(vedro_gitlab_reporter.GitlabReporter):
            enabled = True

```

To provide more insights into the plugin ecosystem, we've added another command:

```shell
$ vedro plugin top
```

This command shows you the most popular <Link to="/plugins">Vedro plugins</Link>:

<TerminalOutput>
{`
[38;5;244m┏━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━┓[0m
[38;5;244m┃[0m[1m [0m[1mPackage               [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mDescription                   [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mURL                                    [0m[1m [0m[38;5;244m┃[0m[1m [0m[1mPopularity[0m[1m [0m[38;5;244m┃[0m
[38;5;244m┡━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━┩[0m
[38;5;244m│[0m[34m [0m[34mvedro-gitlab-reporter [0m[34m [0m[38;5;244m│[0m GitLab reporter with           [38;5;244m│[0m pypi.org/project/vedro-gitlab-reporter  [38;5;244m│[0m       2728 [38;5;244m│[0m
[38;5;244m│[0m[34m                        [0m[38;5;244m│[0m collapsable sections           [38;5;244m│[0m                                         [38;5;244m│[0m            [38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mvedro-allure-reporter [0m[34m [0m[38;5;244m│[0m Allure reporter                [38;5;244m│[0m pypi.org/project/vedro-allure-reporter  [38;5;244m│[0m       2646 [38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mvedro-interactive     [0m[34m [0m[38;5;244m│[0m Interactive mode               [38;5;244m│[0m pypi.org/project/vedro-interactive      [38;5;244m│[0m        733 [38;5;244m│[0m
[38;5;244m│[0m[34m [0m[34mvedro-advanced-tags   [0m[34m [0m[38;5;244m│[0m Vedro tags with boolean logic  [38;5;244m│[0m pypi.org/project/vedro-advanced-tags    [38;5;244m│[0m        356 [38;5;244m│[0m
[38;5;244m└────────────────────────┴────────────────────────────────┴─────────────────────────────────────────┴────────────┘[0m
`}</TerminalOutput>

## Enhancing the Reporting Experience

We've made improvements to the reporting experience in this release. The RichReporter now displays execution time in a more user-friendly format:

<Tabs>
  <TabItem value="humanized_duration" label="Now" default>

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ register new user[0m[32m
[0m 
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (5m 3s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="duration" label="Then">

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ register new user[0m[32m
[0m 
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (303.47s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
</Tabs>

We also introduce a new parameter, `show_steps`, which displays steps even when the scenario is successful:

```python
class RichReporter(vedro.plugins.director.rich.RichReporter):
    show_steps = True
```

With `show_steps` enabled, your reports will be more detailed:

<Tabs>
  <TabItem value="with_steps" label="Show Steps" default>

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ register new user[0m[32m
[0m   [32m✔ given_creds[0m[32m
[0m   [32m✔ when_guest_registers[0m[32m
[0m   [32m✔ then_it_should_return_success_response[0m[32m
[0m   [32m✔ and_it_should_return_user_info[0m[32m
[0m 
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.70s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="without_steps" label="Hide Steps">

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ register new user[0m[32m
[0m 
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.70s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
</Tabs>

## Introducing Parameterized Scenario Decorators

Last but certainly not least, Vedro v1.9 brings the advantage of <Link to="https://peps.python.org/pep-0614/">Relaxed Grammar Restrictions On Decorators</Link>, allowing you to skip individual parameterized scenarios:

```python
import vedro
from vedro import params, skip

class Scenario(vedro.Scenario):
    subject = "login as {user}"

    @params("Bob")
    @params[skip]("Alice")
    def __init__(self, user):
        self.user = user
```

In this example, the scenario for the user "Alice" will be skipped, while the scenario for "Bob" will be executed.

---

That's all for the updates in this release! We hope these new features and improvements will make your testing experience even better.

<SubscribeTip />
