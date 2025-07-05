---
id: naming-for-better-tests
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Naming for Better Tests

Clear, consistent naming helps your scenarios stay readable and maintainable, especially as your test suite grows. This guide offers practical naming tips for subjects and steps, aligned with Vedro’s principles of being **readable**, **scalable**, and **pragmatic**.

These aren’t hard rules. Vedro doesn’t enforce naming conventions. Think of them as helpful defaults that you can adapt to your project or team style.

## Defining the Subject

The `subject` should describe the **intent** of the scenario: what action is being tested, or what the user/system is trying to do. Keep it short, direct, and ideally from the user’s perspective.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
class Scenario(vedro.Scenario):
    subject = "log in as registered user"
    ...
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
@scenario()
def log_in_as_registered_user():
    ...
```

  </TabItem>
</Tabs>

🍏 **Do This:**
- `reset forgotten password`
- `upload profile picture`
- `retrieve order history`

🍎 **Avoid This:**
- `test login flow` (too generic, prefix "test" adds no value (all tests are tests)
- `should successfully authenticate user with valid credentials` (too wordy, reads like assertion)
- `LoginTest123` (cryptic naming that provides no context)

### Adding Context or Conditions

If an action can happen under different conditions, reflect those conditions in the subject. This is especially useful when inputs, data, or system states vary.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
class Scenario(vedro.Scenario):
    subject = "register via email"
    ...
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
@scenario()
def register_via_email():
    ...
```

  </TabItem>
</Tabs>

🍏 **Do This:**
- `log in as admin`
- `register via Google OAuth`
- `delete inactive account as admin`

🍎 **Avoid This:**
- `admin scenario` (missing the actual action being tested)
- `check delete account` (vague verb that doesn't specify the intent)
- `handle edge case` (too generic, doesn't describe the specific case)

### Naming Negative Scenarios

When a scenario is meant to fail (due to bad input or invalid state), prefix it with **"try to ..."**. This signals to the reader that the failure is intentional and part of the test design.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
class Scenario(vedro.Scenario):
    subject = "try to login with incorrect password"
    ...
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
@scenario()
def try_to_login_with_incorrect_password():
    ...
```

  </TabItem>
</Tabs>

🍏 **Do This:**
- `try to login with incorrect password`
- `try to register with already used email`
- `try to login as non-existing user`

🍎 **Avoid This:**
- `fail login` (ambiguous whether failure is expected or a bug)
- `unauthorized access` (sounds like a security issue, not a test case)
- `negative test case 3` (numbered tests lack descriptive context)

## Structuring Scenario Steps

A typical scenario includes *given*, *when*, and *then* steps. At minimum, it should include:
- `when` step that performs the main action
- `then` step that verifies the outcome

Use names that make each step's purpose obvious, but don’t get caught up in strict formats. Favor clarity over ceremony.

### Given: Setting Up Preconditions

Use `given` to prepare the scenario’s starting state: set up data, files, conditions, or system flags.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
class Scenario(vedro.Scenario):
    subject = "log in as registered user"
    ...

    def given_registered_user(self):
        ...
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
@scenario()
def log_in_as_registered_user():
    ...

    with given("registered user"):
        ...
```

  </TabItem>
</Tabs>

🍏 **Do This:**
- `given invalid user token`
- `given expired session`
- `given published blog post`

🍎 **Avoid This:**
- `setup` (too generic, doesn't specify what's being set up)
- `prepare test data` (vague about what data is being prepared)
- `given_step_1` (sequential numbering provides no meaningful context)

:::tip
You can use multiple `given` steps to define separate preconditions when needed.
:::

### When: Performing the Action

Use `when` for the primary action being tested. It should align with the subject and clearly describe what is happening.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
class Scenario(vedro.Scenario):
    subject = "log in as registered user"
    ...

    def when_user_logs_in(self):
        ...
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
@scenario()
def log_in_as_registered_user():
    ...

    with when("user logs in"):
        ...
```

  </TabItem>
</Tabs>

🍏 **Do This:**
- `when user updates profile information`
- `when system processes payment`
- `when background job syncs data`

🍎 **Avoid This:**
- `when_step` (placeholder name with no descriptive value)
- `action` (too abstract, doesn't specify what action)
- `execute` (vague verb that could mean anything)

:::warning
Each scenario should have exactly **one when step**. If you need multiple actions, split them into separate scenarios.
:::

### Then: Verifying the Outcomes

Use `then` to assert what changed: what result or side effect is expected. Write names that reflect the actual check, not just the general outcome.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
class Scenario(vedro.Scenario):
    subject = "log in as registered user"
    ...

    def then_it_should_return_auth_token(self):
        ...
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
@scenario()
def log_in_as_registered_user():
    ...

    with then("it should return auth token"):
        ...
```

  </TabItem>
</Tabs>

🍏 **Do This:**
- `then it should send confirmation email`
- `then it should redirect to the dashboard`
- `then it should display a welcome message`

🍎 **Avoid This:**
- `assert success` (doesn't specify what "success" means)
- `then successful login` (describes state, not expected behavior)
- `verify result` (too vague about what's being verified)

:::tip
If you need to make additional assertions, you can use **"and ..."** or **"but ..."** steps to describe follow-up effects:
- `and it should return created token`
- `but it should not send email` (e.g., when the user has an unverified email)
:::

## Summary

Stick to clear, action-oriented names that reflect the intent of each step and scenario. You’re not writing test code for the machine; you’re writing documentation for your future self (and your teammates).

When in doubt, favor clarity. A good test name tells you what the test is doing before you even read the code.
