---
id: parameterized-scenarios
---

import TerminalOutput from '@site/src/components/TerminalOutput';

# Parameterized Scenarios

To create a parameterized scenario in Vedro, you'll need to use the `@vedro.params` decorator. This decorator allows you to pass different parameters to the scenario, which will then be executed multiple times with the provided parameters.

Here's an example of a parameterized scenario:

```python
import httpx
import vedro
from vedro import params


class Scenario(vedro.Scenario):
    subject = "get status"

    @params(200)
    @params(404)
    def __init__(self, status):
        self.status = status

    def given_url(self):
        self.url = f"https://httpbin.org/status/{self.status}"

    def when_user_sends_request(self):
        self.response = httpx.get(self.url)

    def then_it_should_return_expected_status(self):
        assert self.response.status_code == self.status

```

In this example, the scenario is executed with two distinct parameters: `status=200` and `status=404`.

### Subject Interpolation

You can also incorporate interpolation into the scenario's subject. The subject is a descriptive string for the scenario and can include placeholders for parameter values. To interpolate these values, use the [format string syntax](https://docs.python.org/3/library/string.html#format-string-syntax).

```python
import vedro
from vedro import params


class Scenario(vedro.Scenario):
    subject = "get status {status}"

    @params(200)
    @params(404)
    def __init__(self, status):
        self.status_code = status

    ...

```

In this example, the subject of the scenario will change based on the value of the status parameter.

<TerminalOutput>
{`
[1;37m$ vedro run [0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ get status 200[0m[32m
[0m [32m✔ get status 404[0m[32m
[0m 
[0m[1;32m# 2 scenarios, 2 passed, 0 failed, 0 skipped[0m[34m (1.93s)[0m[34m
[0m
`}
</TerminalOutput>

### Subject Parameterization

You can also parameterize the subject itself. To achieve this, include the subject as a parameter in the `@params` decorator and define it in the scenario's constructor.

Here's an example of a scenario with a parameterized subject:

```python
import vedro
from vedro import params


class Scenario(vedro.Scenario):
    subject = "{subject}"

    @params("get ok status", 200)
    @params("get not found status", 404)
    def __init__(self, subject, status):
        self.subject = subject
        self.status = status

    ...

```

Output:

<TerminalOutput>
{`
[1;37m$ vedro run[0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ get ok status[0m[32m
[0m [32m✔ get not found status[0m[32m
[0m 
[0m[1;32m# 2 scenarios, 2 passed, 0 failed, 0 skipped[0m[34m (1.22s)[0m[34m
[0m
`}
</TerminalOutput>
