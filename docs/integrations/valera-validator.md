---
id: valera-validator
title: Schema Validator
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@site/src/components/Link';
import CodeBlock from '@theme/CodeBlock';

# Schema Validator

<Link to="https://pypi.org/project/vedro-valera-validator/">vedro-valera-validator</Link> is a plugin for the Vedro framework that utilizes the <Link to="https://pypi.org/project/valera">valera validator</Link>, a package designed for data validation based on <Link to="https://d42.sh/docs/quick-start">d42 (district42) schemas</Link>. Valera validator provides a simple yet powerful approach to ensure your data aligns perfectly with your expectations.

## Setting Up

<Tabs>
  <TabItem value="quick" label="Quick" default>

For a quick installation, you can use a plugin manager like so:

```shell
$ vedro plugin install vedro-valera-validator
```

  </TabItem>
  <TabItem value="manual" label="Manual">

If you prefer a manual approach, follow these steps:

1. Install the package using pip:

```shell
$ pip3 install vedro-valera-validator
```

2. Then, enable the plugin in the `vedro.cfg.py` configuration file:

```python
# ./vedro.cfg.py
import vedro
import vedro_valera_validator


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class ValeraValidator(vedro_valera_validator.ValeraValidator):
            enabled = True
```

  </TabItem>
</Tabs>

## Traditional Data Validation

Traditionally, you might have used standard assertion to compare your actual data with your expected data. Here, an HTTP GET request retrieves a user's information, which is then validated against the expected data through an assertion.

```python
import vedro
import httpx

class Scenario(vedro.Scenario):
    subject = "retrieve users"

    def when_guest_retrieves_users(self):
        self.response = httpx.get("/api/users/1")

    def then_it_should_return_user(self):
        assert self.response.json() == {
            "id": 1,
            "name": "Bob",
            "created_at": "2020-01-01T00:00:00",
            "is_deleted": False,
        }
```

However, if the validation fails, standart `AssertionError` provides limited insight into why the test failed. You're often left with just a side-by-side comparison of the expected and actual data, which can be time-consuming to decipher, especially with complex data.

<CodeBlock className='word-wrap'>{`
AssertionError: assert {'created_at': '2020-01-00T00:00:00', 'id': 1, 'is_deleted': True, 'name': 'Bob'} == {'created_at': '2020-01-01T00:00:00', 'id': 1, 'is_deleted': False, 'name': 'Bob'}
 +  where {'created_at': '2020-01-00T00:00:00', 'id': 1, 'is_deleted': True, 'name': 'Bob'} = <scenarios.retrieve_users.Response object at 0x102da1120>.body
`}</CodeBlock>

## Leveling Up Data Validation

With the valera package, data validation becomes more comprehensive and insightful. By incorporating valera into your tests, you can enjoy more detailed feedback when validation fails. This is made possible by `from_native` function from the d42 package, which takes your expected data and transforms it into a d42 schema.

:::note

As <Link to="https://pypi.org/project/d42/">d42</Link> is a dependency of the <Link to="https://pypi.org/project/vedro-valera-validator/">vedro-valera-validator</Link> plugin, there's no need to install it separately. It's automatically installed alongside the plugin.

:::

```python
import vedro
import httpx
# highlight-start
from d42 import from_native
# highlight-end

class Scenario(vedro.Scenario):
    subject = "retrieve users"

    def when_guest_retrieves_users(self):
        self.response = httpx.get("/api/users/1")

    def then_it_should_return_user(self):
        # highlight-start
        assert self.response.json() == from_native({
        # highlight-end
            "id": 1,
            "name": "Bob",
            "created_at": "2020-01-01T00:00:00",
            "is_deleted": False,
        })
```

<details>
    <summary>behind-the-scenes transformation</summary>
    <div>

```python
from d42 import from_native, schema

from_native({
    "id": 1,
    "name": "Bob",
    "created_at": "2020-01-01T00:00:00",
    "is_deleted": False,
})

# is equivalent to

schema.dict({
    "id": schema.int(1),
    "name": schema.str("Bob"),
    "created_at": schema.str("2020-01-01T00:00:00"),
    "is_deleted": schema.bool(False)
})
```

</div>
</details>

The schema is then compared with the actual data, and any discrepancies are highlighted. When a validation fails, valera provides a clear explanation of each mismatch between the expected and actual data, along with the location of each mismatch within the data structure.

<TerminalOutput>
{`
[1;91mValidationException: [0m
[0m - Value [1m<[0m[1;95mclass[0m[39m [0m[32m'str'[0m[1m>[0m at _[1m[[0m[32m'created_at'[0m[1m][0m must be equal to [0m[32m'2020-01-01T00:00:00'[0m[0m, but [0m[32m'2020-01-00T00:00:00'[0m[0m given[0m
[0m - Value [1m<[0m[1;95mclass[0m[39m [0m[32m'bool'[0m[1m>[0m at _[1m[[0m[32m'is_deleted'[0m[1m][0m must be equal to [3;91mFalse[0m, but [3;92mTrue[0m given
`}
</TerminalOutput>

Provided validation exception indicates that the `created_at` value and `is_deleted` values do not match the expected data. Such a detailed error message allows you to quickly understand the discrepancy saving you time and frustration.

## More Info

You can find more about how to use valera and d42 (district42) schemas in your projects in the <Link to="https://d42.sh/docs/quick-start">official documentation</Link>. With valera, data validation becomes less of a challenge and more of a strength.
