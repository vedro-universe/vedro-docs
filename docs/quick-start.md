---
id: quick-start
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@site/src/components/Link';

# Quick Start

Vedro is a powerful tool for creating scenario-based tests that simulate user interactions and validate outcomes. This guide will help you get started with Vedro by demonstrating how to create a test that decodes a base64 encoded string using the <Link to="https://httpbin.org/">httpbin.org</Link> API.


## Installation

To install <Link to="https://pypi.org/project/vedro/">vedro</Link> and the <Link to="https://www.python-httpx.org/">httpx</Link> library, which we will use to make HTTP requests in our test, simply run the following command in your terminal:

```shell
$ pip install vedro httpx
```

## Your First Test

Vedro framework uses scenario tests to simulate user interactions and validate outcomes (or side effects). Each scenario begins with a **subject** representing the user's intention and includes a series of steps:

1. **Arrange steps** - Prepare data for the primary action
2. **Primary action (Act)** - User interaction with the application, system, or component
3. **Assert steps** - Verify application responses or side effects against expected outcomes

Create a new file named `decode_base64_encoded_string.py` in the `scenarios/` directory and add the following code:

<Tabs groupId="test-style">
  <TabItem value="scenario-based" label="Scenario-based" default>

```python
import httpx
import vedro

class Scenario(vedro.Scenario):
    subject = "decode base64 encoded string"

    def given_encoded_string(self):
        self.encoded = "YmFuYW5h"

    def when_user_decodes_string(self):
        self.response = httpx.get(f"https://httpbin.org/base64/{self.encoded}")

    def then_it_should_return_decoded_string(self):
        assert self.response.text == "banana"

```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

To use the function-based approach, install the [vedro-fn](https://pypi.org/project/vedro-fn/) plugin. For more details, refer to [this article](https://medium.com/@tsv_/a-leaner-approach-with-vedro-introducing-function-based-scenarios-f93df8c8d02f).

```python
import httpx
# Install via: vedro plugin install vedro-fn
from vedro_fn import scenario, given, when, then

@scenario()
def decode_base64_encoded_str():
    with given:
        encoded = "YmFuYW5h"

    with when:
        response = httpx.get(f"https://httpbin.org/base64/{encoded}")

    with then:
        assert response.text == "banana"

```

  </TabItem>
</Tabs>

In this test, we use the <Link to="https://httpbin.org">httpbin.org</Link> API to decode a base64 encoded string. We define a `Scenario` class with a `subject` representing the user's intention to decode the string and three methods:

1. `given` — Sets up the initial conditions for the test (in this case, the encoded string)
2. `when` — Performs the primary action (sending an HTTP GET request to the API)
3. `then` — Verifies the outcome (checking if the decoded string is "banana")


## Running the Test

To run the test, execute the following command in your terminal:

```shell
$ vedro run
```

The command will run all the test scenarios in `scenarios/` directory and display the results, indicating which tests have passed, failed, or been skipped.

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

Here is an example of a failed scenario:

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ decode base64 encoded str[0m[31m
[0m   [31m✗ do[0m[31m
[0m[31m╭─[0m[31m───────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m───────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/e2e/scenarios/[0m[1;decode_base64.py[0m:[94m14[0m in [92mdecode_base64_encoded_str[0m           [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m12 [0m                                                                     [31m│[0m
[31m│[0m   [2m13 [0m    [94mwith[0m then:                                                       [31m│[0m
[31m│[0m [31m❱ [0m14         [1;4;94massert[0m[1;4m response.text == [0m[1;4;33m"[0m[1;4;33mbanana[0m[1;4;33m"[0m                             [31m│[0m
[31m│[0m   [2m15 [0m                                                                     [31m│[0m
[31m╰───────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [32m- 'banana'[0m                                                                                                                   
    [31m+ ''[0m                                                                                                                         
 
 
[38;5;249m# --seed ab0017dd-63ba-45c8-b9fb-b7d7bd694d4b[0m[38;5;249m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.68s)[0m[34m
[0m
`}
</TerminalOutput>


## Next Steps

Now that you have successfully set up Vedro and written your first test, you can continue to explore the framework and create more complex test scenarios for your application.
