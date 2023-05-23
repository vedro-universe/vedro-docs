---
id: selecting-and-skipping
---

import TerminalOutput from '@site/src/components/TerminalOutput';

# Selecting & Skipping

### Selecting Scenarios

To run scenarios in a file or directory, use the following command:

```shell
$ vedro run <file_or_dir>
```

For example, to run scenarios in the `login/` and `logout/` directories:

```shell
$ vedro run scenarios/login/ scenarios/logout/
```


### Skipping Scenarios

To skip scenarios in a file or directory, use the `-i` or `--ignore` flag:

```shell
$ vedro run -i (--ignore) <file_or_dir>
```

For example, to run all scenarios in the project except those in the login/ and logout/ directories:

```shell
$ vedro run --ignore scenarios/login/ scenarios/logout/
```


### Selecting Specific Scenarios

To run a specific scenario, add the `@vedro.only` decorator to the scenario class definition:

```python
import vedro

@vedro.only
class Scenario(vedro.Scenario):
    subject = "register user"

```

Then run the scenarios using the following command:

```shell
$ vedro run
```

All scenarios with the `@vedro.only` decorator will run.


### Skipping Specific Scenarios

To skip a specific scenario, add the `@vedro.skip` decorator to the scenario class definition:

```python
import vedro

@vedro.skip
class Scenario(vedro.Scenario):
    subject = "register user"

```

Then run the scenarios using the following command:

```shell
$ vedro run
```

All scenarios will run, except for scenarios with the `@vedro.skip` decorator.


### Selecting Scenarios with Specific Subjects

To execute scenarios that have a specific subject, use the --subject flag:

```shell
$ vedro run --subject "register user"
```

This will run all scenarios where the `subject` is equal to "register user".


### Selecting Parameterized Scenarios

If you have [parameterized scenarios](./parameterized-scenarios), you can select a specific instance of a scenario by specifying the scenario index.

For example, consider the following `get_status.py` file with parameterized scenario:

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

To run only the first scenario (with a 200 status code), execute the following command:

<TerminalOutput>
{`
[1;37m$ vedro run scenarios/get_status.py::Scenario#1[0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ get ok status[0m[32m
[0m 
[0m[1;32m# 2 scenarios, 1 passed, 0 failed, 0 skipped[0m[34m (0.71s)[0m[34m
[0m
`}
</TerminalOutput>

To run only the second scenario (with a 404 status code), execute the following command:

<TerminalOutput>
{`
[1;37m$ vedro run scenarios/get_status.py::Scenario#2[0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [32m✔ get not found status[0m[32m
[0m 
[0m[1;32m# 2 scenarios, 1 passed, 0 failed, 0 skipped[0m[34m (0.56s)[0m[34m
[0m
`}
</TerminalOutput>

By specifying the scenario index, you can choose which parameterized scenario to run.
