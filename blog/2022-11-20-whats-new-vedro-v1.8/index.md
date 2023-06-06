---
slug: whats-new-vedro-v1.8
tags: [vedro, changelog]
hide_table_of_contents: false
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SubscribeTelegramTip from '../_subscribe_telegram.md';

# What's New In Vedro v1.8

We are thrilled to announce the release of [Vedro v1.8](https://pypi.org/project/vedro/)! This update brings a host of new features and improvements to the framework, enhancing its capabilities and making it even more flexible and user-friendly. Let's delve into the latest features and see how they can improve your testing workflow.

<!--truncate-->

## New Features

### Introducing the Orderer Plugin

The Orderer plugin offers a new way to customize the execution order of scenarios. You can now run your scenarios in a stable (default), reversed, or random order. Each order type is easily set with a command-line argument.

<Tabs>
  <TabItem value="stable" label="Stable" default>

Stable order (default)

```shell
$ vedro run --order-stable
```

<TerminalOutput>
{`
Scenarios
[1m* sign in[0m[1m
[0m [32m✔ sign in via email[0m[32m
[0m [32m✔ sign in via social[0m[32m
[0m[1m* sign out[0m[1m
[0m [32m✔ sign out[0m[32m
[0m 
[38;5;249m# --seed 3b5eddda-928d-49fc-b76a-66a9c1a08b7e[0m[38;5;249m
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="reversed" label="Reversed" default>

Reversed order

```shell
$ vedro run --order-reversed
```

<TerminalOutput>
{`
Scenarios
[1m* sign out[0m[1m
[0m [32m✔ sign out[0m[32m
[0m[1m* sign in[0m[1m
[0m [32m✔ sign in via social[0m[32m
[0m [32m✔ sign in via email[0m[32m
[0m 
[38;5;249m# --seed b0b9be51-54bb-4365-9b24-f326fcf9aa43[0m[38;5;249m
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="random" label="Random" default>

Random order

```shell
$ vedro run --order-random
```

<TerminalOutput>
{`
Scenarios
[1m* sign in[0m[1m
[0m [32m✔ sign in via email[0m[32m
[0m[1m* sign out[0m[1m
[0m [32m✔ sign out[0m[32m
[0m[1m* sign in[0m[1m
[0m [32m✔ sign in via social[0m[32m
[0m 
[38;5;249m# --seed 9b1da7f5-579f-4add-abda-5a8342ca5a33[0m[38;5;249m
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
</Tabs>

By providing these different ordering options, the plugin adds an extra layer of flexibility to your testing workflow.

### DryRunner: Test Without Running

The DryRunner plugin allows for scenario execution without actually running them. This feature is useful when you want to validate complex selections or simply count the number of tests.

```shell
$ vedro run scenarios/sign_up/ \
  --tags SMOKE \
  --slicer-total 2 \
  --slicer-index 0 \
  --dry-run
```


### Conditional Scenario Skip with Skipper

Skipper introduces the `@skip_if` decorator, enabling you to skip scenarios based on certain conditions. This is useful when you have scenarios that only apply to specific environments or versions.

```python
import base64
import vedro
from sys import version_info


@vedro.skip_if(lambda: version_info < (3, 10))
class Scenario(vedro.Scenario):
    subject = "decode base32 encoded string"

    def given(self):
        self.encoded = b"EHINGT0="

    def when(self):
        self.original = base64.b32hexdecode(self.encoded)

    def then(self):
        assert self.original == b"text"
```

### Rich Reporter: Hiding Namespaces

The RichReporter now offers a `--hide-namespaces` parameter, allowing you to hide directory names in the output. This feature is particularly valuable when running scenarios in random order or across different directories. By hiding directory names, the output becomes cleaner and more focused, eliminating unnecessary clutter and enhancing readability.

<Tabs>
  <TabItem value="with_namespaces" label="Show Namespaces" default>

```shell
$ vedro run
```

<TerminalOutput>
{`
Scenarios
[1m* sign in[0m[1m
[0m [32m✔ sign in via email[0m[32m
[0m [32m✔ sign in via social[0m[32m
[0m[1m* sign out[0m[1m
[0m [32m✔ sign out[0m[32m
[0m 
[38;5;249m# --seed 644049b5-68b8-48c1-a083-b3d129fb6151[0m[38;5;249m
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="without_namespaces" label="Hide Namespaces">

```shell
$ vedro run --hide-namespaces
```

<TerminalOutput>
{`
Scenarios
 [32m✔ sign in via email[0m[32m
[0m [32m✔ sign in via social[0m[32m
[0m [32m✔ sign out[0m[32m
[0m 
[38;5;249m# --seed eee3dc4f-9b3c-4729-9c2b-085139b4a1a0[0m[38;5;249m
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
</Tabs>

### PyCharm Reporter: Silent Mode

The PyCharm Reporter now includes a `--pycharm-no-output` parameter, which suppresses console output. This is helpful when you're using the [PyCharm plugin](https://plugins.jetbrains.com/plugin/18227-vedro) with another reporter:

```shell
$ vedro run -r rich pycharm --pycharm-no-output --hide-namespaces
```

### Interrupter: Fail Fast

With v1.8, a short alias (`-f`) has been added for `--fail-fast`, making it quicker and easier to use this option.

```shell
$ vedro run -f
```

### Graceful Interruptions

Vedro now handles interruptions more gracefully. For example, if you hit `ctrl+c`, the interruption will be neatly displayed:

<TerminalOutput>
{`
Scenarios
[1m* sign in[0m[1m
[0m [32m✔ sign in via email[0m[32m
[0m [32m✔ sign in via social[0m[32m
[0m[1m* sign out[0m[1m
[0m [31m✗ sign out[0m[31m
[0m   [31m✗ when[0m[31m
[0m[31m╭─[0m[31m─────────────── [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m ────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/e2e/scenarios/sign_out/[0m[1;33msign_out.py[0m:[94m11[0m in [92mwhen[0m                     [31m│[0m
[31m│[0m                                                                    [31m│[0m
[31m│[0m   [2m 8 [0m[2m│   [0msubject = [33m"[0m[33msign out[0m[33m"[0m                                      [31m│[0m
[31m│[0m   [2m 9 [0m[2m│   [0m                                                          [31m│[0m
[31m│[0m   [2m10 [0m[2m│   [0m[94mdef[0m [92mwhen[0m([96mself[0m):                                           [31m│[0m
[31m│[0m [31m❱ [0m11 [2m│   │   [0m[96mself[0m.response = send_request()                        [31m│[0m
[31m│[0m   [2m12 [0m                                                              [31m│[0m
[31m╰────────────────────────────────────────────────────────────────────╯[0m
[1;91mKeyboardInterrupt[0m
 
 
[33m!!!                                      !!!
!!! Interrupted by “KeyboardInterrupt()“ !!!
!!!                                      !!![0m[33m
[0m[38;5;249m# --seed 2ce013fe-4ea4-40ac-ad9a-ecc73a142cb2[0m[38;5;249m
[0m[1;31m# 3 scenarios, 2 passed, 1 failed, 0 skipped[0m[34m (1.23s)[0m[34m
[0m
`}
</TerminalOutput>

---

<SubscribeTelegramTip />
