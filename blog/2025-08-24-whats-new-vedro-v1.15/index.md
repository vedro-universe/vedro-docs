---
slug: whats-new-vedro-v1.15
tags: [vedro, changelog]
hide_table_of_contents: false
---

import Link from '@site/src/components/Link';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SubscribeTip from '../_subscribe_for_updates.md';

# What's New in Vedro v1.15

<Link to="https://pypi.org/project/vedro/">Vedro v1.15</Link> brings cleaner scenario authoring, powerful reusable assertions, and richer reporting. Plus a handful of QoL (Quality of Life) upgrades that make everyday testing smoother.

<!--truncate-->

## Enhanced Scenario Decorator (Subject & Tags)

The `@scenario` decorator now supports custom subjects and inline tag assignment, making test organization more flexible and intuitive:

```python
from vedro import scenario

@scenario("create user")
def _():
    ...
```

Attach tags inline:

```python
from vedro import scenario

@scenario("update user", tags={"API"})
def _():
    ...
```

## New `@effect` Decorator for Reusable Assertions

Introduce reusable test logic with the new `@effect` decorator, perfect for complex test suites with common validation patterns:

```python
# ./effects/dir_was_created.py
from vedro import effect

@effect
def dir_was_created(d: Path):
    assert d.exists(), f"Directory not found: {d}"
    assert d.is_dir(), f"Path exists but is not a directory: {d}"
```

Use it in scenarios just like a tiny test helper:

```python
# ./scenarios/export_user_data.py
from vedro import scenario, given, when, then
from effects.dir_was_created import dir_was_created

@scenario("export user data")
def _():
    with given:
        export_dir = Path("/tmp/user_exports")

    with when:
        # ... export logic ...

    with then:
        assert dir_was_created(export_dir)
```

## Per-Scenario Seed Configuration (`@seed`) + Shorter Seed Format

Gain precise control over randomness at the scenario level:

<Tabs groupId="test-style">
  <TabItem value="structured" label="Structured" default>

```python
from vedro import scenario, seed

@scenario[seed("value-123")]
def create_user():
    ...
```

  </TabItem>
  <TabItem value="expressive" label="Expressive">

```python
import vedro
from vedro import seed

@seed("value-123")
class Scenario(vedro.Scenario):
    subject = "create user"
```

  </TabItem>
</Tabs>

Vedro v1.15 also adopts a more readable seed style:

<TerminalOutput>
{`
[38;5;249m# --seed rdx3-36ep6-2ijo[0m[38;5;249m
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

## Output Capture (stdout/stderr)

Capture and display stdout/stderr from scenarios and steps with the new `--capture-output` (`-C`) flag:

```shell
$ vedro run --capture-output
```

Tune visibility in `RichReporter`:

```python
class RichReporter(rich_reporter.RichReporter):
    show_captured_output: bool = True
    show_captured_output_limit: int = 40  # Character limit for displayed output
```

## Pre-run Preamble (Discovery Stats & Seed)

See what’s about to run before it runs:
- Discovered scenarios
- Scheduled to run
- Skipped (if any)

<TerminalOutput>
{`
[38;5;249m>> running: 2 of 6 scenarios (1 skipped, 3 ignored)[0m[38;5;249m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ create user[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m ...
`}
</TerminalOutput>

Toggle via config:

```python
class RichReporter(rich_reporter.RichReporter):
    show_discovery_stats: bool = False
```

Prefer seeing the seed upfront (not just at the end)? Enable the seed preamble:

```python
class Seeder(seeder.Seeder):
    show_seed_preamble: bool = True
```

External plugins can add their own preamble sections to surface critical info early.

## Paths With Line Numbers

`--show-paths` now includes line numbers:

<TerminalOutput>
{`
[1;37m$ vedro run --show-paths[0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ update user[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m   [38;5;244m|> scenarios/update_user.py:5[0m[38;5;244m
[0m 
[38;5;249m# --seed 35ee-zgkjp-wlgo[0m[38;5;249m
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

:::info
Many terminals/IDEs support cmd/ctrl+click to jump straight to the definition.
:::

Even better, you can run by line:

```shell
$ vedro run scenarios/update_user.py:5
```

## Simpler Worker Slicing (`--slice N/M`)

No more pairing two flags, pick a single slice with one arg:

```shell
Slicer:
  --slicer-total SLICER_TOTAL    Total number of workers
  --slicer-index SLICER_INDEX    Index of the current worker (zero based)
  --slice N/M                    Specify slice as <index>/<total> (index starts at 1).
                                 Mutually exclusive with the two flags above.
```

Example:

```shell
$ vedro run --slice 2/5
```

## Color Output Control

Turn off ANSI colors if your environment/CI prefers plain text:

```shell
$ vedro run --no-color
```

Or via config:
```python
class RichReporter(rich_reporter.RichReporter):
    no_color: bool = True
```

## JSON Reporter (Machine-Readable Events)

A new `JsonReporter` streams structured events: perfect for IDE integrations, AI agents, MCP, or custom dashboards:

```shell
$ vedro run -r json
```

Sample event (formatted):
```json
{
    "event": "scenario_reported",
    "timestamp": 1758743760292,
    "scenario": {
        "id": "scenarios/export_user_data.py::export_user_data",
        "subject": "export user data",
        "path": "/app/scenarios/export_user_data.py",
        "lineno": 6,
        "status": "FAILED",
        "elapsed": 0,
        "skip_reason": null
    },
    "steps": [
        {"name": "given", "status": "PASSED", "elapsed": 0, "error": null},
        {"name": "when", "status": "PASSED", "elapsed": 0, "error": null},
        {
            "name": "then ",
            "status": "FAILED",
            "elapsed": 0,
            "error": {
                "type": "AssertionError",
                "message": "Directory not found: /tmp/user_exports",
                "file": "/app/effects/dir_was_created.py",
                "lineno": 8
            }
        }
    ]
}
```

<SubscribeTip />
