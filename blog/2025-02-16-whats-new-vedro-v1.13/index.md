---
slug: whats-new-vedro-v1.13
tags: [vedro, changelog]
hide_table_of_contents: false
---

import Link from '@site/src/components/Link';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SubscribeTip from '../_subscribe_for_updates.md';

# What's New in Vedro v1.13

<Link to="https://pypi.org/project/vedro/">Vedro v1.13</Link> introduces powerful new capabilities, making test execution more flexible, artifacts management more efficient, and plugin handling more intuitive. Let’s explore the key enhancements in this release.

<!--truncate-->

## 1. Custom Scenarios Directory

Previously, Vedro tests were restricted to the `scenarios/` directory. Now, you can run tests from any directory you specify. This provides greater flexibility for structuring test projects.

```shell
$ vedro run tests/
# or
$ vedro run scn/
```

Additionally, you can configure a default test directory in your configuration file:

```python
# vedro.cfg.py
import vedro

class Config(vedro.Config):
    default_scenarios_dir = "scn/"
```

## 2. Global Artifacts in ArtifactedPlugin

The `ArtifactedPlugin` now supports global artifacts that apply to the entire test run, making it easier to store and manage shared logs, reports, or other resources.

```python
from vedro import MemoryArtifact, attach_global_artifact

artifact = MemoryArtifact("run-log.txt", "text/plain", data)
attach_global_artifact(artifact)
```

This ensures that global artifacts are available alongside the final report without affecting scenario-specific artifacts.

## 3. Global Deferral Support in DeferrerPlugin

The `DeferrerPlugin` now allows functions to be deferred until after the entire test session. This is useful for cleanup tasks that should execute at the session’s end.

```python
from vedro import defer_global

defer_global(fn, *args, **kwargs)
```

Here are a couple of use cases:

- **a) Closing Shared Browser Instances**

    Defer browser cleanup for shared instances.

    ```python
    defer_global(browser.quit)
    ```

- **b) Closing Asynchronous HTTP Sessions:**

    Defer HTTP session cleanup for shared resources.

    ```python
    defer_global(http_session.close)
    ```

- **c) Destroying Singleton Objects:**

    Cleanup singleton resources at the session's end.

    ```python
    defer_global(singleton_instance.destroy)
    ```

## 4. New Slicing Strategy

The `Slicer` plugin now includes a `slicing_strategy` option for distributing test scenarios efficiently.

### Built-in Strategies

1. **RoundRobinSlicingStrategy** – Distributes scenarios evenly across workers using round-robin allocation.
2. **SkipAdjustedSlicingStrategy** *(default)* – Ensures fair workload distribution by accounting for skipped scenarios.

You can also define a custom slicing strategy by extending `BaseSlicingStrategy`:

```python
import vedro.plugins.slicer
from vedro.plugins.slicer import BaseSlicingStrategy


class CustomSlicingStrategy(BaseSlicingStrategy):
    def should_run(self, scenario, current_index) -> bool:
        return hash(scenario.unique_id) % self._total == self._index


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class Slicer(vedro.plugins.slicer.Slicer):
            enabled = True
            slicing_strategy = CustomSlicingStrategy
```

## 5. Plugin Dependency Management

Plugins can now explicitly define dependencies using the `depends_on` attribute. This ensures correct plugin loading sequences and eliminates ambiguity.

```python
# vedro.cfg.py
import vedro
from vedro import computed

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class PluginA(plugin_a.PluginA):
            enabled = True

        class PluginB(plugin_b.PluginB):
            enabled = True

            @computed
            def depends_on(cls):
                return [Config.Plugins.PluginA]
```

## Wrapping Up

Vedro v1.13 brings significant improvements to test execution flexibility, artifact management, and plugin configuration. With these enhancements, your test automation workflow is now more efficient and customizable than ever. Upgrade to Vedro v1.13 today and take advantage of these new features!

<SubscribeTip />
