---
id: assertions-and-reporting
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Assertions & Reporting

:::tip What's inside
* ✅ Write clear assertions using plain Python’s **`assert`**
* 🔍 Explore rich output: diffs, timings, paths, and full structure comparisons
* 🧯 Catch and verify exceptions explicitly with **`catched()`**
:::

## Introduction

**Assertions** describe what _should happen_. **Reporting** shows what _actually happened_.

Together, they form the feedback loop that makes tests valuable: you write a check, run the test, and instantly see whether the test passed, failed, or was skipped, providing just enough detail to fix what’s wrong or move on with confidence.

## Assertions: Plain Python, No Surprises

In Vedro, you write assertions using Python’s built-in `assert` statement: no new syntax, no learning curve. Just the assert you already know, used exactly as you expect.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
import vedro

class Scenario(vedro.Scenario):
    subject = 'greet user'

    def when_greeting_user(self):
        self.greeting = greet_user('Alice')

    def then_greeting_should_be_correct(self):
        # highlight-start
        assert self.greeting == 'Hello Alice, welcome back!'
        # highlight-end
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
from vedro import scenario, given, when, then

@scenario()
def greet_user():
    with when('greeting user'):
        greeting = greet_user('Alice')

    with then('greeting should be correct'):
        # highlight-start
        assert greeting == 'Hello Alice, welcome back!'
        # highlight-end
