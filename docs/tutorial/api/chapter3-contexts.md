---
id: chapter3-contexts
---

import TemplateScenario from './TemplateScenario';
import { registerScenarioFinal, loginScenarioWithoutContext, registeredUserContext,
         loginScenarioWithContext, loginScenarioValidateToken } from './snippets';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Underlined from '@site/src/components/Underlined';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TableOfContents from './TableOfContents';

# Chapter 3 — Contexts

<TableOfContents current="chapter3" />

## Quick Recap

In the previous chapters, we crafted our first scenario focused on registering a new user:

<TemplateScenario block={registerScenarioFinal} />

After creating an account, we can now move on to the next scenario — the user authentication process.

## Setting the Stage for Authentication

Authentication, in our case, requires sending a `POST /auth/login` request with `username` and `password` in the JSON body. At first glance, it might seem like we could use an approach similar to our registration scenario:

<TemplateScenario block={loginScenarioWithoutContext} />

However, this scenario failed, returning a 400 status code with an error message stating, <Underlined>"User does not exist"</Underlined>. This error occurs because we attempted to authenticate a user who had not yet been registered. This highlights a critical point: we must first put our application in the right state before executing the primary action.

This is where the concept of **contexts** in Vedro comes into play.

## Understanding Vedro Contexts

A context in Vedro is essentially a function that helps set up the environment or state for our scenario. It ensures that all prerequisites for a given scenario are met before execution.

Let's see how to create a context.

<TemplateScenario block={registeredUserContext} />

:::info

To efficiently manage contexts, they're typically stored in a `contexts/` directory, with filenames matching their related context functions

:::

With this context at our disposal, we can ensure the creation of a user before attempting to authenticate them. We use the context in the "given" step to register a user before trying to log them in. Here's how it looks in practice:

<TemplateScenario block={loginScenarioWithContext} />

Now, the scenario passes as expected because the user is registered before we attempt to authenticate them.

## The Power of Contexts

By incorporating the `registered_user` context, we ensure that our scenario is truly atomic, meaning it tests exactly one thing – the user login. This way, we prevent our scenario from being polluted by the setup details of user registration.

Contexts not only allow us to set prerequisites for our scenarios but also provide reusability across different scenarios. For instance, any scenario that requires a registered user can now simply use this `registered_user` context. This promotes modularity and reduces code duplication in our tests.

## Final Touch: Dealing with Token

While our scenario for logging in as a registered user is now functioning correctly, there's an important aspect we still need to handle — the token. As part of the login process, the `/auth/login` method returns a token, a key component in subsequent authenticated user actions. Therefore, validating this token in our scenario is a critical step.

First, we need to define a schema for this token:

```python
# ./schemas/token.py
from d42 import schema
from .user import NewUserSchema

AuthTokenSchema = schema.dict({
    "username": NewUserSchema["username"],
    "token": schema.str.alphabet("0123456789abcdef").len(40),
    "created_at": schema.int.min(0),
})
```

This schema has the following components:

1. The `username` field should match the username defined in the `NewUserSchema`.
2. The `token` field is a 40-character string composed of hexadecimal characters (0-9, a-f).
3. The `created_at` field is a positive integer representing a Unix timestamp.

With this definition in place, we can now incorporate the schema into our scenario.

<TemplateScenario block={loginScenarioValidateToken} />

With this addition, our scenario now also verifies the structure of the response, ensuring that our API behaves as expected and returns data that adheres to the defined contract.

## Summary

In summary, contexts in Vedro are a robust tool for managing prerequisite conditions for your scenarios, leading to clean, reliable, and maintainable tests. As we progress, we'll encounter more complex scenarios where contexts will truly shine.
