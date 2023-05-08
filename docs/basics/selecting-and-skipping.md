---
id: selecting-and-skipping
title: "Selecting & Skipping"
slug: selecting-and-skipping
---
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

To run scenarios with a specific subject, use the `--subject` flag:

```shell
$ vedro run --subject "register user"
```

All scenarios with `subject == "register user"` will run.
