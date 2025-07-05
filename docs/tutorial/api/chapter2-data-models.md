---
id: chapter2-data-models
toc_max_heading_level: 2
pagination_prev: tutorial/api/chapter1-first-steps
pagination_next: tutorial/api/chapter3-contexts
---

import TemplateScenario from './TemplateScenario';
import { registerScenarioRecap, registerScenarioGenerate,
         registerScenarioValidate, registerScenarioSubstitute } from './snippets';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TableOfContents from './TableOfContents';
import Link from '@site/src/components/Link';

# Chapter 2: Data Models

<TableOfContents current="chapter2" />

## Quick Recap

Taking a brief look back at our progress, in the [initial chapter](./chapter1-first-steps.md), we successfully crafted our first test scenario for the chat service. The test's purpose was to confirm the proper functionality of the user registration process.

<TemplateScenario block={registerScenarioRecap} />

Now, it's time to enhance our test while exploring best practices for crafting automated tests.

## Introducing Data Models

When we run the above test a second time, it fails because the username "bob" is already registered.

<TerminalOutput>
{`
[1;37m$ vedro run[0m[1;37m
[0m
[0mScenarios
[1m* [0m[1m
[0m [31m✗ register new user[0m[31m
[0m   [32m✔ given_new_user[0m[32m
[0m   [32m✔ when_guest_registers[0m[32m
[0m   [31m✗ then_it_should_return_success_response[0m[31m
[0m[31m╭─[0m[31m──────────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m────────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m./scenarios/[0m[1;33mfirst_scenario.py[0m:[94m17[0m in [92mthen_it_should_return_success_response[0m [31m           │[0m
[31m│[0m                                                                                       [31m│[0m
[31m│[0m   [2m14 [0m[2m│   │   [0m[96mself[0m.response = httpx.post([33mf[0m[33m"[0m[33m{[0mAPI_URL[33m}[0m[33m/auth/register[0m[33m"[0m, json=[96mself[0m.user)   [31m│[0m
[31m│[0m   [2m15 [0m[2m│   [0m                                                                             [31m│[0m
[31m│[0m   [2m16 [0m[2m│   [0m[94mdef[0m [92mthen_it_should_return_success_response[0m([96mself[0m):                            [31m│[0m
[31m│[0m [31m❱ [0m17 [2m│   │   [0m[94massert[0m [96mself[0m.response.status_code == [94m200[0m                                  [31m│[0m
[31m│[0m   [2m18 [0m                                                                                 [31m│[0m
[31m╰───────────────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError: [0massert [1;36m400[0m == [1;36m200[0m
 +  where [1;36m400[0m = [1m<[0m[1;95mResponse[0m[39m [0m[1;39m[[0m[1;36m400[0m[39m Bad Request[0m[1;39m][0m[39m>.status_code[0m
 
 
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.28s)[0m[34m
[0m
`}
</TerminalOutput>

This issue arises due to the hardcoded data used in our test. To maintain the independence of each test, we must introduce variability, achievable through data models. In this context, we will use the <Link to="https://d42.sh/docs/quick-start">d42 library</Link> to define, generate, validate, and substitute data based on the models we design.

Let's compare hardcoded data and a data model.

**Hardcoded Data:**

```python
username = "bob"
password = "qweqwe"
```

**Data Model:**

```python
from string import ascii_lowercase
from d42 import schema

NewUserSchema = schema.dict({
    "username": schema.str.alphabet(ascii_lowercase).len(3, 12),
    "password": schema.str.len(6, ...),
})
```

In this data model:
- `username` is a string containing between 3 to 12 lowercase letters
- `password` is a string with a minimum of 6 characters

_(these specifications are based on the method documentation available at <Link to="https://chat-api-tutorial.vedro.io/docs#/default/auth_register">chat-api-tutorial.vedro.io/docs</Link>)_

## Data Generation

Our new data model allows the <Link to="https://d42.sh/docs/features/generation">generation</Link> of unique data for each test:

```python
from d42 import fake

fake(NewUserSchema)
# {'username': 'mwpd', 'password': 'EMiqcS2L9 x6UgxUuirjT9'}

fake(NewUserSchema)
# {'username': 'kqnhsrqito', 'password': 'XXlYxBaiXAvzj5Yp9pdR'}

fake(NewUserSchema)
# {'username': 'tzybe', 'password': 'Hr67Wxm6WLLLkhHFJm3SjA'}
```

Implementing this in our test scenario eliminates the problem of data dependency:

<TemplateScenario block={registerScenarioGenerate} />

:::info

To keep our data models organized, we should save them in the `schemas/` directory. In this case, we have created a file named `user.py` inside the schemas directory and placed the `NewUserSchema` definition there.

:::

## Data Validation

The beauty of data models is their ability not only to generate data but also <Link to="https://d42.sh/docs/features/validation">validate it</Link>. The validation process ensures that the received response fits our defined data model:

<Tabs>
  <TabItem value="correct-fields" label="🍏 OK" default>

```python
response_body = {
    "username": "bob",
    "password": "qweqwe"
}
assert response_body == NewUserSchema

# highlight-next-line
# No Errors
```

  </TabItem>
  <TabItem value="incorrect-username" label="🍎 Incorrect Username">

```python
response_body = {
    # highlight-next-line
    "username": "x",
    "password": "qweqwe"
}
assert response_body == NewUserSchema

# d42.ValidationException:
# highlight-next-line
#  - Value <class 'str'> at _['username'] must have at least 3 elements, but it has 1 element
```

  </TabItem>
  <TabItem value="incorrect-password" label="🍎 Incorrect Password">

```python
response_body = {
    "username": "alice",
    # highlight-next-line
    "pass": "qweqwe"
}
assert response_body == NewUserSchema

# d42.ValidationException:
# highlight-next-line
#  - Key _['password'] does not exist
```

  </TabItem>
</Tabs>

This validation step ensures that the response has the correct structure and field types:

<TemplateScenario block={registerScenarioValidate} />

The test now checks not only that the `username` and `password` fields exist and are strings, but also that they meet the criteria defined in our data model.

For even more granular validation, we can refine the schema by <Link to="https://d42.sh/docs/features/substitution">substituting</Link> our generated values. This allows us to validate not just the type, but also the specific values of the fields:

```python
NewUserSchema % {
    "username": "bob",
    "password": "qweqwe",
}
```

This will substitute the values using the `%` operator, similar to <Link to="https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting">printf-style string formatting in Python</Link>. The result of the substitution will be a refined schema:

<Tabs>
  <TabItem value="substituted" label="Substituted" default>

```python
schema.dict({
    'username': schema.str('bob').alphabet(ascii_lowercase).len(3, 12),
    'password': schema.str('qweqwe').len(6, ...)
})
```

  </TabItem>
  <TabItem value="original" label="Original">

```python
schema.dict({
    'username': schema.str.alphabet(ascii_lowercase).len(3, 12),
    'password': schema.str.len(6, ...),
})
```

  </TabItem>
</Tabs>

We can apply this refinement to our test scenario:

<TemplateScenario block={registerScenarioSubstitute} />

Or simply:

```python
    ...

    def and_then_it_should_return_created_user(self):
        assert self.response.json() == NewUserSchema % self.user
```

## Wrap-up

In this chapter, we have successfully enhanced our test by incorporating data models. This not only makes our tests more robust by eliminating data dependency but also makes them easier to maintain and extend.

In the [next chapters](./chapter3-contexts.md), we'll dive deeper into advanced test scenarios, explore test organization, and further examine best practices in test automation.
