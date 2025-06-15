---
slug: whats-new-vedro-v1.11
tags: [vedro, changelog]
hide_table_of_contents: false
---

import Link from '@site/src/components/Link';
import TerminalOutput from '@site/src/components/TerminalOutput';
import SubscribeTip from '../_subscribe_for_updates.md';
import Screenshot from '@site/src/components/Screenshot';

# What's New in Vedro v1.11

<Link to="https://pypi.org/project/vedro/">Vedro v1.11</Link> brings exciting new features and improvements to streamline your testing process and enhance functionality. Let's take a look at what's new.

<!--truncate-->

## Automated Artifact Saving

Vedro now allows you to automatically save artifacts directly to the file system. This feature is particularly useful for preserving logs, screenshots, or any other data generated during tests.

```shell
$ vedro run --save-artifacts
```

By default, artifacts are saved in the `.vedro/artifacts` directory. However, you can specify a different location using the `--artifacts-dir` argument.

## Temp Keeper Plugin

Introducing the Temp Keeper plugin — a convenient tool for managing temporary directories and files. This feature simplifies the process of creating and handling temporary files and directories, essential for tests that require isolated environments.

```python
import vedro
from vedro import create_tmp_file, create_tmp_dir
from pathlib import Path

class Scenario(vedro.Scenario):

    def given_tmp_file(self):
        self.tmp_file: Path = create_tmp_file()
        self.tmp_file.write_text("Hello, World!")
```

## Bell Notification

Enhance your testing experience with the 'bell' feature, which triggers a sound at the end of the test execution to provide an audible notification of test completion.

```shell
$ vedro run --bell
```

Additionally, some terminals (like [iTerm2](https://iterm2.com/)) might display a notification when not in focus, alerting you to the test completion even if you're not currently looking at the terminal.

<Screenshot src={require('./notification.png')} width="350px" />

## Forbid Only Parameter

The `forbid_only` parameter ensures that no scenarios are inadvertently left in an exclusive testing state, which is especially useful in continuous integration environments.

```python
import vedro
import vedro.plugins.skipper as skipper
from vedro.config import env

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class Skipper(skipper.Skipper):
            enabled = True
            forbid_only = env.get("CI", False)
```

If `@vedro.only` is left in the code, it will trigger an exception, preventing accidental exclusions in your test suite.

## Fixed Seed Option

Vedro now supports a `--fixed-seed` option. By default, Vedro generates a unique seed for each rescheduled scenario (e.g., repeated via `--repeats` arg). With `--fixed-seed`, the same seed will be used when a scenario is run multiple times in the same execution.

```shell
$ vedro run --repeats 3 --fixed-seed
```

## Repeats Delay Control

Control the pacing of your tests with the new `--repeats-delay` option, which introduces a delay (in seconds) between repeated scenario executions.

```shell
$ vedro run --repeats 3 --repeats-delay 1.0
```

## Fail Fast On Repeat

The `--fail-fast-on-repeat` feature complements the existing <Link to="/docs/features/fail-fast">fail-fast</Link> functionality. This new option halts test executions at the first failure of a rescheduled scenario.

```shell
$ vedro run --repeats 3 --fail-fast-on-repeat
```

<TerminalOutput>
{`
Scenarios
[1m* register[0m[1m
[0m [31m✗ register user via email[0m[31m
[0m │
 ├─[1/2] [32m✔ register user via email[0m[32m
[0m │
 ├─[2/2] [31m✗ register user via email[0m[31m
 
[33m!!!                                                                                                   !!!
!!! Interrupted by “RepeaterExecutionInterrupted('Stop repeating scenarios after the first failure')“ !!!
!!!                                                                                                   !!![0m[33m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.12s)[0m[34m
[0m
`}
</TerminalOutput>

## No Scenarios Ok

By default, Vedro returns an [exit code](https://www.gnu.org/software/bash/manual/html_node/Exit-Status.html) of 0 even if no scenarios are run. The new `--no-scenarios-ok` argument changes this behavior, allowing you to determine if a successful exit code should be returned when no scenarios have been executed.

```shell
$ vedro run --ignore scenarios/ --no-scenarios-ok
$ echo $?
0
```

---

These updates in Vedro v1.11 are designed to enhance your testing capabilities, making it more efficient, flexible, and user-friendly. Enjoy the improved testing experience!

<SubscribeTip />
