---
id: unittest-vedro
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# unittest → Vedro Cheatsheet

Transitioning from [unittest](https://docs.python.org/3/library/unittest.html) to [Vedro](https://vedro.io) can improve test structure, readability, and maintainability. This cheatsheet highlights key differences in running tests, command-line options, test structure, assertions, and parameterization.

## Running Tests: Basic Commands

| Action | unittest | Vedro |
|--------|---------|-------|
| Run all tests in a directory | `python3 -m unittest discover -s tests/` | `vedro run tests/` |
| Run a specific test file | `python3 -m unittest tests/test_smth.py` | `vedro run tests/test_smth.py` |

## Command-Line Options & Flags

| Feature | unittest | Vedro |
|---------|---------|-------|
| **Verbose output** <br/> Displays more detailed test execution logs | `-v, --verbose` | `-v, --verbose` |
| **Quiet mode** <br/> Suppresses output | `-q, --quiet` | `-r silent` |
| **Show locals on failure** <br/> Displays local variables when a test fails | `--locals` | `--tb-show-locals` |
| **Fail fast** <br/> Stops execution after the first failure | `-f, --failfast` | `-f, --fail-fast` |
| **Set project directory** <br/> Defines the root directory of the project | `-t, --top-level-directory` | `--project-dir` |

## Test Structure & Syntax

<Tabs>
  <TabItem value="unittest" label="unittest" default>

```python
import unittest

class TestProcessOrder(unittest.TestCase):
    def test_order_total(self):
        order = {"price": 10, "quantity": 3}

        result = process(order)

        self.assertEqual(result["total"], 30)
```

  </TabItem>
  <TabItem value="vedro-scenario-based" label="Vedro (scenario-based)">

```python
import vedro

class Scenario(vedro.Scenario):
    subject = "process order"

    def given_order(self):
        self.order = {"price": 10, "quantity": 3}

    def when_order_is_processed(self):
        self.result = process(self.order)

    def then_order_total_is_correct(self):
        assert self.result["total"] == 30
```


  </TabItem>
  <TabItem value="vedro-function-based" label="Vedro (function-based)">

```python
# Install via: vedro plugin install vedro-fn
from vedro_fn import scenario, given, when, then

@scenario()
def process_order():
    with given:
        order = {"price": 10, "quantity": 3}

    with when:
        result = process(order)

    with then:
        assert result["total"] == 30
```

  </TabItem>
</Tabs>

## Assertions

| Assertion Type | unittest | Vedro |
|---------------|----------|-------|
| Check equality | `self.assertEqual(a, b)` | `assert a == b` |
| Check inequality | `self.assertNotEqual(a, b)` | `assert a != b` |
| Check truthy | `self.assertTrue(x)` | `assert x` |
| Check falsy | `self.assertFalse(x)` | `assert not x` |
| Check exception raised | `with self.assertRaises(Exception): ...` | `with catched(Exception): ...` |

## Parameterized Tests

<Tabs>
  <TabItem value="unittest" label="unittest" default>

```python
import unittest

class TestProcessOrder(unittest.TestCase):

    def test_order_total(self):
        test_cases = [
            ({"price": 10, "quantity": 3}, 30),
            ({"price": 0, "quantity": 3}, 0),
            ({"price": 10, "quantity": 0}, 0),
        ]
        for order, total in test_cases:
            with self.subTest(order=order):
                result = process(order)
                self.assertEqual(result["total"], total)
```

  </TabItem>
  <TabItem value="vedro-scenario-based" label="Vedro (scenario-based)">

```python
import vedro
from vedro import params

class Scenario(vedro.Scenario):
    subject = "process order ({order})"

    @params({"price": 10, "quantity": 3}, total=30)
    @params({"price": 0, "quantity": 3}, total=0)
    @params({"price": 10, "quantity": 0}, total=0)
    def __init__(self, order, total):
        self.order = order
        self.total = total

    def when_order_is_processed(self):
        self.result = process(self.order)

    def then_order_total_is_correct(self):
        assert self.result["total"] == self.total
```


  </TabItem>
  <TabItem value="vedro-function-based" label="Vedro (function-based)">

```python
# Install via: vedro plugin install vedro-fn
from vedro_fn import scenario, given, when, then
from vedro import params

@scenario([
    params({"price": 10, "quantity": 3}, total=30),
    params({"price": 0, "quantity": 3}, total=0),
    params({"price": 10, "quantity": 0}, total=0),
])
def process_order(order, total):
    with when:
        result = process(order)

    with then:
        assert result["total"] == total
```

  </TabItem>
</Tabs>

## Skipping & Conditional Execution

| Skipping Type | unittest | Vedro |
|--------------|----------|-------|
| Skip a test | `@unittest.skip("reason")` | `@vedro.skip("reason")` |
| Skip conditionally | `@unittest.skipIf(cond, "reason")` | `@vedro.skip_if(cond, "reason")` |

## Async Testing

<Tabs>
  <TabItem value="unittest" label="unittest" default>

```python
import unittest

class TestProcessOrder(unittest.IsolatedAsyncioTestCase):

    async def test_order_total_async(self):
        order = {"price": 10, "quantity": 3}

        result = await process(order)

        self.assertEqual(result["total"], 30)
```

  </TabItem>
  <TabItem value="vedro-scenario-based" label="Vedro (scenario-based)">

```python
import vedro

class Scenario(vedro.Scenario):
    subject = "process order"

    def given_order(self):
        self.order = {"price": 10, "quantity": 3}

    async def when_order_is_processed(self):
        self.result = await process(self.order)

    def then_order_total_is_correct(self):
        assert self.result["total"] == 30
```

  </TabItem>
  <TabItem value="vedro-function-based" label="Vedro (function-based)">

```python
# Install via: vedro plugin install vedro-fn
from vedro_fn import scenario, given, when, then

@scenario()
async def process_order():
    with given:
        order = {"price": 10, "quantity": 3}

    with when:
        result = await process(order)

    with then:
        assert result["total"] == 30
```

  </TabItem>
</Tabs>
