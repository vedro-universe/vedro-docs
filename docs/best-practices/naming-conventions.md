---
id: naming-conventions
---

# Naming Conventions

Consistent and clear naming conventions enhance readability, maintainability, and overall test quality. This guide outlines best practices for structuring scenario names effectively across various testing domains, including API, UI, and mobile testing.

## Defining the Subject

The subject attribute should succinctly describe the **intent** of the scenario using simple, imperative language. It reflects the perspective of the user (or system) interacting with the piece of code under test. A well-structured subject improves clarity and ensures quick comprehension of the scenario's purpose.

```python
class Scenario(vedro.Scenario):
    subject = "log in as registered user"
```

Examples:
- reset forgotten password
- upload profile picture
- retrieve order history

### Adding Context or Input Conditions

To distinguish similar scenarios, add context or input conditions. This ensures clarity, especially when an action has multiple execution paths.

```python
class Scenario(vedro.Scenario):
    subject = "register via email"
```

Examples:
- register via phone
- register via social (Twitter)
- delete inactive account as admin

### Negative Scenarios

Negative scenarios describe cases where the user intent fails due to incorrect preconditions (invalid state or input data). These scenarios should begin with **«try to»** to explicitly indicate that the intended action was unsuccessful due to incorrect input or an invalid state.

```python
class Scenario(vedro.Scenario):
    subject = "try to login with incorrect password"
```

Examples:
- try to login with incorrect password — The user fails to log in (intent) due to an incorrect password (invalid input data).
- try to login as non-existing user — The user fails to log in (intent) because the account does not exist (invalid state).

## Structuring Scenario Steps

Each scenario is divided into clear, distinct steps to represent the flow of the interaction. The three main types of steps are Given, When, and Then.

### When: Defining the Action

Prefix step names with **«when»** to indicate an action taken by the user or system. The when step should align with the subject of the scenario.

```python
class Scenario(vedro.Scenario):
    ...

    def when_user_logs_in(self):
        ...
```

Examples:
- when user updates profile information
- when system processes payment
- when background job syncs data

:::warning
Each test should have only one «when» step.  If you need to add a second «when», consider writing a separate test instead.
:::

:::tip
If multiple roles exist, specify the actor explicitly (guest, user, admin). Otherwise, use a general term like user.
:::

### Then: Verifying the Outcomes

Prefix step names with **«then»** followed by **«it should»** (where "it" refers to the piece of code under test) and a description of the expected result.

```python
class Scenario(vedro.Scenario):
    ...

    def then_it_should_return_created_message(self):
        ...
```

Examples:
- then it should send email notification
- then it should display a welcome message
- then it should redirect to the dashboard

For additional assertions, use «and it should» or «but it should not» to clearly define expected and unintended behaviors.

Examples:
- and it should return created token
- but it should not send email (e.g., when the user has an unverified email)

### Given: Establishing Preconditions

Prefix step names with **«given»** to define preconditions or context. Properly structuring given steps ensures that each test begins in a well-defined state.

```python
class Scenario(vedro.Scenario):
    ...

    def given_registered_user(self):
        ...
```

Examples:
- given invalid user token
- given system has pending transactions
- given background job is scheduled

:::tip
If multiple conditions are needed, use additional given steps.
:::
