---
id: quick-start
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

Vedro is a powerful tool for creating scenario-based tests that simulate user interactions and validate outcomes. This guide will help you get started with Vedro by demonstrating how to create a test that decodes a base64 encoded string using the [httpbin.org](https://httpbin.org/) API.


## Installation

To install [vedro](https://pypi.org/project/vedro/)  and the [httpx](https://www.python-httpx.org/) library, which we will use to make HTTP requests in our test, simply run the following command in your terminal:

```shell
$ pip3 install vedro httpx
```

## Your First Test

Vedro framework uses scenario tests to simulate user interactions and validate outcomes (or side effects). Each scenario begins with a **subject** representing the user's intention and includes a series of steps:

1. **Arrange steps** - Prepare data for the primary action
2. **Primary action (act)** - User interaction with the application, system, or component
3. **Assert steps** - Verify application responses or side effects against expected outcomes

Create a new file named `decode_base64_encoded_string.py` in the `scenarios/` directory and add the following code:

<Tabs>
  <TabItem value="sync" label="sync" default>

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
  <TabItem value="async" label="async">

```python
import httpx
import vedro

class Scenario(vedro.Scenario):
    subject = "decode base64 encoded string"

    def given_encoded_string(self):
        self.encoded = "YmFuYW5h"

    async def when_user_decodes_string(self):
        async with httpx.AsyncClient() as client:
            self.response = await client.get(f"https://httpbin.org/base64/{self.encoded}")

    def then_it_should_return_decoded_string(self):
        assert self.response.text == "banana"

```

  </TabItem>
</Tabs>

In this test, we use the [httpbin.org](https://httpbin.org) API to decode a base64 encoded string. We define a `Scenario` class with a `subject` representing the user's intention to decode the string and three methods:

1. `given_encoded_string` — Sets up the initial conditions for the test (in this case, the encoded string)
2. `when_user_decodes_string` — Performs the primary action (sending an HTTP GET request to the API)
3. `then_it_should_return_decoded_string` — Verifies the outcome (checking if the decoded string is "banana")


## Running the Test

To run the test, execute the following command in your terminal:

```shell
$ vedro run -vv
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

The `-vv` flag increases the verbosity of the test output. In case a scenario fails, this flag provides more detailed information about the test run to help you identify and troubleshoot the issue.

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ decode base64 encoded string[0m[31m
[0m   [32m✔ given_encoded_string[0m[32m
[0m   [32m✔ when_user_decodes_string[0m[32m
[0m   [31m✗ then_it_should_return_decoded_string[0m[31m
[0m[31m╭─[0m[31m──────────────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m────────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/e2e/scenarios/[0m[1;33mdecode_base64_encoded_string.py[0m:[94m15[0m in [92mthen_it_should_return_decoded_string[0m [31m│[0m
[31m│[0m   [2m13 [0m[2m│   [0m                                                                                 [31m│[0m
[31m│[0m   [2m14 [0m[2m│   [0m[94mdef[0m [92mthen_it_should_return_decoded_string[0m([96mself[0m):                                  [31m│[0m
[31m│[0m [31m❱ [0m15 [2m│   │   [0m[94massert[0m [96mself[0m.response.text == [33m"[0m[33mbanana[0m[33m"[0m                                        [31m│[0m
[31m│[0m   [2m16 [0m                                                                                     [31m│[0m
[31m╰───────────────────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError: [0massert [32m'banana'[0m == [32m''[0m
 +  where [32m'banana'[0m = [1m<[0m[1;95mResponse[0m[39m [0m[1;39m[[0m[1;36m503[0m[39m SERVICE UNAVAILABLE[0m[1;39m][0m[1m>[0m.text
 
[37m# --seed 80485375-d67c-44d3-88b5-51335c5adcb7[0m[37m
[0m[1;31m# 3 scenarios, 0 passed, 1 failed, 0 skipped[0m[34m (1.52s)[0m[34m
[0m
`}
</TerminalOutput>


## Next Steps

Now that you have successfully set up Vedro and written your first test, you can continue to explore the framework and create more complex test scenarios for your application.
