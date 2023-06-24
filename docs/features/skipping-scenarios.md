---
id: skipping-scenarios
---

import TerminalOutput from '@site/src/components/TerminalOutput';

# Skipping Scenarios

The process of skipping allows bypassing certain scenarios without the need to delete or comment out the code. This proves incredibly beneficial in several situations:

1. **Features in Development:** When developing a new feature, the corresponding tests are often incomplete, and running these tests can lead to false negatives.
2. **Environment-Specific Tests:** Some tests might only be relevant in certain environments, such as those dependent on the operating system or applicable only in specific settings.
3. **Flaky Tests**: There may be tests in the suite that fail intermittently, or "flaky" tests. These can be skipped until the root cause is addressed.

In these cases, the `@vedro.skip` decorator becomes handy.

## Skipping Specific Scenarios

The `@vedro.skip` decorator lets you skip a particular scenario. Here's an example:

```python
import vedro

@vedro.skip
class Scenario(vedro.Scenario):
    subject = "register user"
```

Upon running your tests, you'll observe that the "register user" scenario is skipped:

<TerminalOutput>
{`
[1;37m$ vedro run [0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ login as user[0m[32m
[0m [38;5;249m○ register user[0m[38;5;249m
[0m 
[0m[1;32m# 2 scenarios, 1 passed, 0 failed, 1 skipped[0m[34m (0.12s)[0m[34m
[0m
`}
</TerminalOutput>

## Providing a Reason for Skipping

It's a good practice to provide a reason when skipping a test case. Vedro lets you include a reason directly within the `@vedro.skip` decorator:

```python
import vedro

@vedro.skip(reason="Bug #123 prevents this scenario from passing")
class Scenario(vedro.Scenario):
    subject = "register user"
```

The rationale is then displayed alongside the skipped scenario:

<TerminalOutput>
{`
[1;37m$ vedro run [0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ login as user[0m[32m
[0m [38;5;249m○ register user[0m[38;5;249m
[0m   [38;5;244m> Bug #123 prevents this scenario from passing[0m[38;5;244m
[0m 
[0m[1;32m# 2 scenarios, 1 passed, 0 failed, 1 skipped[0m[34m (0.11s)[0m[34m
[0m
`}
</TerminalOutput>

This practice enhances the readability of the test results and facilitates understanding why a specific scenario was skipped.

## Conditionally Skipping Scenarios

There may be instances where scenarios are conditionally skipped based on factors like environment setups, software versions, or other runtime considerations. Vedro provides a powerful `@vedro.skip_if` decorator for these cases:

```python
import vedro
from sys import version_info

@vedro.skip_if(lambda: version_info < (3, 10))
class Scenario(vedro.Scenario):
    subject = "register user"
```

The above scenario will be skipped if the Python version is less than 3.10.

The `@vedro.skip` decorator, `@vedro.skip_if` also accepts a reason parameter:

```python
import vedro
from sys import version_info

@vedro.skip_if(lambda: version_info < (3, 10), reason="Not supported in Python < 3.10")
class Scenario(vedro.Scenario):
    subject = "register user"
```

## A Word of Caution

Despite the usefulness of skipping tests, it's crucial to use this feature wisely. Tests exist for a reason: to maintain your software's quality assurance. Skipping them without valid reason can lead to unnoticed bugs and future issues.

There may be a strong temptation to skip tests when under time constraints or when faced with complex test scenarios. However, this practice may create a false sense of security, leading to more significant problems later. Therefore, the `@vedro.skip` and `@vedro.skip_if` decorators must be used judiciously. Only skip tests when absolutely necessary and always provide clear and detailed reasons.

Regularly review the skipped tests and assess whether the reasons for skipping remain valid. If a test was skipped due to a bug that has since been resolved, or if the test is now relevant to the current environment or Python version, it should be reintegrated into the test suite.
