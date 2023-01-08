---
id: writing-plugins
title: Writing Plugins
slug: writing-plugins
---
# Writing Plugins

## Plugin Example

```python
# ./custom_plugin.py
from vedro.core import Dispatcher, Plugin, PluginConfig

class CustomPlugin(Plugin):
    def subscribe(self, dispatcher: Dispatcher) -> None:
        pass

class Custom(PluginConfig):
    plugin = CustomPlugin
```

## Register

```python
# ./vedro.cfg.py
import vedro
import custom_plugin

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class Custom(custom_plugin.Custom):
            enabled = True
```

## Examples

[vedro.io/plugins](/plugins)
