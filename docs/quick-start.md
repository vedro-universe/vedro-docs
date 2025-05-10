---
id: quick-start
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@site/src/components/Link';

# Quick Start

This guide will take you from zero to a passing test in just a few steps. Along the way, you'll learn Vedro’s three core concepts: **Scenarios**, **Contexts**, and **Effects**. Together, they help you write tests that are readable, scalable, and pragmatic.

Let’s explore each concept with practical examples.

## 1. Scenarios: The Heart of Vedro

At the core of Vedro is the **scenario** — a test written as a sequence of clearly defined steps that follow the well-known `Arrange–Act–Assert` pattern. This structure promotes both clarity and consistency across tests, making them easier to read and maintain.

- **Given** – Prepare the initial state and data (Arrange)
- **When** – Perform the primary action being tested (Act)
- **Then** – Verify the outcomes (Assert)

Every scenario starts with a **subject**  — a short sentence that reflects the user's intention and clarifies what functionality is under test.

:::note Writing Styles
- **Class-Based** — perfect for rich end-to-end flows; typically one scenario per file.
- **Function-Based** — compact and great for unit-level checks; pack many small scenarios in one file.
:::

Let’s write your very first test:

```python
# scenarios/create_file.py
from pathlib import Path as File
import vedro

class Scenario(vedro.Scenario):
    subject = "create file"

    def given_new_file(self):
        self.file = File("example.txt")

    def when_creating_file(self):
        self.file.touch()

    def then_file_should_exist(self):
        assert self.file.exists()
```

Here’s what’s happening:

- **Subject**: defines the intent — to create a file
- **Given**: prepares a `File` pointing to `example.txt` (but doesn’t create it yet)
- **When**: creates the file using `.touch()`
- **Then**: checks that the file now exists on disk

:::info
The `given`, `when`, and `then` names are purely for readability; Vedro doesn’t assign any special meaning to them.
:::

Run your first scenario:

```sh
# Make sure you’ve installed Vedro first
$ pip install vedro

# Run all scenarios in the directory
$ vedro run scenarios/
```

And enjoy the output:

```
Scenarios
* 
 ✔ create file
 
# --seed 9d903d07-5e97-4a74-a60a-33a527bcc6d9
# 1 scenario, 1 passed, 0 failed, 0 skipped (0.00s)
```

Simple, readable, and already passing. Vedro helps you start fast without sacrificing long-term maintainability.

That first green checkmark feels great, but writing tests is only half the story. To stay valuable, a test suite must remain maintainable, not become "write-only" code that’s easier to rewrite than to debug. The next sections explain how contexts keep large test suites clean and scalable, and how effects help you focus on outcomes without cluttering your intent.

## 2. Contexts: Reusable Building Blocks

As soon as your tests go beyond trivial cases, you'll need to put the system into just the right state before the main action can happen. Repeating that setup again and again quickly leads to duplication and clutter.

**Contexts** in Vedro are an elegant way to avoid that. They let you define reusable prerequisites for scenarios, keeping tests modular and making your suite easier to scale as the project grows.

A context in Vedro is a plain Python function that prepares and returns whatever the scenario needs. This could be:
- Generating or fetching test data
- Preparing a system state (e.g., a logged-in user)
- Configuring mocks or stubs for external services
- Managing resources like files, network connections, or background processes

Let’s extract the file setup from the previous scenario into a reusable context:
```python
# contexts/existing_path.py
import vedro
from pathlib import Path

@vedro.context
def existing_path(filename: str = "example.txt") -> Path:
    path = Path(filename)
    path.touch()
    return path
```

:::info
Contexts are typically placed in a `contexts/` directory and decorated with `@context` to make their purpose clear: setting up test prerequisites.
:::

Now this context can be used in a more advanced scenario:

```python
import vedro
from contexts.existing_path import existing_path

class Scenario(vedro.Scenario):
    subject = "write data to existing file"

    def given_existing_file(self):
        self.path = existing_path()

    def when_writing_data(self):
        self.path.write_text("data")

    def then_file_should_contain_written_data(self):
        assert self.path.read_text() == "data"
```

Here, the `existing_path()` context takes care of the low-level plumbing. It ensures the file exists, then hands back a ready-to-use `Path` object. This allows the scenario to stay laser-focused on what actually matters: writing and verifying the file content.

Unlike some frameworks that inject fixtures automagically, Vedro keeps things **explicit**. Contexts are called directly inside steps, keeping dependencies visible and under your control. And because contexts are just regular functions, they offer a lot of flexibility:
- **Customize** behavior by passing arguments
- **Adapt** to different test cases: happy paths, edge cases, or even failure scenarios
- **Reuse** across many scenarios to avoid duplication
- **Combine** with other contexts to build complex setups from simpler, focused pieces

Once defined, a context becomes a powerful, reusable building block, helping you write tests that are quick to write, easy to maintain, and scale naturally with your project. Just like good production code.

## 3. Effects: One Action, Many Outcomes

A key principle in Vedro is to build each scenario around **one primary action**.

This central action should reflect the scenario's subject and follow the `Arrange–Act–Assert` pattern introduced earlier: prepare the world, perform exactly one action, then verify the outcomes.

It’s tempting to do more, chain multiple actions together in a single scenario. But that’s a common pitfall. Scenarios like `Arrange → Act → Assert → Act → Assert` become harder to understand, debug, and maintain. Instead, keep each scenario centered on one action. If there's more to test, write another scenario.

However, that action may ripple through your system and produce several observable results: it might return a value, raise an error, publish a message to a queue, dispatch an email, or ping an external service. Vedro calls each of these outcomes an **effect** — something that can be observed and verified after the action is performed.

Because every effect is still rooted in the same action, it is perfectly reasonable to check them together inside the same scenario:

```python
import vedro
from contexts.existing_file import existing_file

class Scenario(vedro.Scenario):
    subject = "rename existing file"

    def given_existing_file(self):
        self.original_file = existing_file("file.txt")

    def when_renaming_file(self):
        self.renamed_file = self.original_file.rename("new_file.txt")

    def then_renamed_file_should_have_correct_name(self):
        assert self.new_file.name == "new_file.txt"

    def and_renamed_file_should_exist(self):
        assert self.new_file.exists()

    def but_original_file_should_no_longer_exist(self):
        assert not self.original_file.exists()
```

Each assertion here focuses on a distinct but related aspect of the same action's outcome:
1. The file gets a new name
2. The renamed file exists on disk
3. The original file no longer exists

The scenario remains atomic. It tests just one thing: file renaming, while verifying all expected consequences of that action.
