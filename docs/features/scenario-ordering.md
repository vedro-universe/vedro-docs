---
id: scenario-ordering
---

import TerminalOutput from '@site/src/components/TerminalOutput';

# Scenario Ordering

The order in which scenarios are executed can significantly impact the testing process. Vedro provides two distinct approaches for scenario ordering: Stable Order and Random Order.

## Stable Order

The Stable Order approach ensures that scenarios are executed in the same order every time, [regardless of the file system or operating system](https://utcc.utoronto.ca/~cks/space/blog/unix/ReaddirOrder).

By default, Vedro executes scenarios in Stable Order. Therefore, there's no need to specify `--order-stable` when running tests.

## Random Order

Although the stability and predictability of scenario execution provide comfort, the unpredictability of random scenario ordering can reveal previously unseen dependencies between tests. Random order encourages the development of genuinely independent tests and identifies those that are dependent on initial states, making it an invaluable tool for proactive quality assurance.

To execute scenarios in a random order, use the `--order-random` option:

```shell
$ vedro run --order-random
```

Here's an example output:

<TerminalOutput>
{`
Scenarios
[1m*[0m[1m
[0m [32m✔ sign in via email[0m[32m
[0m [32m✔ sign out[0m[32m
[0m [32m✔ sign in via social[0m[32m
[0m 
[38;5;249m# --seed bae6dceb-a55a-4895-9f26-4d3ff56a9fea[0m[38;5;249m
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m (0.12s)[0m[34m
[0m
`}
</TerminalOutput>

Each run of the scenarios generates a unique seed, which can be used to reproduce the exact execution order in future runs.

To execute tests with a specific seed, use the `--seed` argument:

```shell
$ vedro run --order-random --seed=bae6dceb-a55a-4895-9f26-4d3ff56a9fea
```

This command will reproduce the test execution order from the run that used the specified seed. This feature can be particularly useful when a potential issue has been identified and you need to re-run the tests in the exact same order to aid debugging.
