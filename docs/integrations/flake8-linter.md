---
id: flake8-linter
---

# Flake8 Linter

[Flake8-Vedro](https://pypi.org/project/flake8-vedro/) is a specialized flake8 linter designed for the Vedro framework. It improves code quality in Vedro-based projects by enforcing rules that enhance maintainability and readability in test development.

## Installation

To install `flake8-vedro`, run the following command:

```shell
$ pip install flake8-vedro
```

## Usage

Consider an example project with this scenario:

```python
# ./scenarios/get_book_details.py
import vedro
import httpx

class Scenario(vedro.Scenario):
    subject = ""

    def given_book_id(self):
        self.book_id = 1234

    def when_user_retrieves_book(self):
        self.response = httpx.get(f"/api/books/{self.book_id}")

    def then_it_should_return_book_details(self):
        assert self.response.json() == {
            "id": self.book_id,
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
        }
```

To check for linting errors, use the command below:

```shell
$ flake8
```

Executing this command will display output highlighting linting errors:

```shell
./scenarios/get_book_details.py:4:1: E302 expected 2 blank lines, found 1
./scenarios/get_book_details.py:5:5: VDR105 subject in scenario should not be empty
```

In this output, [E302](https://www.flake8rules.com/rules/E302.html) is a standard Flake8 spacing rule, while [VDR105](https://github.com/mytestopia/flake8-vedro/blob/main/flake8_vedro/rules/VDR105.md) is a custom rule for Vedro ensuring scenarios have defined subjects.

:::tip
Refer to the [flake8-vedro](https://github.com/mytestopia/flake8-vedro/blob/main/README.md#rules) repository for a complete list of rules
:::

## Configuration

Since `flake8-vedro` is a Flake8 plugin,  its configuration aligns with the [Flake8 configuration guidelines](https://flake8.pycqa.org/en/latest/user/configuration.html).

For example, to ignore a specific rule such as `VDR105`, execute the following command:

```shell
$ flake8 --extend-ignore VDR105
```

Alternatively, add the rule to `setup.cfg`:

```ini
[flake8]
extend-ignore = VDR105
```
