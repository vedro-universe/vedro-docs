---
slug: whats-new-vedro-v1.10
tags: [vedro, changelog]
hide_table_of_contents: false
---

import Link from '@site/src/components/Link';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SubscribeTip from '../_subscribe_for_updates.md';

# What's New in Vedro v1.10

<Link to="https://pypi.org/project/vedro/">Vedro v1.10</Link> is here, introducing a host of powerful features and improvements designed to enhance your testing experience and speed up your development cycle. Let's dive in!

<!--truncate-->

## Last Failed: Run Previously Failed Scenarios

One of the most time-consuming aspects of testing is troubleshooting and fixing failed scenarios. With the new `--last-failed` argument, you can now save valuable time by running only the previously failed scenarios. No more need to rerun the entire test suite or manually select the failed tests. Just run the following command:

```shell
$ vedro run --last-failed
```

## Fail After Count: Stop Testing After N Failures

In continuous integration pipelines or large test suites, detecting and resolving issues early is crucial. The `--fail-after-count=N` argument allows you to stop the testing process after a certain number of failures. Simply specify the failure count:

```shell
$ vedro run --fail-after-count=10
```

## Show Skip Reason: Transparency for Skipped Scenarios

In some cases, tests are intentionally skipped due to known bugs or other reasons. The new `show_skip_reason` parameter in the RichReporter class provides transparency about why a test has been skipped. This parameter is set to `True` by default.

Here's an example of how to use it:

```python
import vedro

@vedro.skip(reason="Bug #123 prevents this scenario from passing")
class Scenario(vedro.Scenario):
    subject = "register user"
```

After running your tests, the reason for the skipped scenario will be displayed, making it easier to understand the test status:

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ login as user[0m[32m
[0m [38;5;249m○ register user[0m[38;5;249m
[0m   [38;5;244m|> Bug #123 prevents this scenario from passing[0m[38;5;244m
[0m 
[0m[1;32m# 2 scenarios, 1 passed, 0 failed, 1 skipped[0m[34m (0.11s)[0m[34m
[0m
`}
</TerminalOutput>


## Catched: Handling Raised Exceptions in Tests

Vedro v1.10 introduces the `catched()` function that allows tests to handle raised exceptions. This feature is particularly useful for testing edge cases and exception handling in your code.

Here's an example:

```python
import vedro
from vedro import catched

class Scenario(vedro.Scenario):
    subject = "divide by zero"

    def when(self):
        with catched(Exception) as self.exc_info:
            1 / 0

    def then(self):
        assert self.exc_info.type is ZeroDivisionError
```

## Logic Tag Matcher: Advanced Tag Filtering

The Tagger plugin now supports the use of <Link to="https://en.wikipedia.org/wiki/Boolean_algebra">Boolean logic</Link> when specifying tags. This enhancement provides greater flexibility and control in executing scenarios based on certain criteria.

For instance, if you want to run scenarios that either include the `API` or `UI` tag but do not include the `P0` tag, you can use:

```shell
$ vedro run --tags "(API or UI) and (not P0)"
```

---

The release of Vedro v1.10 underscores our ongoing commitment to streamline your testing workflow and increase transparency.

<SubscribeTip />
