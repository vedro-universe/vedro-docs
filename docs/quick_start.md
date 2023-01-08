---
id: quick-start
title: Quick Start
slug: quick-start
---
# Quick Start

## Installation

```shell
$ pip3 install vedro
```

## First Test

File `./scenarios/decode_base64_encoded_string.py`

import TerminalOutput from '../src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="requests" label="requests" default>

```python
import requests
import vedro

class Scenario(vedro.Scenario):
    subject = "decode base64 encoded string"

    def given(self):
        self.encoded = "YmFuYW5h"

    def when(self):
        self.response = requests.get(f"https://httpbin.org/base64/{self.encoded}")

    def then(self):
        assert self.response.text == "banana"
```

  </TabItem>
  <TabItem value="aiohttp" label="aiohttp">

```python
from aiohttp import ClientSession
import vedro

class Scenario(vedro.Scenario):
    subject = "decode base64 encoded string"

    def given(self):
        self.encoded = "YmFuYW5h"

    async def when(self):
        async with ClientSession() as session:
            self.response = await session.get(f"https://httpbin.org/base64/{self.encoded}")

    async def then(self):
        assert (await self.response.text()) == "banana"
```

  </TabItem>
</Tabs>

## Run

```shell
$ vedro run -vvv
```

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ decode base64 encoded string[0m[32m
[0m 
[38;5;249m# --seed 9d903d07-5e97-4a74-a60a-33a527bcc6d9[0m[38;5;249m
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.73s)[0m[34m
[0m
`}
</TerminalOutput>

:::tip

Install <a href='https://plugins.jetbrains.com/plugin/18227-vedro' target='_blank'>PyCharm plugin</a> to run scenarios in IDE

:::

