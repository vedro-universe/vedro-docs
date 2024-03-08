---
id: step-status
---
# Step Status

import Link from '@site/src/components/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

The `StepStatus` enumeration is designed to represent the possible states of a `StepResult`, indicating the current status of an individual test step within a scenario.

```python
from enum import Enum

class StepStatus(Enum):
    PENDING = "PENDING"
    PASSED = "PASSED"
    FAILED = "FAILED"
```

- **PENDING**: Indicates the step is awaiting execution.
- **PASSED**: Signifies the step has completed successfully.
- **FAILED**: Marks the step as unsuccessful due to an assertion failure or an unexpected error.

Unlike <Link to="/docs/core/scenario-status">scenarios</Link>, steps do not have a SKIPPED status because skipping is managed at the scenario level, affecting all steps within that scenario.

:::info Note
The `PASSED` and `FAILED` statuses are final for a `StepResult`. Once assigned, these statuses cannot change.
:::

## Usage Examples

The following examples demonstrate how to use the `StepStatus` enumeration in Vedro plugins during different step execution phases within a testing scenario.

<Tabs>
  <TabItem value="pending" label="PENDING" default>

```python
from vedro.core import Dispatcher, Plugin, StepStatus
from vedro.events import StepRunEvent

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(StepRunEvent, self.on_step_run)

    def on_step_run(self, event: StepRunEvent) -> None:
        assert event.step_result.status == StepStatus.PENDING
```

  </TabItem>
  <TabItem value="passed" label="PASSED">

```python
from vedro.core import Dispatcher, Plugin, StepStatus
from vedro.events import StepPassedEvent

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(StepPassedEvent, self.on_step_passed)

    def on_step_passed(self, event: StepPassedEvent) -> None:
        assert event.step_result.status == StepStatus.PASSED
```

  </TabItem>
  <TabItem value="failed" label="FAILED">

```python
from vedro.core import Dispatcher, Plugin, StepStatus
from vedro.events import StepFailedEvent

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(StepFailedEvent, self.on_step_failed)

    def on_step_failed(self, event: StepFailedEvent) -> None:
        assert event.step_result.status == StepStatus.FAILED
```

  </TabItem>
</Tabs>
