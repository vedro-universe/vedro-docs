---
id: scenario-based
---

import Screenshot from '@site/src/components/Screenshot';

# Scenario Based Tests

## The Nature of Interactions

Interactions, whether between a user and software or between different software components, follow a distinct pattern. They begin with intent, proceed through a sequence of steps, and culminate in an expected outcome.

Consider, for instance, the act of shortening a URL. The intent is clear: to convert a lengthy URL into a shorter, more manageable one. The sequence of steps involves opening the URL shortener service, entering the original lengthy URL, clicking the "shorten" button, and then receiving the shortened URL. The expected outcome? Acquiring a shortened version of the original URL that redirects to the original webpage.

In software testing, recognizing this structure is crucial. It not only reflects our natural thought processes but also provides a blueprint for creating tests. By designing tests that mimic this structure, engineers can craft scenarios that align closely with real-world use cases. It promotes clarity and understandability in test scenarios, making it easier to discern the purpose and flow of each test.

## Anatomy of a Scenario

Vedro takes this principle to heart. It presents interactions in the form of scenarios, making test creation intuitive and straightforward. Each scenario starts with the **subject** (which represents the intent) and consists of a sequence of steps. These steps are divided into three key phases:

1. **Given Step(s)**. The _given_ steps form the first phase. These steps prepare the system's state and any necessary data for the main action being tested. They set up the conditions under which the _when_ step, the main action, takes place.

2. **When Step**. Following the _given_ steps is the _when_ step. This is the primary action being tested. It represents the user or system interaction we aim to examine. This step performs the crucial action that will have some sort of effect on the system state, which is subsequently examined in the _then_ steps.

3. **Then Step(s)**. The final phase consists of the _then_ steps. Here, we verify the system's responses (or side-effects) against the expected outcomes of the primary action performed in the _when_ step.

Consider the following example as an illustration:

```python
import vedro
from contexts import opened_url_shortener

class Scenario(vedro.Scenario):
    subject = "shorten url"

    def given_opened_shortener(self):
        self.page = opened_url_shortener()

    def given_original_url(self):
        self.page.fill_url("https://vedro.io/docs/best-practices/scenario-based")

    def when_user_shortens_url(self):
        self.page.click_shorten_button()

    def then_it_should_shorten_url(self):
        shortened_url = self.page.get_shortened_url()
        assert shortened_url
```

It's worth noting that Vedro's scenario anatomy directly follows the [AAA (Arrange-Act-Assert) pattern](https://robertmarshall.dev/blog/arrange-act-and-assert-pattern-the-three-as-of-unit-testing/).

## The Power of the Scenario-Based Approach

Adopting a scenario-based approach provides significant advantages. It emphasizes simplicity, readability, and maintainability, allowing tests to be easily written and understood. Even complex test cases can be broken down into simpler, manageable scenarios, making it easier for teams to collaborate, understand each other's work, and maintain high code quality over time.

To harness the full potential of the scenario-based approach, Vedro builds upon the [inverted pyramid concept](http://webwisewording.com/inverted-pyramid/). This concept mirrors the way we naturally perceive and process information, moving from a broad overview to specific details. It takes into account the reader's cognitive load, presenting the most vital information first and then descending into the intricate details.

<Screenshot src={require('./scenario-based/inverted_pyramid.png')} width="350px" shadow="none" /><br/>
<br/>

Let's break it down.

**1. Project Level**

Here, scenarios offer a high-level view, organized neatly into files and directories. This bird's-eye view quickly reveals the behavior of the system and the scenarios being tested.

```
* chat_api/
└── scenarios/
    ├── auth/
    │   ├── register_new_user.py
    │   ├── login_as_registered_user.py
    │   └── try_to_login_as_nonexisting_user.py
    ├── send_message/
    │   ├── send_message.py
    │   └── try_to_send_message_as_unauthorized_user.py
    └── get_messages/
        ├── get_messages.py
        └── try_to_get_messages_as_unauthorized_user.py
```

This not only offers an instant overview without delving into individual tests but also promotes modularity. As the system grows, integrating new tests under relevant directories becomes seamless, ensuring the test suite remains scalable.

**2. Scenario Level**

Delving deeper, the scenario level provides detailed insights without overwhelming the reader with technicalities. Following the steps of a scenario reveals the core interaction and expected outcomes.

```python
class Scenario(vedro.Scenario):
    subject = "login as registered user"

    def given_registered_user(self):
        ...

    def when_user_logs_in(self):
        ...

    def then_it_should_return_success_response(self):
        ...

    def and_it_should_return_created_token(self):
        ...
```

An added benefit of this structure is that steps can be integrated into reporting systems, like [Allure](https://vedro.io/docs/integrations/allure-reporter). This makes the tracking of test execution and results more visual and organized, adding an extra layer of utility and traceability to the testing process.

<Screenshot src={require('./scenario-based/allure_example.png')} width="550px" /><br/>
<br/>

**3. Step Level**

For those who seek a granular understanding, the step level delves into the specifics. Here lies the essence of each test, with the code ensuring no room for ambiguity.

```python
    def when_user_logs_in(self):
        self.response = ChatApi().login(self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200
```

**4. Beyond the Steps**

Exploration doesn't stop at the step level. Delving deeper into classes, methods, and even underlying libraries reveals the mechanics that drive the tests. This depth offers insights into technical aspects such as properties of the HTTP client (for example, default request timeout), granting a comprehensive understanding of the underlying test machinery.

```python
from vedro_httpx import Response, SyncHTTPInterface

class ChatApi(SyncHTTPInterface):
    def login(self, username: str, password: str) -> Response:
        return self._request("POST", "/auth/login", json={
            "username": username,
            "password": password
        })
```

## Conclusion

Scenario-based testing, with its structured and intuitive approach, is an effective way to manage and maintain tests. Its high readability caters to various levels of engagement, allowing readers to delve as deep as they prefer.

Furthermore, this methodology integrates seamlessly with other best testing practices, uncovering new avenues for effective testing.
