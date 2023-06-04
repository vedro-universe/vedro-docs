---
id: chapter4-interfaces
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TableOfContents from './TableOfContents';

# Chapter 4 — Interfaces

<TableOfContents current="chapter4" />

Before we dive further into writing more of the tests for our Chat API, let's pause and take some time to refine our existing tests. A few minor tweaks and improvements can go a long way in creating maintainable and efficient test code.

## Config

Firstly, let's focus on the `API_URL` currently repeated across various files. Rather than hardcoding the URL into every file, we can consolidate it into a single central configuration file.

The [cabina](https://pypi.org/project/cabina/) library is an excellent tool for managing configurations. It's used by Vedro for framework and plugin configurations, so it is readily available without the need for additional installations.

Let's move our `API_URL` to a separate configuration file:

```python
# ./config.py
import cabina

class Config(cabina.Config):
    class Api(cabina.Section):
        URL = "https://<api_url>"

```

This change creates a [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for our API URL. If we need to change the URL in the future, we just have to update it in this configuration file.

Here's how we can utilize it in our code:

```python
# ./contexts/registered_user.py
import vedro
import httpx
# highlight-next-line
from config import Config

@vedro.context
def registered_user(user):
    # highlight-next-line
    response = httpx.post(f"{Config.Api.URL}/auth/register", json=user)
    response.raise_for_status()
    return
```

## Interfaces

Our next area of concern is the repetitive use of API endpoints in our codebase.

While writing tests for our chat API, you've likely noticed how frequently we repeat the API endpoints. This repetition not only affects code readability but also poses a potential maintenance issue.

```python
# ./scenarios/register_new_user.py
httpx.post(f"{API_URL}/auth/register", json=self.user)

# ./contexts/registered_user.py
httpx.post(f"{API_URL}/auth/register", json=user)
```

In both files, we're using the same endpoint. If we need to modify this endpoint or the base URL, we would have to update all references to it — a tedious and error-prone task.

To avoid this, we can employ the concept of **interfaces**.

In Vedro, an **interface** is a class providing a structured, unified way to interact with various touchpoints of your application, such as public methods of classes and modules, REST API, or GUI.

Let's define an interface for our Chat API, grouping all related operations:

```python
# ./interfaces/chat_api.py
import vedro
import httpx
from config import Config

class ChatApi(vedro.Interface):
    def __init__(self, api_url = Config.Api.URL):
        self.api_url = api_url

    def register(self, user):
        response = httpx.post(f"{self.api_url}/auth/register", json=user)
        response.body = response.json()
        return response

    def login(self, user):
        response = httpx.post(f"{self.api_url}/auth/login", json=user)
        response.body = response.json()
        return response

```

:::info

Interfaces are usually stored in an `interfaces/` directory in your project structure

:::

Here, we've encapsulated our endpoints and their related logic within a single interface. This `ChatApi` interface handles all interactions with the Chat API, reducing repetition and making our code more maintainable.

The interface can be easily used in our scenarios and contexts:

<Tabs>
  <TabItem value="context" label="Context" default>

```python
# ./contexts/registered_user.py
import vedro
# highlight-next-line
from interfaces import ChatAPI

@vedro.context
def registered_user(user):
    # highlight-next-line
    response = ChatAPI().register(user)
    response.raise_for_status()
    return
```

  </TabItem>

  <TabItem value="scenario" label="Scenario">

```python
import vedro
from schemas.user import NewUserSchema
from contexts.registered_user import registered_user
from schemas.token import AuthTokenSchema
# highlight-next-line
from interfaces import ChatAPI

class Scenario(vedro.Scenario):
    subject = "login as registered user"

    def given_user(self):
        self.user = fake(NewUserSchema)
        registered_user(self.user)

    def when_user_logins(self):
        # highlight-next-line
        self.response = ChatAPI().login(self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    def and_it_should_return_created_token(self):
        assert self.response.json() == AuthTokenSchema % {
            "username": self.user["username"]
        }
```

  </TabItem>
</Tabs>

## Benefits of Using Interfaces

Using interfaces can greatly improve the readability, maintainability, and conciseness of your code:

1. **Reduced Code Redundancy**: Grouping endpoints into an interface eliminates the need to repeat API endpoints in different scenarios and contexts.
2. **Improved Code Maintainability**: With a single source of truth for API endpoints, any changes can be made in one place, reducing the risk of missed updates.
3. **Increased Readability**: The code becomes cleaner and easier to understand as the business logic is neatly abstracted into the interface methods.

By utilizing Interfaces in Vedro, we not only streamline API interactions but also ensure a more maintainable, scalable, and efficient test codebase.
