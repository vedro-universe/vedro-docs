---
id: quick-start
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

:::tip What's inside
* ✅ Write and run your **first passing test**
* 🧠 Understand Vedro's three core concepts: **Scenarios**, **Contexts**, and **Effects**
* 👉 Know exactly **what to explore next**
:::

## Introduction

**Vedro** is a pragmatic testing framework that adapts to you, not the other way around. With plain Python assertions, flexible syntax styles, and a plugin-first architecture, Vedro makes testing enjoyable again.

This guide walks you through the essentials by example: no theory, no fluff, just the foundation you'll build real tests on.

## 1. Scenarios: The Heart of Vedro

At the core of Vedro is the **scenario**: a test written as a sequence of clearly defined steps that follow the well-known `Arrange–Act–Assert` pattern. This structure promotes both clarity and consistency across tests, making them easier to read and maintain.

- **Given** – Prepare the initial state and data (Arrange)
- **When** – Perform the primary action being tested (Act)
- **Then** – Verify the outcomes (Assert)

Every scenario starts with a **subject** : a short sentence that reflects the user's intention and clarifies what functionality is under test.

:::note Writing Styles
Pick the style that fits your needs:
- **Minimal**: Start writing tests immediately with zero ceremony
- **Structured**: Make tests self-documenting with context managers
- **Expressive**: Gain fine-grained control with class-based approach
:::

Let's write your very first test:

<Tabs groupId="test-style">
  <TabItem value="minimal" label="Minimal">

```python
# scenarios/create_file.py
from pathlib import Path as File
from vedro import scenario

@scenario()
def create_file():
    # Arrange
    file = File('example.txt')

    # Act
    file.touch()

    # Assert
    assert file.exists()
```

  </TabItem>
  <TabItem value="structured" label="Structured" default>

```python
# scenarios/create_file.py
from pathlib import Path as File
from vedro import scenario, given, when, then

@scenario()
def create_file():
    with given('new file'):
        file = File('example.txt')

    with when('creating file'):
        file.touch()

    with then('file should exist'):
        assert file.exists()
```

  </TabItem>
  <TabItem value="expressive" label="Expressive">

```python
# scenarios/create_file.py
from pathlib import Path as File
import vedro

class Scenario(vedro.Scenario):
    subject = 'create file'

    def given_new_file(self):
        self.file = File('example.txt')

    def when_creating_file(self):
        self.file.touch()

    def then_file_should_exist(self):
        assert self.file.exists()
```

  </TabItem>
</Tabs>

Here's what's happening:

