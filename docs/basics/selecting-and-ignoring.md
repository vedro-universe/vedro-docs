---
id: selecting-and-ignoring
---

# Selecting & Ignoring

Depending on the requirements of the development cycle, it's often necessary to select specific test scenarios to run and ignore others.  Vedro provides command-line arguments and decorators to precisely control test execution.

### Selecting Scenarios

To run scenarios located in a specific file or directory, use the `vedro run` command, followed by the path to the file or directory:

```shell
$ vedro run <file_or_dir>
```

For example:

```shell
# Select directory
$ vedro run scenarios/login/

# Select files
$ vedro run scenarios/register/register_new_user.py \
            scenarios/login/login_as_registered_user.py
```

### Ignoring Scenarios

To exclude certain scenarios from your test run that are located in a file or directory, use the `-i` or `--ignore` argument followed by the path to the file or directory:

```shell
$ vedro run -i (--ignore) <file_or_dir>
```

For instance:

```shell
$ vedro run -i scenarios/logout/
```

:::info Note
Ignoring scenarios means they are entirely excluded from the run, including from summary statistics. If you want to merely skip scenarios instead of wholly ignoring them, refer to the "[Skipping Scenarios](../features/skipping-scenarios)" page.
:::

### Combining Selecting and Ignoring

In certain situations, you may want to run a collection of test scenarios from a particular directory but ignore one or more individual scenarios within that directory. Vedro enables this by allowing the combining of run and ignore commands:

```shell
$ vedro run scenarios/login/ -i scenarios/login/try_to_login_as_nonexisting_user.py
```

This command runs all scenarios in the "login/" directory, excluding the "try_to_login_as_nonexisting_user.py" scenario.

### Selecting Specific Scenarios

To execute a specific scenario, add the `@vedro.only` decorator to the scenario class definition. This decorator tells the framework to run only the decorated scenario, ignoring all others. Here's an example:

```python
import vedro

@vedro.only
class Scenario(vedro.Scenario):
    subject = "register new user"
```

Then, simply run:

```shell
$ vedro run
```

:::info Note
If any scenario is decorated with `@vedro.only`, all scenarios with this decorator will be executed
:::

### Selecting Scenarios with Specific Subjects

To run scenarios that have a specific subject, use the `--subject` argument followed by the subject enclosed in quotes:

```shell
$ vedro run --subject '<subject>'
```

For example:

```shell
$ vedro run --subject 'register new user'
```

This command executes the scenario with the subject "register new user".

:::info Note
If multiple scenarios share the same subject, they will all be executed
:::

### Selecting Parameterized Scenarios

If you have scenarios that are [parameterized](../features/parameterized-scenarios), you can select a specific instance by specifying the scenario's index.

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

```
$ vedro run scenarios/get_status.py::Scenario#1
```

To run only the second scenario (with a 404 status code), execute the following command:

```
$ vedro run scenarios/get_status.py::Scenario#2
```
