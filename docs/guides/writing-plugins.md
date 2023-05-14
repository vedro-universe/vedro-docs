---
id: writing-plugins
slug: writing-plugins
---
# Writing Plugins

Vedro is designed with an event-driven architecture, making it highly extensible and customizable. The event-based nature of Vedro plugins allows developers to tap into various points in the testing process and execute custom actions based on specific events.

In an event-driven system, components communicate with each other through events, which are essentially notifications that represent a change in the system's state or occurrence of an action. When an event occurs, any subscribed listener receives a notification and can react accordingly.

## Plugin Structure

A typical Vedro plugin consists of a class that inherits from `Plugin` and implements the `subscribe` method. This method takes a `Dispatcher` as an argument and registers the plugin's event listeners.

Here's an example of a basic plugin structure:

```python
# ./custom_plugin.py
from vedro.core import Dispatcher, Plugin, PluginConfig


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        pass


class Custom(PluginConfig):
    plugin = CustomPlugin

```

## Registering the Plugin

To enable the custom plugin in your Vedro application, you need to add it to the `vedro.cfg.py` configuration file:

```python
# ./vedro.cfg.py
import vedro
import custom_plugin


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class Custom(custom_plugin.Custom):
            enabled = True

```

## Plugin Lifecycle

Vedro plugins can listen to various events that occur during the test execution lifecycle. The following diagram shows the sequence of events:

```
              ConfigLoadedEvent
                      |
                ArgParseEvent
                      |
                ArgParsedEvent
                      |
                 StartupEvent
                     / \
ScenarioSkippedEvent     ScenarioRunEvent
         |                       |
         |                 StepRunEvent
         |                      / \
         |      StepPassedEvent     StepFailedEvent
         |             |                   |
         |  ScenarioPassedEvent     ScenarioFailedEvent
          \                     \ /
           \                     /
            \                   /
            ScenarioReportedEvent
                      |
                CleanupEvent
```

## Listening to Events

To make your plugin listen to specific events, you need to implement the appropriate event listeners within the `subscribe` method. The following sections provide examples for each event.

### ConfigLoadedEvent

The `ConfigLoadedEvent` is triggered when the configuration is loaded. You can use this event to access the loaded configuration.

```python
from vedro.core import Dispatcher, Plugin, PluginConfig, ConfigType
from vedro.events import ConfigLoadedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ConfigLoadedEvent, self.on_config_loaded)

    def on_config_loaded(self, event: ConfigLoadedEvent) -> None:
        config: ConfigType = event.config
        print("config", config)

```

### ArgParseEvent

The `ArgParseEvent` is fired when command-line arguments are being parsed. Use this event to add custom command-line arguments to your plugin.

```python
from argparse import ArgumentParser
from vedro.core import Dispatcher, Plugin
from vedro.events import ArgParseEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ArgParseEvent, self.on_arg_parse)

    def on_arg_parse(self, event: ArgParseEvent) -> None:
        arg_parser: ArgumentParser = event.arg_parser
        arg_parser.add_argument("-c", "--custom", help="custom arg")
        print("on_arg_parse", arg_parser)

```

### ArgParsedEvent

The `ArgParsedEvent` occurs after command-line arguments have been parsed. Use this event to access the parsed arguments.

```python
from argparse import ArgumentParser, Namespace
from vedro.core import Dispatcher, Plugin
from vedro.events import ArgParseEvent, ArgParsedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ArgParseEvent, self.on_arg_parse) \
                  .listen(ArgParsedEvent, self.on_arg_parsed)

    def on_arg_parse(self, event: ArgParseEvent) -> None:
        arg_parser: ArgumentParser = event.arg_parser
        arg_parser.add_argument("-c", "--custom", help="custom arg")
        print("on_arg_parse", arg_parser)

    def on_arg_parsed(self, event: ArgParsedEvent) -> None:
        args: Namespace = event.args
        print("on_arg_parsed", args.custom)

```

### StartupEvent

The `StartupEvent` is triggered at the beginning of the test execution. Use this event to perform any required setup or initialization.

```python
from typing import List
from vedro.core import Dispatcher, Plugin, VirtualScenario
from vedro.events import StartupEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(StartupEvent, self.on_startup)

    def on_startup(self, event: StartupEvent) -> None:
        scenarios: List[VirtualScenario] = event.scenarios
        print("on_startup", scenarios)

```

### ScenarioSkippedEvent

The `ScenarioSkippedEvent` is fired when a scenario is skipped. Use this event to perform any required actions when a scenario is skipped.