```

  </TabItem>
</Tabs>

When an assertion fails, you receive immediate, precise feedback with a clean, colorized diff that highlights the difference between expected and actual values:

<TerminalOutput>
{`
[0m [31m✗ greet user[0m[31m
[0m   [32m✔ when greeting user[0m[32m
[0m   [31m✗ then greeting should be correct[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m─────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/app/scenarios/[0m[1;33mgreet_user.py[0m:[94m14[0m in [92mthen_greeting_should_be_correct[0m           [31m│[0m
[31m│[0m                                                                              [31m│[0m
[31m│[0m   [2m11 [0m        [96mself[0m.greeting = greet_user([33m'[0m[33mAlice[0m[33m'[0m)                             [31m│[0m
[31m│[0m   [2m12 [0m                                                                        [31m│[0m
[31m│[0m   [2m13 [0m    [94mdef[0m[90m [0m[92mthen_greeting_should_be_correct[0m([96mself[0m):                          [31m│[0m
[31m│[0m [31m❱ [0m14         [1;4;94massert[0m[1;4m [0m[1;4;96mself[0m[1;4m.greeting == [0m[1;4;33m'[0m[1;4;33mHello Alice, welcome back![0m[1;4;33m'[0m            [31m│[0m
[31m│[0m   [2m15 [0m                                                                        [31m│[0m
[31m╰──────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [32m- 'H[0m[30;42mello[0m[32m Alice, welcome[0m[30;42m back[0m[32m!'[0m
    [31m+ 'H[0m[30;41mi[0m[31m Alice, welcome!'[0m
[0m
`}
</TerminalOutput>

No guesswork. No extra logging. Just the information you need, right when you need it.

### Use Any Assertion You Need

Vedro gives you the full power of Python. Use any operator or expression to craft exactly the assertion you need — whether you're comparing values, checking membership, or verifying custom logic.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
import vedro

class Scenario(vedro.Scenario):
    subject = 'search user'

    def when_searching_for_user(self):
        self.result = search_users('Bob')

    def then_user_should_be_in_result(self):
        # highlight-start
        assert 'Bob' in self.result
        # highlight-end
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
from vedro import scenario, given, when, then

@scenario()
def search_user():
    with when('searching for user'):
        result = search_users('Bob')

    with then('user should be in result'):
        # highlight-start
        assert 'Bob' in result
        # highlight-end
```

  </TabItem>
</Tabs>

Failures are reported clearly and with helpful context:

<TerminalOutput>
{`
[0m [31m✗ search user[0m[31m
[0m   [32m✔ when searching for user[0m[32m
[0m   [31m✗ then user should be in result[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m─────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/app/scenarios/[0m[1;33mgreet_user.py[0m:[94m14[0m in [92mthen_user_should_be_in_result[0m             [31m│[0m
[31m│[0m                                                                              [31m│[0m
[31m│[0m   [2m11 [0m        [96mself[0m.result = search_users([33m'[0m[33mBob[0m[33m'[0m)                               [31m│[0m
[31m│[0m   [2m12 [0m                                                                        [31m│[0m
[31m│[0m   [2m13 [0m    [94mdef[0m[90m [0m[92mthen_user_should_be_in_result[0m([96mself[0m):                            [31m│[0m
[31m│[0m [31m❱ [0m14         [1;4;94massert[0m[1;4m [0m[1;4;33m'[0m[1;4;33mBob[0m[1;4;33m'[0m[1;4m [0m[1;4;95min[0m[1;4m [0m[1;4;96mself[0m[1;4m.result[0m                                     [31m│[0m
[31m│[0m   [2m15 [0m                                                                        [31m│[0m
[31m╰──────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mmember[0m[1m in [0m[1;32mcontainer[0m
    [31m'Bob'[0m
    [32m['Alice', 'Charlie'][0m
[0m
`}
</TerminalOutput>

### Custom Messages in Assertions?

Python supports custom messages in assertions:

```python
assert user.id == 42, "Expected user ID to be 42"
```

This works in Vedro too — but most of the time, it’s unnecessary.

With descriptive step names, structured output, and clear diffs, you already get all the context you need when something fails. Adding messages often duplicates information or leads to less readable code.

You also avoid the common trap of writing inverted logic like:

```python
assert not error_occurred, "An error occurred"
```

Instead, focus on writing clean, direct checks:

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
def then_user_should_have_correct_id(self):
    assert user.id == 42
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
with then('user should have correct id'):
    assert user.id == 42
```

  </TabItem>
</Tabs>

This keeps your scenarios readable, and Vedro's reporter will make sure you still see exactly what went wrong.

### Testing Exceptions Explicitly

Following Python’s principle that «Explicit is better than implicit», Vedro provides a simple, explicit way to capture and verify exceptions using the `catched()` context manager:

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
import vedro
from vedro import catched

class Scenario(vedro.Scenario):
    subject = 'divide by zero'

    def when_dividing_by_zero(self):
        with catched(Exception) as self.exc_info:
            1 / 0

    def then_exception_should_be_raised(self):
        assert self.exc_info.type is ZeroDivisionError
        assert str(self.exc_info.value) == 'division by zero'
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
from vedro import scenario, when, then, catched

@scenario()
def divide_by_zero():
    with when('dividing by zero'):
        with catched(Exception) as exc_info:
            1 / 0

    with then('exception should be raised'):
        assert exc_info.type is ZeroDivisionError
        assert str(exc_info.value) == 'division by zero'
```

  </TabItem>
</Tabs>

The `catched()` block captures the exception, and it’s up to you to assert its type and message. This keeps tests honest, readable, and fully under your control.

:::tip
Learn more in the [Testing Exceptions](https://vedro.io/docs/guides/testing-exceptions) guide.
:::

## Reporting: Readable and Customizable

By default, Vedro uses the **RichReporter** — a powerful, highly customizable reporter that adds structure, color, and metadata to your test output.

### Show Timings

Curious how long each test takes to run? You can enable timing output to display how much time is spent in each scenario.

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

To include step-level timings, combine it with `--show-steps`. This is useful for profiling slow steps or understanding bottlenecks in longer flows:

```shell
$ vedro run --show-timings --show-steps
```

<TerminalOutput>
{`
[0mScenarios
[1m* auth / login[0m[1m
[0m [32m✔ login as registered user[0m[38;5;244m (0.36s)[0m[38;5;244m
[0m   [32m✔ given user[0m[38;5;244m (0.19s)[0m[38;5;244m
[0m   [32m✔ when user logs in[0m[38;5;244m (0.18s)[0m[38;5;244m
[0m   [32m✔ then it should return success response[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m   [32m✔ and it should return created token[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m 
[0m[1;32m# 1 scenarios, 1 passed, 0 failed, 0 skipped[0m[34m (0.36s)[0m[34m
[0m
`}
</TerminalOutput>

Running all tests with `--show-steps` gives you more than just verbose output, it’s a form of living documentation. Each step describes the behavior being tested in clear, structured language. Use it to validate test coverage, onboard new team members, or even review product behavior during CI runs.

### Show Paths

Want to trace exactly where each scenario is defined? Vedro always shows file paths for failed scenarios, but you can show paths for all scenarios using `--show-paths`.

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

Output:

<TerminalOutput>
{`
[0mScenarios
[1m* auth / login[0m[1m
[0m [32m✔ login as registered user[0m[32m
[0m   [38;5;244m> scenarios/auth/login/login_as_registered_user.py:5[0m[38;5;244m
[0m [32m✔ try to login as nonexisting user[0m[32m
[0m   [38;5;244m> scenarios/auth/login/try_to_login_as_nonexisting_user.py:8[0m[38;5;244m
[0m [32m✔ try to login with incorrect password[0m[32m
[0m   [38;5;244m> scenarios/auth/login/try_to_login_with_incorrect_password.py:9[0m[38;5;244m
[0m 
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.81s)[0m[34m
[0m
`}
</TerminalOutput>

### Show Full Diff

By default, Vedro trims assertion diffs to highlight just the changed lines, enough to catch most issues at a glance.

But sometimes, especially with large dictionaries or deeply nested objects, you want to see the full picture. For that, use the `--show-full-diff` flag:

```shell
$ vedro run --show-full-diff
```

<Tabs>
  <TabItem value="diff-default" label="Default Diff" default>

<TerminalOutput>
{`
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [38;5;244m          {[0m
    [32m-             'task_id': [0m[30;42m1[0m[32m,[0m
    [31m+             'task_id': [0m[30;41m2[0m[31m,[0m
    [38;5;244m              'description': 'Implement user authentication system',[0m
    [38;5;244m...[0m
    [38;5;244m              'assignee': 'Bob',[0m
    [32m-             'due_date': '2024-07-1[0m[30;42m4[0m[32m'[0m
    [31m+             'due_date': '2024-07-1[0m[30;41m5[0m[31m'[0m
    [38;5;244m          }[0m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="diff-full" label="Full Diff">

<TerminalOutput>
{`
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [38;5;244m  {[0m
    [38;5;244m      'total': 1,[0m
    [38;5;244m      'items': [[0m
    [38;5;244m          {[0m
    [32m-             'task_id': [0m[30;42m1[0m[32m,[0m
    [31m+             'task_id': [0m[30;41m2[0m[31m,[0m
    [38;5;244m              'description': 'Implement user authentication system',[0m
    [38;5;244m              'status': 'in progress',[0m
    [38;5;244m              'assignee': 'Bob',[0m
    [32m-             'due_date': '2024-07-1[0m[30;42m4[0m[32m'[0m
    [31m+             'due_date': '2024-07-1[0m[30;41m5[0m[31m'[0m
    [38;5;244m          }[0m
    [38;5;244m      ][0m
    [38;5;244m  }[0m
[0m
`}
</TerminalOutput>

  </TabItem>
</Tabs>
