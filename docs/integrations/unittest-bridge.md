---
id: unittest-bridge
toc_max_heading_level: 3
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UnitTest Bridge

Python’s built-in [unittest framework](https://docs.python.org/3/library/unittest.html) has been a staple for test automation for years. Many teams have extensive test suites built with unittest, but as testing needs evolve, modern frameworks like Vedro offer powerful features that improve test execution, reporting, and stability.

Transitioning to a new testing framework can feel overwhelming, especially for teams with extensive unittest-based test suites. With [vedro-unittest](https://pypi.org/project/vedro-unittest), you can gradually integrate Vedro into your testing process, maintaining your existing unittest workflow while exploring its advantages.

- **Try Vedro without full commitment:** Run your existing unittest test cases inside Vedro to explore its [enhanced reporting](https://vedro.io/docs/basics/reporting-system), [parallel execution](https://vedro.io/docs/features/parallel-execution), and [built-in stability mechanisms](https://vedro.io/docs/features/anti-flaky) without rewriting your tests.
- **Migrate gradually:** Keep unittest and Vedro tests separate while executing them together within a unified reporting system, allowing for a seamless transition.
- **Enhance testing capabilities:** Leverage Vedro’s ecosystem, including integrations with tools like [Playwright](https://pypi.org/project/vedro-pw/), [HTTPX](https://vedro.io/docs/integrations/httpx-client), and [Allure](https://vedro.io/docs/integrations/allure-reporter), to improve test automation while maintaining your unittest-based test logic.

## Usage

<Tabs>
  <TabItem value="quick" label="Quick" default>

For a quick installation, you can use a plugin manager like so:

```shell
$ vedro plugin install vedro-unittest
```

  </TabItem>
  <TabItem value="manual" label="Manual">

If you prefer a manual approach, follow these steps:

1. Install the package using pip:

```shell
$ pip install vedro-unittest
```

2. Then, enable the plugin in the `vedro.cfg.py` configuration file:

```python
# ./vedro.cfg.py
import vedro
import vedro_unittest


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class VedroUnitTest(vedro_unittest.VedroUnitTest):
            enabled = True
```

  </TabItem>
</Tabs>

Once installed, you can run your existing unittest test cases with Vedro:

```sh
$ vedro run tests/
```

Vedro will automatically detect and execute unittest test cases as Vedro scenarios.

<Tabs>
  <TabItem value="vedro" label="vedro" default>

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ [TestOrderProcessing] test order total[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m   [31m✗ do[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m[31m╭─[0m[31m─────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m──────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/order_service/tests/[0m[1;33mtest_order.py[0m:[94m13[0m in [92mtest_order_total[0m                      [31m│[0m
[31m│[0m                                                                                [31m│[0m
[31m│[0m   [2m10 [0m    [94mdef[0m [92mtest_order_total[0m([96mself[0m):                                           [31m│[0m
[31m│[0m   [2m11 [0m        order = {[33m"[0m[33mprice[0m[33m"[0m: [94m10[0m, [33m"[0m[33mquantity[0m[33m"[0m: [94m3[0m}                              [31m│[0m
[31m│[0m   [2m12 [0m        result = process_order(order)                                     [31m│[0m
[31m│[0m [31m❱ [0m13         [96mself[0m.assertEqual(result[[33m"[0m[33mtotal[0m[33m"[0m], [94m35[0m)                             [31m│[0m
[31m│[0m   [2m14 [0m                                                                          [31m│[0m
[31m│[0m [33m╭─[0m[33m──────────────────[0m[33m locals [0m[33m───────────────────[0m[33m─╮[0m                              [31m│[0m
[31m│[0m [33m│[0m  order = [1m{[0m[33m'price'[0m: [94m10[0m, [33m'quantity'[0m: [94m3[0m[1m}[0m         [33m│[0m                              [31m│[0m
[31m│[0m [33m│[0m result = [1m{[0m[33m'total'[0m: [94m30[0m, [33m'status'[0m: [33m'processed'[0m[1m}[0m [33m│[0m                              [31m│[0m
[31m│[0m [33m╰───────────────────────────────────────────────╯[0m                              [31m│[0m
[31m╰────────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError: [0m[1;36m30[0m != [1;36m35[0m
 
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="unittest" label="unittest">

```
======================================================================
FAIL: test_order_total (tests.test_order.TestOrderProcessing.test_order_total)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/order_service/tests/test_order.py", line 13, in test_order_total
    self.assertEqual(result["total"], 35)
AssertionError: 30 != 35

----------------------------------------------------------------------
Ran 1 test in 0.000s

FAILED (failures=1)
```

  </TabItem>
</Tabs>

## Compatibility

vedro-unittest is designed to be fully compatible with unittest, maintaining the expected behavior while running tests within Vedro. However, there are a few nuances to be aware of. See the [Limitations](#limitations) section for more details.

### ✅ **Assertions**  

The vedro-unittest plugin fully supports unittest's assertion methods:

```python
import unittest

class TestStringMethods(unittest.TestCase):
    def test_upper(self):
        self.assertEqual("banana".upper(), "BANANA")
```

### ✅ **Fixtures (setUp & tearDown)**  

Fixtures such as `setUp()` and `tearDown()` work just like in unittest, allowing you to prepare your test environment.

```python
import unittest

class WidgetTestCase(unittest.TestCase):
    def setUp(self):
        self.widget = Widget('The widget')

    def test_widget_resize(self):
        self.widget.resize(100, 150)
        self.assertEqual(self.widget.size(), (100, 150))
```

### ✅ **Skipping Tests**

All the standard `@unittest.skip*` decorators are supported. You can skip tests either at the method or class level.

<Tabs>
  <TabItem value="test_case" label="Skipping a Test" default>

```python
import unittest

class MyTestCase(unittest.TestCase):
    @unittest.skip("Feature not available")
    def test_feature(self):
        pass

    @unittest.skipIf(mylib.__version__ < (1, 3), "Requires mylib version >= 1.3")
    def test_new_feature(self):
        pass
```

  </TabItem>
  <TabItem value="test_suite" label="Skipping a Test Suite">

```python
import unittest

@unittest.skip("Feature not available")
class MyTestCase(unittest.TestCase):
    def test_feature(self):
        pass
```

  </TabItem>
</Tabs>

### ✅ **Expected Failures**  

Vedro correctly handles `@unittest.expectedFailure`, ensuring that failed tests marked as expected failures do not cause the scenario to fail.

```python
import unittest

class ExpectedFailureTestCase(unittest.TestCase):
    @unittest.expectedFailure
    def test_fail(self):
        self.assertEqual(1, 0, "This test is expected to fail")
```

Output:

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ [ExpectedFailureTestCase] test fail[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m   [38;5;244m|> Expected Failure: Scenario passed because it failed as expected with AssertionError('1 != 0 : This test is expected to fail')[0m[38;5;244m
[0m 
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

However, if such a test unexpectedly passes, vedro‑unittest raises an `UnexpectedSuccessError`.

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ [ExpectedFailureTestCase] test fail[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m   [38;5;244m|> Unexpected Success: Scenario failed because it was expected to fail, but the scenario passed[0m[38;5;244m
[0m   [31m✗ do[0m[38;5;244m (0.00s)[0m[38;5;244m
[0m[1;91mUnexpectedSuccessError: [0mScenario passed, but expected to fail
 
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>

### ✅ **Parameterized Tests**  

The plugin supports `subTest()` and external parameterization libraries like [parameterized](https://pypi.org/project/parameterized/).

<Tabs>
  <TabItem value="subtest" label="Using subTest" default>

```python
import unittest

class NumbersTest(unittest.TestCase):

    def test_even(self):
        for i in range(0, 6, 2):
            with self.subTest(i=i):
                self.assertEqual(i % 2, 0)
```

  </TabItem>
  <TabItem value="parameterized" label="Using parameterized">

```python
import unittest
from parameterized import parameterized

class NumbersTest(unittest.TestCase):

    @parameterized.expand(range(0, 6, 2))
    def test_even(self, value):
        self.assertEqual(value % 2, 0)
```

  </TabItem>
</Tabs>

### ✅ **Async Support**

`vedro-unittest` supports async test cases out of the box. You can use `async def` inside your `unittest` test cases, and Vedro will execute them properly by running them in a dedicated thread.

```python
import unittest
import asyncio

class AsyncTestCase(unittest.IsolatedAsyncioTestCase):
    async def test_async_function(self):
        result = await asyncio.sleep(0.1, result=42)
        self.assertEqual(result, 42)
```

### ✅ **Mocking**

Since Vedro just provides a different test runner, Python's standard [unittest.mock](https://docs.python.org/3/library/unittest.mock.html) works without modifications. You can use `@patch` decorators and context managers as usual.

```python
import unittest
from unittest.mock import Mock

class MockTestCase(unittest.TestCase):
    def test_mock(self):
        mock = Mock()
        mock.method.return_value = "mocked"
        self.assertEqual(mock.method(), "mocked")
```

## Limitations

While vedro-unittest provides seamless integration of unittest test cases within Vedro, there are a few important limitations to be aware of. These limitations primarily stem from Vedro’s design philosophy, which prioritizes **test independence, reliability, and maintainability**.

### 🚫 **Skipping Tests at Runtime**

Vedro does not support dynamically skipping tests during execution using `self.skipTest()`. This practice is considered an anti-pattern because it undermines the core principle of deterministic and independent test execution that Vedro enforces. All decisions about which tests to run should be made during test discovery (or configuration time), ensuring that the test suite behaves predictably and reliably, even in parallel execution environments.

For example, the following code, which attempts to skip a test based on a runtime condition, will [fail](https://github.com/vedro-universe/vedro-unittest/issues/1) under Vedro:

```python
import unittest

class MyTestCase(unittest.TestCase):
    def test_feature(self):
        if not some_condition():
            self.skipTest("Feature not available")
```

Instead of dynamically skipping tests within the test logic, use decorators such as `@unittest.skipIf` or `@unittest.skipUnless` to evaluate conditions at the time of test discovery. This method ensures that all test decisions are made upfront, aligning with Vedro’s design for predictable test execution.

### ⚠️ **Custom Test Ordering**

Vedro intentionally does not support defining a custom test execution order. This design decision reinforces the principle that each test should be independent and isolated. Enforcing a specific order can lead to hidden dependencies and stateful tests, often resulting in flaky behavior and reduced maintainability.

In some unittest workflows, tests are arranged to run in a predetermined sequence. For example:

```python
import unittest

class MyTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Set up shared state
        ...

    def test_1(self):
        # Relies on shared state
        ...

    def test_2(self):
        # Also relies on shared state
        ...

    @classmethod
    def tearDownClass(cls):
        # Clean up shared state
        ...
```

In unittest, this code executes in a fixed sequence:
1. `setUpClass` runs once before any tests.
2. `test_1` is executed.
3. `test_2` follows.
4. `tearDownClass` runs after all tests.

While this may work for certain scenarios, it introduces dependencies between tests. If additional tests are inserted or tests are run in parallel, these dependencies can lead to unpredictable outcomes.

To maintain compatibility with unittest, Vedro groups tests that share module-level (`setUpModule`/`tearDownModule`) or class-level (`setUpClass`/`tearDownClass`) fixtures into a single scenario. This grouping is a compatibility workaround, ensuring that shared setup and teardown routines are executed correctly, not an endorsement of custom test ordering.

This grouping means that:
- Each test still executes its own `setUp()` and `tearDown()` methods.
- If one test in a grouped scenario fails, the entire scenario is marked as failed (although all tests will still be executed, as in unittest).
- If multiple tests in a grouped scenario fail, the report will include a complete summary of all failures.
