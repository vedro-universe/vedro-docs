---
id: fail-fast
---

import Underlined from '@site/src/components/Underlined';
import Link from '@site/src/components/Link';

# Fail Fast

## Understanding the Fail Fast Principle

At its core, the <Link to="https://enterprisecraftsmanship.com/posts/fail-fast-principle/">fail fast principle</Link> advocates for halting a process as soon as an error is detected, rather than allowing it to proceed, which could escalate the problem or waste resources. This principle is especially relevant in a testing environment, where a high failure rate could indicate systemic or foundational issues.

For example, imagine you're running a set of 100 tests, and you encounter <Underlined>30 failures</Underlined> before the test run even ends. Instead of continuing with the remaining tests, which could be unproductive and consume substantial resources, it may be more pragmatic to halt and address the root cause of these early failures.

Vedro offers built-in features that adhere to the fail fast principle. To halt the testing process after a certain number of failures, use:

```shell
$ vedro run --fail-after-count N
```

In the above command, `N` signifies the number of failures that will trigger the termination of the testing process.

## Advantages of Halting After the First Failure

While limiting the number of failures before halting the testing process is useful, stopping right after the first failure can be even more beneficial in certain situations. This approach is particularly effective when working on fixing tests individually.

Stopping after the first failure allows you to examine the state of the test at the moment of failure, enabling more targeted debugging. This can be achieved with the following command:

```shell
$ vedro run -f (--fail-fast)
```

By adopting the fail fast approach in testing, engineers can work in an iterative fashion. The process is straightforward: run tests, identify and fix any issues leading to failure, run tests again. This cycle continues until there are no remaining failing tests.

This iterative approach aids in rapidly isolating and rectifying issues, which significantly reduces the complexity and time required for debugging. Therefore, the fail fast principle not only streamlines the testing process but also enhances the overall quality of the software, making it an invaluable tool for engineers.
