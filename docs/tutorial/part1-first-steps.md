---
id: part1-first-steps
title: Tutorial
toc_min_heading_level: 5
toc_max_heading_level: 5
---
# Tutorial — Part 1: First Steps

import FirstScenario from './FirstScenario';
import TerminalOutput from '../../src/components/TerminalOutput';

The best way to learn is by doing, so let's get some hands-on experience and cover a straightforward service with automated tests - a chat platform that allows registered users to communicate with each other. To get started, we'll take a look at the API documentation, which outlines the various requests and data formats needed to interact with the chat service.

Here's an overview of the key API endpoints that we'll be working with:

- `POST /auth/register` — Register a new user with a `username` and `password`
- `POST /auth/login` — Authenticate an existing user
- `POST /chats/<chat_id>/messages` — Send a message to a chat with the specified `chat_id` (creates new chat if absent)
- `GET /chats/<chat_id>/messages` — Retrieve messages for a chat with the specified `chat_id`

To make sure we don't get sidetracked by installing dependencies while we're learning, let's go ahead and install a package that will take care of everything for us.

```shell
$ pip install git+https://github.com/vedro-universe/chat-api-tutorial
```

## Let’s do it

Once everything is set up, we can proceed to write our first test. Vedro framework is based on scenario tests, which allows us to simulate user interactions and validate their outcomes (or side effects). As interactions with the chat service require authentication, and to authenticate we need a registered account, our first scenario will focus on the registration of a new user. This initial test will help us ensure that the registration process works correctly and provides the necessary access to the chat platform.

A scenario starts with a **subject** that represents the user's intention to achieve a desired outcome.

The path to achieving this goal consists of a series of steps. First, there are the **arrange steps**, where all necessary data is prepared for the primary action to be taken. This might involve setting up initial conditions, gathering relevant inputs, or configuring the environment for the test.

Next, there is the **primary action (act)** step. In this step, the user interacts with the application, system, or component being tested. This interaction could be in the form of an API call, a button click, or any other event that triggers the desired functionality. The primary action is a crucial part of the scenario, as it sets the stage for evaluating whether the application is behaving as expected.

Finally, there are the **assert steps**, where the application's responses or side effects are checked to see if they match what is expected. This involves examining output data, verifying system states, or even observing the application's behavior to ensure that the desired outcome has been achieved. The assert steps provide validation and confidence that the application is functioning correctly and meeting the user's intentions.

In the context of our chat service, the arrange step sets up the required data, such as the user credentials. The act step simulates the user interaction, like registering a new user through an API call. Finally, the assert step checks the application's response to ensure the user registration was successful and the system behaves as expected. These components work together to create a robust and effective test scenario.

<FirstScenario />

To run the test, use the `vedro run` command:
```shell
$ vedro run -vv
```

The command will run all the test scenarios in `scenarios/` directory and display the results, indicating which tests have passed, failed, or been skipped. In this case, you should see that the "register new user" scenario has passed.

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [32m✔ register new user[0m[32m
 
[0m[1;32m# 1 scenarios, 1 passed, 0 failed, 0 skipped[0m[34m (0.25s)[0m[34m
[0m
`}
</TerminalOutput>

Vedro is not just a test runner, but a full-fledged framework with its own ecosystem and a set of best practices that enables you to write clear and maintainable tests.

In the next chapter, we'll build upon this foundation by refining our test and exploring some best practices for writing automated tests.
