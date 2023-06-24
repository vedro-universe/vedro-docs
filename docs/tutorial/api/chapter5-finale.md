---
id: chapter5-finale
pagination_prev: tutorial/api/chapter4-interfaces
pagination_next: basics/selecting-and-ignoring
---

import TableOfContents from './TableOfContents';

# Chapter 5 — Finale

<TableOfContents current="chapter5-finale" />

In previous chapters, we have covered various authentication scenarios. Now, it's time to delve into how to send messages.

In order to [send a message](https://chat-api-tutorial.vedro.io/docs#/default/send_message), we need two pieces of information: the message text and an authorization token. Our scenario will look something like this:

```python
import vedro
from interfaces import ChatApi

class Scenario(vedro.Scenario):
    subject = "send message"

    def given_user_token(self):
        self.token = ...

    def given_chat_message(self):
        self.message = ...

    def when_user_sends_message(self):
        self.response = ChatApi().send(self.message, self.token)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    def and_it_should_return_created_token(self):
        assert self.response.json() == ...
```

## Extending our Interface

The first thing we need to do is to add a new method in our interface:

```python
# ./interfaces/chat_api.py

class ChatApi(vedro.Interface):
    ...

    def send(self, message, token):
        url = f"{self.api_url}/chats/{message['chat_id']}/messages"
        response = httpx.post(url, json=message, headers={"X-Auth-Token": token})
        return response

```

## Setting up Schemas

Next, we need to create new schemas for our messages:

```python
# ./schemas/message.py
from d42 import schema
from .user import NewUserSchema

NewMessageSchema = schema.dict({
    "text": schema.str.len(1, 140),
    "chat_id": schema.str.len(3, 32),
})

MessageSchema = NewMessageSchema + schema.dict({
    "username": NewUserSchema["username"],
    "sent_at": schema.int.min(1)
})
```

Here, we are introducing the `NewMessageSchema` for creating a new message and `MessageSchema` which extends the `NewMessageSchema` with the addition of username and timestamp.

## Introducing a new Context

Lastly, we need a new context for handling the token of the logged-in user:

```python
# ./contexts/logged_in_user.py
import vedro
from interfaces.chat_api import ChatApi

@vedro.context
def logged_in_user(user):
    response = ChatApi().login(user)
    response.raise_for_status()
    return response.json()
```

## Putting it All Together

Finally, let's group everything together:

```python
# ./scenarios/send_message.py
import vedro
from d42 import fake
from contexts import logged_in_user, registered_user
from interfaces import ChatApi
from schemas import MessageSchema, NewMessageSchema, NewUserSchema

class Scenario(vedro.Scenario):
    subject = "send message"

    def given_user_token(self):
        self.user = registered_user(fake(NewUserSchema))
        self.token = logged_in_user(self.user)

    def given_message(self):
        self.message = fake(NewMessageSchema)

    def when_user_sends_message(self):
        self.response = ChatApi().send(self.message, self.token["token"])

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    def and_it_should_return_sent_message(self):
        assert self.response.json() == MessageSchema % {
            "username": self.token["username"],
            "text": self.message["text"],
        }
```

## Finale

As the final part of this tutorial, try to implement the last "happy path" scenario that covers [retrieving messages](https://chat-api-tutorial.vedro.io/docs#/default/get_messages). If you encounter any difficulties, don't hesitate to check out the [repository](https://github.com/vedro-universe/tutorial-chat-api-server/tree/main/tests) which contains the implemented ["get message"](https://github.com/vedro-universe/tutorial-chat-api-server/blob/main/tests/scenarios/get_messages/get_message.py) scenario, among others.

Thank you for participating in this tutorial. Throughout this guide, you've learned how to use Vedro effectively to write test scenarios for your API, from the basics to more complex, real-world scenarios.

Although this guide has come to an end, remember that it's only the beginning of your journey with Vedro and API testing. The world of testing is wide and varied, with many different techniques and strategies to explore. Keep experimenting, keep learning, and most importantly, keep testing!
