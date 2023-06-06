---
id: chapter1-first-steps
toc_max_heading_level: 2
pagination_prev: tutorial/tutorial
pagination_next: tutorial/api/chapter2-data-models
---

import TemplateScenario from './TemplateScenario';
import { registerScenarioSubject, registerScenarioGiven,
         registerScenarioWhen, registerScenarioThen } from './snippets';
import TerminalOutput from '@site/src/components/TerminalOutput';
import TableOfContents from './TableOfContents';

# Chapter 1 — First Steps

<TableOfContents current="chapter1" />

## Intro

The best way to learn is by doing, so let's get some hands-on experience and cover a straightforward service with automated tests - a chat platform that allows registered users to communicate with each other. To get started, we'll take a look at the API documentation, which outlines the various requests and data formats needed to interact with the chat service.

Here's an overview of the key API endpoints that we'll be working with:

| Method      | Description |
| ----------- | ----------- |
| <code style={{ background: "#d8f2fb" }}>POST /auth/register</code>            | Register a new user with a username and password                                                                  |
| <code style={{ background: "#d8f2fb" }}>POST /auth/login</code>               | Authenticate an existing user                                                                                     |
| <code style={{ background: "#d8f2fb" }}>POST /chats/<chat_id>/messages</code> | Send a message to a chat with the specified chat_id. <br/> A new chat will be created if it doesn't already exist |
| <code style={{ background: "#caeac8" }}>GET /chats/<chat_id>/messages</code>  | Retrieve messages for a chat with the specified chat_id                                                           |

To ensure an uninterrupted learning experience without getting sidetracked by dependency installations, let's proceed with installing everything we need.

```shell
# Install the required packages using pip
$ pip install vedro httpx

# Install the necessary plugins
$ vedro plugin install vedro-valera-validator
```

## Let’s Do It

Once everything is set up, we can proceed to write our first test. Vedro framework is based on scenario tests, which allows us to simulate user interactions and validate their outcomes (or side effects). As interactions with the chat service require authentication, and to authenticate we need a registered account, our first scenario will focus on the registration of a new user. This initial test will help us ensure that the registration process works correctly and provides the necessary access to the chat platform.

### Subject

A scenario starts with a **subject** that represents the user's intention to achieve a desired outcome.

<TemplateScenario block={registerScenarioSubject} />

### Given

The path to achieving this goal consists of a series of steps. First, there are the **arrange steps**, where all necessary data is prepared for the primary action to be taken. This might involve setting up initial conditions, gathering relevant inputs, or configuring the environment for the test.

<TemplateScenario block={registerScenarioGiven} />

### When

Next, there is the **primary action (act)** step. In this step, the user interacts with the application, system, or component being tested. This interaction could be in the form of an API call, a button click, or any other event that triggers the desired functionality. The primary action is a crucial part of the scenario, as it sets the stage for evaluating whether the application is behaving as expected.

<TemplateScenario block={registerScenarioWhen} />

### Then

Finally, there are the **assert steps**, where the application's responses or side effects are checked to see if they match what is expected. This involves examining output data, verifying system states, or even observing the application's behavior to ensure that the desired outcome has been achieved. The assert steps provide validation and confidence that the application is functioning correctly and meeting the user's intentions.

<TemplateScenario block={registerScenarioThen} />

In the context of our chat service, the arrange step sets up the required data, such as the user credentials. The act step simulates the user interaction, like registering a new user through an API call. Finally, the assert step checks the application's response to ensure the user registration was successful and the system behaves as expected. These components work together to create a robust and effective test scenario.

To run the test, use the `vedro run` command:
```shell
$ vedro run -vv
```

The command will run all the test scenarios in `scenarios/` directory and display the results, indicating which tests have passed, failed, or been skipped. In this case, you should see that the "register new user" scenario has passed.

The `-vv` flag increases the verbosity of the test output. In case a scenario fails, this flag provides more detailed information about the test run to help you identify and troubleshoot the issue.

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ register new user[0m[32m
 
[0m[1;32m# 1 scenarios, 1 passed, 0 failed, 0 skipped[0m[34m (0.25s)[0m[34m
[0m
`}
</TerminalOutput>

## Read More

Vedro is not just a test runner, but a full-fledged framework with its own ecosystem and a set of best practices that enables you to write clear and maintainable tests.

In the [next chapter](./chapter2-data-models.md), we'll build upon this foundation by refining our test and exploring some best practices for writing automated tests.
