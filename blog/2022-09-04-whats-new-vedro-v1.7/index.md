---
slug: whats-new-vedro-v1.7
tags: [vedro, changelog]
hide_table_of_contents: false
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import SubscribeTip from '../_subscribe_for_updates.md';

# What's New in Vedro v1.7

We're excited to announce [Vedro v1.7](https://pypi.org/project/vedro/), our latest release. This update brings new features and important fixes to enhance your testing experience. Let's take a closer look at what's new.

<!--truncate-->

## New Features

### [Repeater] New Plugin Added

In our continuous effort to assist developers in creating robust and reliable tests, we've introduced the Repeater plugin in the core. The Repeater allows each test to be run N times, a feature that will help in detecting flaky tests early in the development process.

You can use the command line to set the number of repeats. Here's how you can do that:

```shell
$ vedro run --repeats 2
# or
$ vedro run -N 2
```

Here's a sample output demonstrating how tests are run twice using the Repeater:

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ create user[0m[32m
[0m │
 ├─[1/2] [32m✔ create user[0m[38;5;244m (0.20s)[0m[38;5;244m
[0m │
 ├─[2/2] [32m✔ create user[0m[38;5;244m (0.20s)[0m[38;5;244m
[0m 
 [32m✔ delete user[0m[32m
[0m │
 ├─[1/2] [32m✔ delete user[0m[38;5;244m (0.10s)[0m[38;5;244m
[0m │
 ├─[2/2] [32m✔ delete user[0m[38;5;244m (0.10s)[0m[38;5;244m
[0m 
 
[38;5;249m# --seed 1658e13e-2b3f-4f69-9132-cf8051ed018f
# repeated x2[0m[38;5;249m
[0m[1;32m# 2 scenarios, 2 passed, 0 failed, 0 skipped[0m[34m (0.40s)[0m[34m
[0m
`}
</TerminalOutput>

### [Rich Reporter] `show_skipped` Param Added

We've added a new `show_skipped` parameter to the Rich Reporter. By default, this parameter is set to `True`, allowing you to see the skipped tests in the report.

Here's a sample output showing the test report with skipped tests:

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ create user[0m[38;5;244m (0.20s)[0m[38;5;244m
[0m [32m✔ delete user[0m[38;5;244m (0.10s)[0m[38;5;244m
[0m [38;5;249m○ update user[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m 
[38;5;249m# --seed 3de2f365-bd1b-4eb0-8bc8-9f5432cabad5[0m[38;5;249m
[0m[1;32m# 3 scenarios, 2 passed, 0 failed, 1 skipped[0m[34m (0.30s)[0m[34m
[0m
`}
</TerminalOutput>

## Changes

### [PyCharm Reporter] `show_skipped` Default Altered

In alignment with the addition made to the Rich Reporter, we've also adjusted the `show_skipped` parameter in the PyCharm Reporter. It's now set to `True` by default, enabling visibility for skipped tests.

## Bug Fixes

### [Core] `@context` Decorator Fixed

We've addressed a bug related to the type of the `@context` decorator. The correction ensures the accuracy and proper functionality of the decorator.

### [Core] Deferrer and Artifacted Order Fixed

The registration order of the Deferrer and Artifacted plugins was found to be incorrect, which could have led to potential issues. We've corrected this in Vedro v1.7 to ensure smoother plugin operation.

---

<SubscribeTip />
