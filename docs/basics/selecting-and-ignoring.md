---
id: selecting-and-ignoring
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@site/src/components/Link';

# Selecting & Ignoring

:::tip What's inside
* 🎯 Run only the scenarios you care about
* 🧹 Gently ignore which aren’t relevant right now
* 🧬 Target individual tests, even parameterized cases
:::

## Introduction

In day-to-day development, you often run just a subset of your test suite: a single scenario, a few files, or everything in just one directory. Vedro gives you multiple ways to precisely control what gets executed.

## Selecting Scenarios

To run specific files or directories, pass them to `vedro run`:

```shell
$ vedro run <file_or_dir>
```

Examples:

```shell
# Run all scenarios in a directory
$ vedro run scenarios/login/

# Run two individual files
$ vedro run scenarios/register/register_new_user.py \
            scenarios/login/login_as_registered_user.py
```

## Ignoring Scenarios

Use the `-i` or `--ignore` flag to exclude specific files or directories:

```shell
$ vedro run -i <file_or_dir>  # or --ignore
```

Example:

```shell
$ vedro run -i scenarios/logout/
```

Ignored scenarios are completely excluded from the run: they won’t be executed, shown in output, or counted in summary statistics. To skip a scenario (but still include it in the report), see the <Link to="/docs/features/skipping-scenarios" target="_blank">Skipping Scenarios</Link> guide.

## Combining Selection with Ignoring

You can combine file selection and ignore flags to run a group of scenarios while excluding specific ones:

```shell
$ vedro run scenarios/login/ \
         -i scenarios/login/try_to_login_as_nonexisting_user.py
```

This runs everything in `scenarios/login/`, except the file you explicitly ignored.

:::tip
Use `--dry-run` to preview which scenarios would be executed, without actually running them. Helpful when fine-tuning test selection.
:::

## Selecting One and Only Scenario

To run just one scenario, add the `@vedro.only` decorator:

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
import vedro

@vedro.only
class Scenario(vedro.Scenario):
    subject = "register new user"
    ...
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
from vedro import scenario, only

@scenario[only]()
def register_new_user():
    ...
```

  </TabItem>
</Tabs>

Then run:

```shell
$ vedro run
```

To guard against accidentally committing `@vedro.only`, enable `forbid_only` in CI using the Skipper plugin configuration:

<details>
  <summary>Show config...</summary>
  <div>

```python
import vedro.plugins.skipper
from os import environ as env

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class Skipper(vedro.plugins.skipper.Skipper):
            enabled = True
            # highlight-start
            forbid_only = env.get("CI", False)
            # highlight-end
```

This will raise an error if any scenario uses `@only`.

  </div>
</details>

## Selecting by Subject

To run scenarios by their subject line, use `--subject` followed by a string match:

```shell
$ vedro run --subject 'register new user'
```

All scenarios with a matching subject will be executed.

## Selecting a Parameterized Case

The easiest way to run a specific <Link to="/docs/features/parameterized-scenarios" target="_blank">parameterized</Link> scenario is through an IDE like
**<Link to="/docs/integrations/pycharm-plugin" target="_blank">PyCharm</Link>** or **<Link to="/docs/integrations/vscode-extension" target="_blank">VS Code</Link>**, which let you run individual cases directly from the UI.

If you're using the terminal, you can target a specific instance by appending `#<index>` to the scenario class:

```python
import vedro
from vedro import params

class Scenario(vedro.Scenario):
    subject = "{subject}"

    @params("get ok status", 200)
    @params("get not found status", 404)
    def __init__(self, subject, status):
        self.subject = subject
        self.status = status

    ...
```

Run the **first** case (`200 OK`):

```shell
$ vedro run scenarios/get_status.py::Scenario#1
```

Run the **second** (`404 Not Found`):

```shell
$ vedro run scenarios/get_status.py::Scenario#2
```

Indexing starts at **1**, and follows the **top-to-bottom order** of `@params` declarations: the natural order they appear in your code.

## The Big Picture

Every selection feature (whether it’s a path, subject, decorator, or parameter index) is just a **filter**.

Vedro starts with the full set of available scenarios and lets you narrow it down using rules:
- `vedro run <path>` → filter out everything **except** what’s in the specified path
- `--ignore <path>` → filter out **only** what’s in the specified path
- `--subject <intent>` → filter out all scenarios that **don’t match** this subject
- `@vedro.only` decorator → filter out **everything except** this scenario

Think of each tool as a way to define what to ignore, until only the scenarios you care about are left. Once you see it that way, combining filters becomes intuitive, predictable, and powerful.
