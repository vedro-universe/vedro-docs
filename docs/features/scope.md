---
id: scope
---

import TerminalOutput from '@site/src/components/TerminalOutput';

# Scenario Scope

## What is Scope?

In Vedro, the Scope serves as a snapshot of important variables, capturing their current states when a test scenario fails. This snapshot offers valuable insights into the execution environment, making it highly useful for debugging and understanding the cause of the test failure.

## A Practical Example

To better understand how the Scope works, consider the following real-world example.

Imagine a scenario that tests sending a chat message. The process begins with a logged-in user, sends a message via the [ChatApi](https://chat-api-tutorial.vedro.io/docs#/default/send_message) and then verifies that the received response meets expectations.

```python
import vedro
from contexts import logged_in_user
from interfaces import ChatApi

class Scenario(vedro.Scenario):
    subject = "send message"

    def given_user_token(self):
        self.token = logged_in_user()

    def given_message(self):
        self.message = "banana"

    def when_user_sends_message(self):
        self.response = ChatApi().send(self.message, self.token["token"])

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    def and_it_should_return_sent_message(self):
        assert self.response.json() == {
            "username": self.token["username"],
            "text": self.message,
        }
```

In this scenario, the variables `token`, `message`, and `response` are critical to the test's success. They are stored as instance variables within the Scenario class:
- **token:** Retains the user's token details
- **message:** Holds the chat message to be sent
- **response:** Captures the server's reply

### What Happens When a Test Fails?

When you run the command with verbose output (`-v`) and a test scenario fails, a snapshot of key variables at that specific moment is captured and displayed as the Scope, alongside the exception.

```shell
$ vedro run -v
```

**Exception:**

<TerminalOutput>
{`
[0m[31m╭─[0m[31m─────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m──────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m./scenarios/send_message/[0m[1;33msend_message.py[0m:[94m28[0m                                    [31m│[0m
[31m│[0m   [2m26 [0m[2m│   [0m                                                                      [31m│[0m
[31m│[0m   [2m27 [0m[2m│   [0m[94mdef[0m [92mand_it_should_return_sent_message[0m([96mself[0m):                          [31m│[0m
[31m│[0m [31m❱ [0m28 [2m│   │   [0m[94massert[0m [96mself[0m.response.json() == MessageSchema % {                  [31m│[0m
[31m│[0m   [2m29 [0m[2m│   │   │   [0m[33m"[0m[33musername[0m[33m"[0m: [96mself[0m.token[[33m"[0m[33musername[0m[33m"[0m],                           [31m│[0m
[31m│[0m   [2m30 [0m[2m│   │   │   [0m[33m"[0m[33mtext[0m[33m"[0m: [96mself[0m.message[[33m"[0m[33mtext[0m[33m"[0m],                                 [31m│[0m
[31m│[0m   [2m31 [0m[2m│   │   [0m}                                                                 [31m│[0m
[31m╰────────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mValidationException: [0m
 - Value [1m<[0m[1;95mclass[0m[39m [0m[32m'str'[0m[1m>[0m at _[1m[[0m[32m'text'[0m[1m][0m must be equal to [32m'banana'[0m, but [32m'0RLyemKwG53'[0m given
`}
</TerminalOutput>

**Scope:**

<TerminalOutput>
{`
[1;34mScope[0m[1;34m
[0m[34m token: [0m{
    "username": "vzwmkast",
    "token": "0f8fefc25185eb869fd5acbe6b6778523d6172b7",
    "created_at": 1694250002
}
[34m message: [0m{
    "text": "0RLyemKwG53",
    "chat_id": "Cuyjp"
}
[34m response: [0mResponse:
[94mHTTP[0m/[94m1.1[0m [94m200[0m [96mOK[0m
[96mcontent-type[0m: application/json; charset=utf-8
[96mcontent-encoding[0m: gzip
{
[2;90m│   [0m[94m"username"[0m:[90m [0m[33m"vzwmkast"[0m,
[2;90m│   [0m[94m"text"[0m:[90m [0m[33m"banana"[0m,
[2;90m│   [0m[94m"sent_at"[0m:[90m [0m[94m1694250002[0m
}
`}
</TerminalOutput>

## Benefits of Using Scope

- **Debugging Made Easier:** With Scope, debugging becomes more straightforward. You receive an immediate snapshot of crucial variables at the moment of failure. This eliminates guesswork and accelerates the troubleshooting process.

- **Replicating Errors:** Encountering an error once is challenging, but consistently reproducing it is even more so. The Scope output serves as a valuable tool, significantly simplifying the recreation of the error for more detailed testing and analysis.

- **Team Communication:** Collaborative debugging can be complicated without the right information. Sharing a snapshot of the Scope when a test fails gives team members a clearer picture of the situation, streamlining both communication and resolution.
