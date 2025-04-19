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
$ pip install vedro-httpx
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
        # Disable TLS verification for illustration only
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
        # Disable TLS verification for illustration only
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

The `vedro-httpx` plugin can record every HTTP request made while a scenario runs and store the data as a [HAR‑format](https://en.wikipedia.org/wiki/HAR_(file_format)) artifact automatically.

```shell
$ vedro run --httpx-record-requests
```

The recorded HAR files are saved in the `.vedro/artifacts` directory by default.

They can be attached to an <Link to="/docs/integrations/allure-reporter#artifacts">Allure report</Link> like so:

```shell
$ vedro run -r rich allure --httpx-record-requests
```

HAR files can be opened and analyzed using browser developer tools or local tools such as <Link to="https://www.telerik.com/fiddler">Fiddler</Link> or <Link to="https://insomnia.rest/">Insomnia</Link>. Additionally, you can use online tools like the <Link to="https://toolbox.googleapps.com/apps/har_analyzer/">Google HAR Analyzer</Link> for convenient, web-based viewing.

## Generating OpenAPI Specs (beta)

The `vedro-httpx` plugin can turn the HAR files it records into an OpenAPI 3.0 specification that documents every route exercised by your tests.

1. **Record your scenarios**  
   ```shell
   $ vedro run --httpx-record-requests
   ```  
   HAR files are saved to `.vedro/artifacts`.

2. **Generate the spec**  
   ```shell
   $ vedro_httpx .vedro/artifacts
   ```
   The command prints the resulting spec to stdout so you can pipe or redirect it as you like.

For every *method + path* pair the spec now stores:

* **Request** – query parameters, headers, and a body if it’s JSON or form‑urlencoded.  
* **Response** – headers and a body if it’s JSON.  

All other content types are quietly skipped, so the spec stays tidy.

### CLI options

* `--base-url <url>` – only process entries whose URL begins with the given prefix (e.g. `http://localhost:8080/api/v1`).  
* `--no-constraints` – omit JSON‑Schema constraints such as `minimum`, `maximum`, `minItems`, etc., producing a more permissive spec.

**Example invocation**

```shell
$ vedro_httpx .vedro/artifacts \
    --base-url http://localhost:8080/api/v1 \
    --no-constraints > openapi.yaml
```

Feed the resulting `openapi.yaml` into Swagger UI, Redoc, or your favorite code‑generation or linting tool.

### Handling Dynamic Path Segments

If a route contains variable parts such as user IDs or order numbers, declare those parts as **dynamic** with the `segments` argument. Otherwise, the generator records every concrete value it sees and fills your spec with many near‑identical paths.

#### ❌ Without `segments`

```python
class AsyncAuthAPI(AsyncHTTPInterface):
    async def get_user(self, username: str) -> Response:
        return await self._request("GET", f"/users/{username}")
```

Each call (`/users/bob`, `/users/alice`, `/users/42`, …) appears as its own static path, which is messy and inaccurate.

#### ✅ With `segments`

```python
class AsyncAuthAPI(AsyncHTTPInterface):
    async def get_user(self, username: str) -> Response:
        return await self._request("GET", "/users/{username}", segments={
            "username": username
        })
```

The generator now produces a single, tidy path `/users/{username}` and documents `{username}` as a path parameter, keeping your OpenAPI spec precise and readable.
