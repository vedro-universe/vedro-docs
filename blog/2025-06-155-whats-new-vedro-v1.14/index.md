---
slug: whats-new-vedro-v1.14
tags: [vedro, changelog]
hide_table_of_contents: false
---

import Link from '@site/src/components/Link';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SubscribeTip from '../_subscribe_for_updates.md';


# What's New in Vedro v1.14

<Link to="https://pypi.org/project/vedro/">Vedro v1.14</Link> marks a notable step forward with a clean syntax addition and improved configuration capabilities, making scenario authoring and execution even smoother. Let’s dive into the highlights of this release.

<!--truncate-->

## Function-Based Scenarios (Now Built-In!)

With v1.14, Vedro natively supports **function-based scenarios**, offering an alternative to the traditional class-based syntax. This makes writing simple scenarios faster and more concise:

```python
import base64
from vedro import scenario, given, when, then

@scenario()
def decode_base64_encoded_str():
    with given:
        encoded = "YmFuYW5h"

    with when:
        decoded = base64.b64decode(encoded)

    with then:
        assert decoded == b"banana"
```

Function-based and class-based scenarios can live **side-by-side** in the same test suite. Choose whichever style best fits your context.

> Previously, this functionality was available via the [`vedro-fn`](https://pypi.org/project/vedro-fn/) plugin. Starting with v1.14, it's now part of the core! Users on earlier versions can continue using `vedro-fn` for backward compatibility.

## Default Reporters in Config

Managing test output just got easier. You can now define **default reporters** directly in your `vedro.cfg.py` configuration file:

```python
import vedro.plugins.director

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class Director(vedro.plugins.director.Director):
            enabled = True
            default_reporters = ["rich", "xunit"]
```

Once set, these reporters will be used automatically when you run:

```shell
$ vedro run
```

No need to specify them on the command line each time. This simplifies repeated test runs, especially in CI environments.

<SubscribeTip />
