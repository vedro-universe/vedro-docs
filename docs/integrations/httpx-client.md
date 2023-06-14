---
id: httpx-client
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTTPX Client

[vedro-httpx](https://pypi.org/project/vedro-httpx/) is a plugin designed for the Vedro testing framework. Its main goal is to simplify the process of sending HTTP requests via [HTTPX](https://www.python-httpx.org/), a fully-featured HTTP client that supports both synchronous and asynchronous APIs, as well as HTTP/1.1 and HTTP/2 protocols.

## Setup

<Tabs>
  <TabItem value="quick" label="Quick" default>

For a quick installation, you can use a plugin manager like so:

```shell
$ vedro plugin install vedro-httpx
```

  </TabItem>
  <TabItem value="manual" label="Manual">

If you prefer a manual approach, follow these steps:

1. Install the package using pip:

```shell
$ pip3 install vedro-httpx
```

2. Then, enable the plugin in the `vedro.cfg.py` configuration file:

```python
# ./vedro.cfg.py
import vedro
import vedro_httpx


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class VedroHTTPX(vedro_httpx.VedroHTTPX):
            enabled = True
```

  </TabItem>
</Tabs>

## Basics

The core functionality of the `vedro-httpx` plugin is provided by the `AsyncHTTPInterface` class. You can use this class to define your API interface. Below is an example of creating an AuthAPI interface for an authentication API:

<Tabs>
  <TabItem value="async" label="Async" default>

```python
from vedro_httpx import Response, AsyncHTTPInterface

class AuthAPI(AsyncHTTPInterface):
    def __init__(self, base_url: str = "http://localhost") -> None:
        super().__init__(base_url)

    async def login(self, username: str, password: str) -> Response:
        return await self._request("POST", "/auth/login", json={
            "username": username,
            "password": password
        })
```

  </TabItem>
  <TabItem value="sync" label="Sync">

```python
from vedro_httpx import Response, SyncHTTPInterface

class AuthAPI(SyncHTTPInterface):
    def __init__(self, base_url: str = "http://localhost") -> None:
        super().__init__(base_url)

    def login(self, username: str, password: str) -> Response:
        return self._request("POST", "/auth/login", json={
            "username": username,
            "password": password
        })
```

  </TabItem>
</Tabs>

The `_request` function is used to send HTTP requests. It passes the arguments directly to the `AsyncClient.request` method.

:::tip

For a comprehensive understanding of the `AsyncClient.request` method and its various parameters, see the official [HTTPX documentation](https://www.python-httpx.org/api/#asyncclient)

:::

Once you've defined your AuthAPI interface, you can incorporate it into your test scenarios. Here's an example scenario that simulates a registered user logging in:

<Tabs>
  <TabItem value="async" label="Async" default>

```python
import vedro
from contexts import registered_user
from interfaces import AuthAPI

class Scenario(vedro.Scenario):
    subject = "login as registered user"

    async def given_user(self):
        self.user = await registered_user()

    async def when_user_logs_in(self):
        self.response = await AuthAPI().login(self.user["username"], self.user["password"])

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200
```

  </TabItem>
  <TabItem value="sync" label="Sync">

```python
import vedro
from contexts import registered_user
from interfaces import AuthAPI

class Scenario(vedro.Scenario):
    subject = "login as registered user"

    def given_user(self):
        self.user = registered_user()

    def when_user_logs_in(self):
        self.response = AuthAPI().login(self.user["username"], self.user["password"])

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200
```

  </TabItem>
</Tabs>

If scenario fails, `vedro-httpx` provides a beautifully formatted output of the response, including headers and the body:

<Tabs>
  <TabItem value="with_plugin" label="Using Plugin" default>

<TerminalOutput>
{`
[1;37m$ vedro run -vvv[0m[1;37m
[1;37m...[0m[1;37m
[0m
[1;91mAssertionError: [0massert [1;36m201[0m == [1;36m200[0m
[0m
[1;34mScope[0m[1;34m
[0m[34m user: [0m{
    "username": "ofo",
    "password": "933ggv8hkhV_FLZ"
}
[34m response: [0mResponse:
[94mHTTP[0m/[94m1.1[0m [94m201[0m [96mCreated[0m
[96mcontent-type[0m: application/json; charset=utf-8
[96mcontent-length[0m: 98
[96mdate[0m: Wed, 14 Jun 2023 11:16:41 GMT
[96mserver[0m: Python/3.10 aiohttp/3.8.4
{
[2;90m│   [0m[94m"username"[0m:[90m [0m[33m"ofo"[0m,
[2;90m│   [0m[94m"token"[0m:[90m [0m[33m"d77cdd1765953fb9867796132a8330075e9521c0"[0m,
[2;90m│   [0m[94m"created_at"[0m:[90m [0m[94m1686727001[0m
}
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="without_plugin" label="Without Plugin">

<TerminalOutput>
{`
[1;37m$ vedro run -vvv[0m[1;37m
[1;37m...[0m[1;37m
[0m
[1;91mAssertionError: [0massert [1;36m201[0m == [1;36m200[0m
[0m
[1;34mScope[0m[1;34m
[0m[34m user: [0m{
    "username": "ofo",
    "password": "933ggv8hkhV_FLZ"
}
[34m response: [0m<Response [201 Created]>
}
`}
</TerminalOutput>

  </TabItem>
</Tabs>

:::note

This feature requires [Vedro](https://pypi.org/project/vedro/) v1.9.1 or higher

:::

## Advanced Usage

In addition to the basic request method, the `vedro-httpx` plugin also allows you to directly use the HTTPX client.

<Tabs>
  <TabItem value="async" label="Async" default>

```python
from vedro_httpx import Response, AsyncHTTPInterface

class AuthAPI(AsyncHTTPInterface):
    def __init__(self, base_url: str = "https://localhost") -> None:
        super().__init__(base_url)

    async def login(self, username: str, password: str) -> Response:
        async with self._client(base_url=self._base_url, verify=False) as client:
            return await self._request("POST", "/auth/login", json={
                "username": username,
                "password": password
            })
```

  </TabItem>
  <TabItem value="sync" label="Sync">

```python
from vedro_httpx import Response, SyncHTTPInterface

class AuthAPI(SyncHTTPInterface):
    def __init__(self, base_url: str = "https://localhost") -> None:
        super().__init__(base_url)

    def login(self, username: str, password: str) -> Response:
        with self._client(base_url=self._base_url, verify=False) as client:
            return self._request("POST", "/auth/login", json={
                "username": username,
                "password": password
            })
```

  </TabItem>
</Tabs>

This approach provides full flexibility in using the HTTPX `AsyncClient` directly, allowing you to control additional parameters such as SSL verification.

For more information and available parameters, check out the official [HTTPX documentation](https://www.python-httpx.org/api/#asyncclient).
