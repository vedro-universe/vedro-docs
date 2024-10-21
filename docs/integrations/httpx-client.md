---
id: httpx-client
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@site/src/components/Link';

# HTTPX Client

<Link to="https://pypi.org/project/vedro-httpx/">vedro-httpx</Link> is a plugin designed for the Vedro testing framework. Its main goal is to simplify the process of sending HTTP requests via <Link to="https://www.python-httpx.org/">HTTPX</Link>, a fully-featured HTTP client that supports both synchronous and asynchronous APIs, as well as HTTP/1.1 and HTTP/2 protocols.

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

The `_request()` function is used to send HTTP requests. It passes the arguments directly to the `httpx.AsyncClient.request()` method.

:::tip

For a comprehensive understanding of the `AsyncClient.request()` method and its various parameters, see the official <Link to="https://www.python-httpx.org/api/#asyncclient">HTTPX documentation</Link>

:::

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

The `_request()` function is used to send HTTP requests. It passes the arguments directly to the `httpx.Client.request()` method.

:::tip

For a comprehensive understanding of the `Client.request()` method and its various parameters, see the official <Link to="https://www.python-httpx.org/api/#client">HTTPX documentation</Link>

:::

  </TabItem>
</Tabs>

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
[1;37m$ vedro run -v[0m[1;37m
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
[1;37m$ vedro run -v[0m[1;37m
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

This feature requires <Link to="https://pypi.org/project/vedro/">Vedro</Link> v1.9.1 or higher

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
        async with self._client(verify=False) as client:
            return await self._request("POST", "/auth/login", json={
                "username": username,
                "password": password
            })
```

This approach provides full flexibility in using the HTTPX `AsyncClient` directly, allowing you to control additional parameters such as SSL verification.

  </TabItem>
  <TabItem value="sync" label="Sync">

```python
from vedro_httpx import Response, SyncHTTPInterface

class AuthAPI(SyncHTTPInterface):
    def __init__(self, base_url: str = "https://localhost") -> None:
        super().__init__(base_url)

    def login(self, username: str, password: str) -> Response:
        with self._client(verify=False) as client:
            return self._request("POST", "/auth/login", json={
                "username": username,
                "password": password
            })
```

This approach provides full flexibility in using the HTTPX `Client` directly, allowing you to control additional parameters such as SSL verification.

  </TabItem>
</Tabs>

For more information and available parameters, check out the official <Link to="https://www.python-httpx.org/api/">HTTPX documentation</Link>.

## Request Recording

The `vedro-httpx` plugin also enables recording of HTTP requests made during scenario execution and saving the data as a scenario artifact in <Link to="https://en.wikipedia.org/wiki/HAR_(file_format)">HAR (HTTP Archive) format</Link>. This can be especially useful for debugging and auditing.

```shell
$ vedro run --httpx-record-requests
```

Artifacts, such as recorded HTTP requests, can be attached to an <Link to="/docs/integrations/allure-reporter#artifacts">Allure report</Link>. Use the following command to generate an Allure report with HTTP request recordings:

```shell
$ vedro run -r rich allure --httpx-record-requests
```

If you prefer to save artifacts locally for offline analysis, you can use the `--save-artifacts` option. This will save the recorded HTTP requests as HAR files on your local file system:

```shell
$ vedro run --httpx-record-requests --save-artifacts
```

HAR files can be opened and analyzed using browser developer tools or local tools such as <Link to="https://www.telerik.com/fiddler">Fiddler</Link> or <Link to="https://insomnia.rest/">Insomnia</Link>. Additionally, you can use online tools like the <Link to="https://toolbox.googleapps.com/apps/har_analyzer/">Google HAR Analyzer</Link> for convenient, web-based viewing.

## Generating OpenAPI Specs (beta)

The `vedro-httpx` plugin provides the ability to generate OpenAPI specifications from the HTTP requests recorded during test executions. This feature allows you to document your APIs dynamically based on real interactions.

:::info
Please note that the current implementation does not yet support the generation of request and response bodies.
:::

1. **Record HTTP Requests During Test Execution**:
   
   Start by running your test scenarios and recording the HTTP requests made during execution. Use the `--httpx-record-requests` and `--save-artifacts` flags to save these requests as HAR files:
   
   ```shell
   $ vedro run --httpx-record-requests --save-artifacts
   ```
   
   This command saves the recorded HTTP requests as HAR files in the `.vedro/artifacts` directory.

2. **Generate the OpenAPI Specification**:
   
   Once the requests are recorded, you can generate the OpenAPI specification by running the following command:
   
   ```shell
   $ vedro_httpx .vedro/artifacts
   ```
   
   This command processes the saved HAR files and generates an OpenAPI spec based on them.

### Important Considerations

When defining API routes with dynamic segments (e.g., user IDs), use the `segments` argument to avoid treating each request as a static path. Without it, the OpenAPI generator will interpret paths like `/users/bob` and `/users/alice` as separate static endpoints, leading to an inaccurate spec.

#### Example Without `segments` (❌ Not Recommended):
```python
class AsyncAuthAPI(AsyncHTTPInterface):
    async def get_user(self, username: str) -> Response:
        return await self._request("GET", f"/users/{username}")
```

#### Example With `segments` (✅ Recommended):
```python
class AsyncAuthAPI(AsyncHTTPInterface):
    async def get_user(self, username: str) -> Response:
        return await self._request("GET", "/users/{username}", segments={
            "username": username
        })
```

This ensures the OpenAPI spec recognizes `{username}` as a dynamic parameter, resulting in a cleaner, more accurate path like `/users/{username}`.