- **Subject**: defines the intent (to create a file)
- **Given**: prepares a `File` pointing to `example.txt` (but doesn't create it yet)
- **When**: creates the file using `.touch()`
- **Then**: checks that the file now exists on disk

:::info
The `given`, `when`, and `then` names are purely for readability; Vedro doesn't assign any special meaning to them.
:::

Run your first scenario:

```sh
# Make sure you've installed Vedro first
$ pip install vedro

# Run all scenarios in the directory
$ vedro run scenarios/
```

And enjoy the output:

<Tabs>
  <TabItem value="passed-output" label="✅ Passed" default>

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ create file[0m[32m
[0m 
[37m# --seed a61d255d-721b-4aeb-9ecd-aedcf542cfb2[0m[37m
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="failed-output" label="❌ Failed">

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ create file[0m[31m
[0m   [32m✔ given new file[0m[32m
[0m   [32m✔ when creating file[0m[32m
[0m   [31m✗ then file should exist[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m─────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/app/scenarios/[0m[1;33mcreate_file.py[0m:[94m14[0m in [92mthen_file_should_exist[0m                   [31m│[0m
[31m│[0m                                                                              [31m│[0m
[31m│[0m   [2m11 [0m        [96mself[0m.file.touch()                                               [31m│[0m
[31m│[0m   [2m12 [0m                                                                        [31m│[0m
[31m│[0m   [2m13 [0m    [94mdef[0m[90m [0m[92mthen_file_should_exist[0m([96mself[0m):                                   [31m│[0m
[31m│[0m [31m❱ [0m14         [94massert[0m [1;4;96mself[0m[1;4m.file.exists()[0m                                       [31m│[0m
[31m│[0m   [2m15 [0m                                                                        [31m│[0m
[31m╰──────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mFileNotFoundError: [0m[1m[[0mErrno [1;36m2[0m[1m][0m No such file or directory: [32m'example.txt'[0m
 
[37m# --seed 9a9638f4-ffab-4c1b-b958-37a33f592d47[0m[37m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
</Tabs>

Simple, readable, and already passing. Vedro helps you start fast without sacrificing long-term maintainability.

That first green checkmark feels great, but writing tests is only half the story. To stay valuable, a test suite must remain maintainable, not become "write-only" code that's easier to rewrite than to debug. The next sections explain how contexts keep large test suites clean and scalable, and how effects help you focus on outcomes without cluttering your intent.

## 2. Contexts: Reusable Building Blocks

As soon as your tests go beyond trivial cases, you'll need to put the system into just the right state before the main action can happen. Repeating that setup again and again quickly leads to duplication and clutter.

**Contexts** in Vedro are an elegant way to avoid that. They let you define reusable prerequisites for scenarios, keeping tests modular and making your suite easier to scale as the project grows.

A context in Vedro is a plain Python function that prepares and returns whatever the scenario needs. This could be:
- Generating or fetching test data
- Preparing a system state (e.g., a logged-in user)
- Configuring mocks or stubs for external services
- Managing resources like files, network connections, or background processes

Let's extract the file setup from the previous scenario into a reusable context:

```python
# contexts/existing_file.py
import vedro
from pathlib import Path as File

@vedro.context
def existing_file(filename: str = 'example.txt') -> File:
    file = File(filename)
    file.touch()
    return file
```

:::info
Contexts are typically placed in a `contexts/` directory and decorated with `@context` to make their purpose clear: setting up test prerequisites.
:::

Now this context can be used in a more advanced scenario:

<Tabs groupId="test-style">
  <TabItem value="minimal" label="Minimal">

```python
from vedro import scenario
from contexts.existing_file import existing_file

@scenario()
def write_data_to_existing_file():
    # Arrange
    file = existing_file()

    # Act
    file.write_text('banana')

    # Assert
    assert file.read_text() == 'banana'
```

  </TabItem>
  <TabItem value="structured" label="Structured" default>

```python
from vedro import scenario, given, when, then
from contexts.existing_file import existing_file

@scenario()
def write_data_to_existing_file():
    with given('existing file'):
        file = existing_file()

    with when('writing data'):
        file.write_text('banana')

    with then('file should contain written data'):
        assert file.read_text() == 'banana'
```

  </TabItem>
  <TabItem value="expressive" label="Expressive">

```python
import vedro
from contexts.existing_file import existing_file

class Scenario(vedro.Scenario):
    subject = 'write data to existing file'

    def given_existing_file(self):
        self.file = existing_file()

    def when_writing_data(self):
        self.file.write_text('banana')

    def then_file_should_contain_written_data(self):
        assert self.file.read_text() == 'banana'
```

  </TabItem>
</Tabs>

Here, the `existing_file()` context takes care of the low-level plumbing. It ensures the file exists, then hands back a ready-to-use `File` object. This allows the scenario to stay laser-focused on what actually matters: writing and verifying the file content.

Unlike some frameworks that inject fixtures automagically, Vedro keeps things **explicit**. Contexts are called directly inside steps, keeping dependencies visible and under your control. And because contexts are just regular functions, they offer a lot of flexibility:
- **Customize** behavior by passing arguments
- **Adapt** to different test cases: happy paths, edge cases, or even failure scenarios
- **Reuse** across many scenarios to avoid duplication
- **Combine** with other contexts to build complex setups from simpler, focused pieces

Once defined, a context becomes a powerful, reusable building block, helping you write tests that are quick to write, easy to maintain, and scale naturally with your project. Just like good production code.

## 3. Effects: One Action, Many Outcomes

A key principle in Vedro is to build each scenario around **one primary action**.

This central action should reflect the scenario's subject and follow the `Arrange–Act–Assert` pattern introduced earlier: prepare the world, perform exactly one action, then verify the outcomes.

It's tempting to do more, chain multiple actions together in a single scenario. But that's a common pitfall. Scenarios like `Arrange → Act → Assert → Act → Assert` become harder to understand, debug, and maintain. Instead, keep each scenario centered on one action. If there's more to test, write another scenario.

However, that action may ripple through your system and produce several observable results: it might return a value, raise an error, publish a message to a queue, dispatch an email, or ping an external service. Vedro calls each of these outcomes an **effect**: something that can be observed and verified after the action is performed.

Because every effect is still rooted in the same action, it is perfectly reasonable to check them together inside the same scenario:

<Tabs groupId="test-style">
  <TabItem value="minimal" label="Minimal">

```python
from vedro import scenario
from contexts.existing_file import existing_file

@scenario()
def rename_existing_file():
    # Arrange
    original_file = existing_file('file.txt')

    # Act
    renamed_file = original_file.rename('new_file.txt')
    
    # Assert - multiple effects of the single action
    assert renamed_file.name == 'new_file.txt'
    assert renamed_file.exists()
    assert not original_file.exists()
```

  </TabItem>
  <TabItem value="structured" label="Structured" default>

```python
from vedro import scenario, given, when, then
from contexts.existing_file import existing_file

@scenario()
def rename_existing_file():
    with given('existing file'):
        original_file = existing_file('file.txt')

    with when('renaming file'):
        renamed_file = original_file.rename('new_file.txt')

    with then('renamed file should have correct name'):
        assert renamed_file.name == 'new_file.txt'

    with then('renamed file should exist'):
        assert renamed_file.exists()

    with then('original file should no longer exist'):
        assert not original_file.exists()
```

  </TabItem>
  <TabItem value="expressive" label="Expressive">

```python
import vedro
from contexts.existing_file import existing_file

class Scenario(vedro.Scenario):
    subject = 'rename existing file'

    def given_existing_file(self):
        self.original_file = existing_file('file.txt')

    def when_renaming_file(self):
        self.renamed_file = self.original_file.rename('new_file.txt')

    def then_renamed_file_should_have_correct_name(self):
        assert self.renamed_file.name == 'new_file.txt'

    def then_renamed_file_should_exist(self):
        assert self.renamed_file.exists()

    def then_original_file_should_no_longer_exist(self):
        assert not self.original_file.exists()
```

  </TabItem>
</Tabs>

Each assertion here focuses on a distinct but related aspect of the same action's outcome:
1. The file gets a new name
2. The renamed file exists on disk
3. The original file no longer exists

The scenario remains atomic. It tests just one thing (file renaming), while verifying all expected consequences of that action.

## Wrapping Up: Readable. Scalable. Pragmatic.

You've just built your first test suite with Vedro, from a single passing scenario to reusable contexts and rich, effect-driven assertions.

This flow wasn't accidental. It reflects Vedro's core design principles:
- **Readable**: Scenarios are easy to understand at a glance. The `Arrange–Act–Assert` structure, clear subject lines, and step names make intent obvious and reduce cognitive overhead.
- **Scalable**: Contexts and effects keep your suite organized as it grows. Modular setup logic and atomic tests reduce duplication and make refactoring safe and painless.
- **Pragmatic**: Vedro favors explicitness over magic. You stay in control of dependencies, state, and execution: writing plain Python, not bending to framework conventions.

## What's Next?

The core concepts are in place, so now it’s time to level up.

**Go Further**
- ✅ [Assertions & Reporting](/docs/basics/assertions-and-reporting) – Make better checks, understand results faster
- 🎯 [Selecting & Ignoring](/docs/basics/selecting-and-ignoring) – Run exactly the tests you care about

**Go Deeper**
- 📝 [Naming for Better Tests](/docs/best-practices/naming-for-better-tests) – Write clearer, more meaningful scenario and step names
