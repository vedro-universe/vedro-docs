---
id: scenario-status
---
# Scenario Status

import Link from '@site/src/components/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

The `ScenarioStatus` enumeration provides a set of possible states for `ScenarioResult`, indicating the current status of a test scenario. 

```python
from enum import Enum

class ScenarioStatus(Enum):
    PENDING = "PENDING"
    PASSED = "PASSED"
    FAILED = "FAILED"
    SKIPPED = "SKIPPED"
```

- **PENDING**: Indicates the scenario is queued and waiting for execution.
- **PASSED**: Signifies the scenario has completed successfully, with all assertions validated.
- **FAILED**: Marks the scenario as unsuccessful due to failed assertions or unexpected errors.
- **SKIPPED**: Represents scenarios that are deliberately not executed, for instance, scenarios <Link to="/docs/features/skipping-scenarios" target="_blank">marked</Link> with `@vedro.skip`.

:::info Note
The statuses `PASSED`, `FAILED`, and `SKIPPED` are final. Once a `ScenarioResult` is assigned one of these statuses, it cannot change.
:::

## Usage Examples

These examples demonstrate how to use the `ScenarioStatus` enum in Vedro plugins during different stages of the test execution lifecycle.

<Tabs>
  <TabItem value="pending" label="PENDING" default>

```python
from vedro.core import Dispatcher, Plugin, ScenarioStatus
from vedro.events import ScenarioRunEvent

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher):
        dispatcher.listen(ScenarioRunEvent, self.on_scenario_run)

    # highlight-start
    def on_scenario_run(self, event: ScenarioRunEvent):
        assert event.scenario_result.status == ScenarioStatus.PENDING
    # highlight-end
```

  </TabItem>
  <TabItem value="passed" label="PASSED">

```python
from vedro.core import Dispatcher, Plugin, ScenarioStatus
from vedro.events import ScenarioPassedEvent

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher):
        dispatcher.listen(ScenarioPassedEvent, self.on_scenario_passed)

    # highlight-start
    def on_scenario_passed(self, event: ScenarioPassedEvent):
        assert event.scenario_result.status == ScenarioStatus.PASSED
    # highlight-end
```

  </TabItem>
  <TabItem value="failed" label="FAILED">

```python
from vedro.core import Dispatcher, Plugin, ScenarioStatus
from vedro.events import ScenarioFailedEvent

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher):
        dispatcher.listen(ScenarioFailedEvent, self.on_scenario_failed)

    # highlight-start
    def on_scenario_failed(self, event: ScenarioFailedEvent):
        assert event.scenario_result.status == ScenarioStatus.FAILED
    # highlight-end
```

  </TabItem>
  <TabItem value="skipped" label="SKIPPED">

```python
from vedro.core import Dispatcher, Plugin, ScenarioStatus
from vedro.events import ScenarioSkippedEvent

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher):
        dispatcher.listen(ScenarioSkippedEvent, self.on_scenario_skipped)

    # highlight-start
    def on_scenario_skipped(self, event: ScenarioSkippedEvent):
        assert event.scenario_result.status == ScenarioStatus.SKIPPED
    # highlight-end
```

  </TabItem>
</Tabs>
