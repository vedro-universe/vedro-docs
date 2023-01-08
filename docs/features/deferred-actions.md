---
id: deferred-actions
title: Deferred Actions
slug: deferred-actions
---
# Deferred Actions

```python
# vedro.defer(fn, *args, **kwargs)

vedro.defer(print, "deferred action")
```

## Example: close http session

File `./contexts/created_session.py`

```python
from aiohttp import ClientSession
import vedro

@vedro.context
def created_session() -> ClientSession:
    session = ClientSession()
    vedro.defer(session.close)  # <- defer closing connection
    return session
```

File `./scenarios/decode_base64_encoded_string.py`

```python
import vedro
from contexts.created_session import created_session

class Scenario(vedro.Scenario):
    subject = "decode base64 encoded string"

    def given_session(self):
        self.session = created_session()

    def given_encoded(self):
        self.encoded = "YmFuYW5h"

    async def when_user_decodes_str(self):
        self.response = await self.session.get(f"https://httpbin.org/base64/{self.encoded}")

    async def then_it_should_return_decoded_str(self):
        assert (await self.response.text()) == "banana"
```

## Example: close browser session

File `./contexts/chrome_browser.py`

```python
import vedro
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver

@vedro.context
def chrome_browser() -> WebDriver:
    browser = webdriver.Chrome()
    vedro.defer(browser.close)  # <- defer closing browser
    return browser
```

File `./scenarios/open_website.py`

```python
import vedro
from contexts.chrome_browser import chrome_browser

class Scenario(vedro.Scenario):
    subject = "open website"

    def given_browser(self):
        self.browser = chrome_browser()

    def when_user_opens_website(self):
        self.browser.get("https://httpbin.org/")

    def then_it_should_return_correct_title(self):
        assert self.browser.title == "httpbin.org"
```