```python
from vedro.core import Dispatcher, Plugin, ScenarioResult
from vedro.events import ScenarioSkippedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ScenarioSkippedEvent, self.on_scenario_skipped)

    def on_scenario_skipped(self, event: ScenarioSkippedEvent) -> None:
        scenario_result: ScenarioResult = event.scenario_result
        print("on_scenario_skipped", scenario_result)

```

### ScenarioRunEvent

The `ScenarioRunEvent` is triggered when a scenario starts running. Use this event to perform any required actions when a scenario starts.

```python
from vedro.core import Dispatcher, Plugin, ScenarioResult
from vedro.events import ScenarioRunEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ScenarioRunEvent, self.on_scenario_run)

    def on_scenario_run(self, event: ScenarioRunEvent) -> None:
        scenario_result: ScenarioResult = event.scenario_result
        print("on_scenario_run", scenario_result)

```

### ScenarioPassedEvent

The `ScenarioPassedEvent` is fired when a scenario passes. Use this event to perform any required actions when a scenario passes.

```python
from vedro.core import Dispatcher, Plugin, ScenarioResult
from vedro.events import ScenarioPassedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ScenarioPassedEvent, self.on_scenario_passed)

    def on_scenario_passed(self, event: ScenarioPassedEvent) -> None:
        scenario_result: ScenarioResult = event.scenario_result
        print("on_scenario_passed", scenario_result)

```

### ScenarioFailedEvent

The `ScenarioFailedEvent` is triggered when a scenario fails. Use this event to perform any required actions when a scenario fails.

```python
from vedro.core import Dispatcher, Plugin, ScenarioResult
from vedro.events import ScenarioFailedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ScenarioFailedEvent, self.on_scenario_failed)

    def on_scenario_failed(self, event: ScenarioFailedEvent) -> None:
        scenario_result: ScenarioResult = event.scenario_result
        print("on_scenario_failed", scenario_result)

```

### StepRunEvent

The `StepRunEvent` is fired when a step starts running. Use this event to perform any required actions when a step starts.

```python
from vedro.core import Dispatcher, Plugin, StepResult
from vedro.events import StepRunEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(StepRunEvent, self.on_step_run)

    def on_step_run(self, event: StepRunEvent) -> None:
        step_result: StepResult = event.step_result
        print("on_step_run", step_result)

```

### StepPassedEvent

The `StepPassedEvent` is triggered when a step passes. Use this event to perform any required actions when a step passes.

```python
from vedro.core import Dispatcher, Plugin, StepResult
from vedro.events import StepPassedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(StepPassedEvent, self.on_step_passed)

    def on_step_passed(self, event: StepPassedEvent) -> None:
        step_result: StepResult = event.step_result
        print("on_step_passed", step_result)

```

### StepFailedEvent

The `StepFailedEvent` is fired when a step fails. Use this event to perform any required actions when a step fails.

```python
from vedro.core import Dispatcher, Plugin, StepResult
from vedro.events import StepFailedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(StepFailedEvent, self.on_step_failed)

    def on_step_failed(self, event: StepFailedEvent) -> None:
        step_result: StepResult = event.step_result
        print("on_step_failed", step_result)

```

### ScenarioReportedEvent

The `ScenarioReported` event is triggered after each individual scenario has ended. This event occurs regardless of whether the scenario passed, failed, or was skipped. It provides a `AggregatedResult` object, which contains the results of the scenario that has just completed.

```python
from vedro.core import Dispatcher, Plugin, AggregatedResult
from vedro.events import ScenarioReportedEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(ScenarioReportedEvent, self.on_scenario_reported)

    def on_scenario_reported(self, event: ScenarioReportedEvent) -> None:
        aggregated_result: AggregatedResult = event.aggregated_result
        print("aggregated_result", aggregated_result)

```

### CleanupEvent

The `CleanupEvent` is triggered at the end of the test execution. Use this event to perform any required cleanup or finalization.

```python
from vedro.core import Dispatcher, Plugin, Report
from vedro.events import CleanupEvent


class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        dispatcher.listen(CleanupEvent, self.on_cleanup)

    def on_cleanup(self, event: CleanupEvent) -> None:
        report: Report = event.report
        print("on_cleanup", report)

```

## Conclusion

In this documentation, we've covered the basics of writing plugins for Vedro. By understanding the plugin structure, registering the plugin, and listening to various events in the test execution lifecycle, you can extend and customize Vedro to suit your specific needs.

For more inspiration and examples of plugins, visit the [vedro.io/plugins](/plugins) page.
