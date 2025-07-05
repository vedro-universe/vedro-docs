---
id: avoid-ifs
---

import Screenshot from '@site/src/components/Screenshot';
import Link from '@site/src/components/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Avoid Ifs in Tests

Like any code, test code also has its set of best practices and pitfalls. One common but easily overlooked pitfall is the use of conditional statements, particularly "if" statements, in tests.

At first glance, using "if" statements in tests might seem harmless or even necessary. After all, the conditional logic allows tests to adapt based on different parameters, making it seem more flexible. However, this apparent benefit is misleading. Introducing conditional statements into tests can lead to problems, including unclear test results, gaps in test coverage, and increased code complexity.

## The Problem with Ifs

Let's start with an example to illustrate the problem. Imagine a movie streaming platform that offers age-restricted movies like "<Link to="https://www.metacritic.com/movie/john-wick/">John Wick</Link>", which should be available only to viewers 17 years old or above.

The initial test for this feature might look like this:

```python
import vedro
from contexts import logged_in_user, open_age_restricted_movie

class Scenario(vedro.Scenario):
    subject = 'open age-restricted movie'

    def given_logged_in_user(self):
        # `logged_in_user` provides a user with an age
        self.user = logged_in_user()

    def when_user_opens_movie_page(self):
        self.page = open_age_restricted_movie(self.user)

    def then_it_should_check_user_age(self):
        if self.page.text('.warning') == 'You must be 17+ to watch this movie':
            assert self.page.exists('.movie-title') is False
        else:
            assert self.page.exists('.movie-title') is True
```

On the surface, this test may look okay. It checks whether the user sees a warning message when trying to view an age-restricted movie and also checks if the movie is actually displayed. However, the test has a crucial flaw: it could pass for the wrong reasons.

- **Frontend Ignores Age Restriction**: Suppose the frontend application completely disregards the age restriction and allows everyone to watch "John Wick." In this situation, the test would still pass (the absence of a warning message would trigger the else condition).
- **Frontend Restricts the Movie for All Users**: On the other hand, if the frontend application restricts the movie for all users, regardless of their age, the test will still pass (the warning message would display for every user, satisfying the if condition).

Both cases demonstrate that the test might not effectively verify the intended behavior. A passing test does not necessarily confirm that the application is correctly implementing age restrictions.

The core of this issue is the test's reliance on output data, in this case, the warning message. Verifying outcomes based solely on output, such as a user-facing warning message, introduces significant risk. Numerous factors, including future changes in the UI, refactoring of the underlying codebase, and adjustments in internationalization and localization, can influence output data. This makes it an unreliable criterion for evaluating the correct functionality of the code being tested.

:::note
The [ternary operator](https://book.pythontips.com/en/latest/ternary_operators.html) is also a form of branching logic.
:::

### An Attempt to Refine the Test

```python
class Scenario(vedro.Scenario):
    subject = 'open age-restricted movie'

    def given_logged_in_user(self):
        self.user = logged_in_user()

    def when_user_opens_movie_page(self):
        self.page = open_age_restricted_movie(self.user)

    def then_it_should_check_user_age(self):
        # highlight-start
        if self.user['age'] >= 17:
        # highlight-end
            assert self.page.exists('.movie-title') is True
        else:
            assert self.page.exists('.movie-title') is False
```

In this version, the "if" condition is based on the age of the logged-in user, providing a more reliable foundation for the test. The age is a part of the input data, which the test assumes is under control and therefore reliable.

However, this refined test still has significant drawbacks. The test heavily relies on the `logged_in_user` function to dictate its path. What if, due to future code refactoring or changing business requirements, `logged_in_user` consistently returns users aged 17 or older? In such a case, the test would provide coverage only for one specific scenario: that users aged 17 or above can view the movie. It would fail to verify that younger users are restricted from watching age-sensitive content, essentially defeating the purpose of the test.

Even though the test appears to be improved, it still lacks comprehensive coverage. By relying on conditional statements, it opens the door to scenarios where it might not fully validate the functionality it is intended to test.

### The Dangers of Using Ifs

As seen from the examples above, even a well-intentioned effort to make the test more robust can falter when "if" statements are involved. But why are "if" statements so problematic in tests? Let's delve into some key dangers.

**Unnecessary Complexity**

Introducing an "if" statement into a test adds branching logic to test code. In other words, the test can take multiple paths based on varying conditions. While this might seem like a flexible approach, it actually introduces unnecessary complexity. A test should have a straightforward flow so that it clearly either passes or fails based on predefined conditions. If there are multiple branching paths, understanding why a test failed, or even worse, why it passed, becomes difficult.

<Screenshot src={require('./avoid-ifs/scn_diagram.png')} width="450px" shadow="none" /><br/>
<br/>

**Business Logic in Tests**

Tests are meant to validate business logic, not contain it themselves. When a test starts to include its own branching logic and conditions, it essentially becomes a mini-program replete with its own business logic. This poses a significant problem because if the test itself is flawed, it might require its own set of tests to validate. This results in a recursive issue, leading away from the primary purpose of a test, which is to serve as a reliable indicator of code quality.

## Strategies for Improvement

### Parameterized Testing

One effective strategy to address the challenges of conditional logic in tests is through <Link to="/docs/features/parameterized-scenarios" target="_blank">parameterized testing</Link>. This approach allows the same test logic to run multiple times with different sets of parameters. Instead of using branching logic for various data combinations, parameterized tests ensure a linear flow, which enhances their clarity and reliability.

```python
import vedro
from vedro import params
from contexts import logged_in_user, open_age_restricted_movie

class Scenario(vedro.Scenario):
    subject = 'open age-restricted movie'

    @params(age=13, can_view_movie=False)
    @params(age=17, can_view_movie=True)
    def __init__(self, age, can_view_movie):
        self.age = age
        self.can_view_movie = can_view_movie

    def given_logged_in_user(self):
        self.user = logged_in_user(age=self.age)

    def when_user_opens_movie_page(self):
        self.page = open_age_restricted_movie(self.user)

    def then_it_should_check_user_age(self):
        assert self.page.locator('.movie-title').exists() == self.can_view_movie
```

In the example above, the `@params` decorator is used to provide different sets of data for the test. Each set represents a different test scenario. 

### Splitting Tests

Another method to eliminate conditional statements from tests is to split them into separate tests. Instead of one test trying to cater to both positive and negative scenarios, it's often clearer to have individual tests, each tailored for a specific responsibility.

1. One test would handle the positive scenario where the user, aged 17, should be able to open an age-restricted movie.

```python
import vedro
from contexts import logged_in_user, open_age_restricted_movie

class Scenario(vedro.Scenario):
    subject = 'open age-restricted movie'

    def given_logged_in_user(self):
        self.user = logged_in_user(age=17)

    def when_user_opens_movie_page(self):
        self.page = open_age_restricted_movie(self.user)

    def then_it_should_show_movie(self):
        assert self.page.locator('.movie-title').exists()
```

2. Conversely, another test would deal with the negative scenario, ensuring that a 13-year-old user cannot access age-sensitive content.

```python
import vedro
from contexts import logged_in_user, open_age_restricted_movie

class Scenario(vedro.Scenario):
    subject = 'try to open age-restricted movie'

    def given_logged_in_user(self):
        self.user = logged_in_user(age=13)

    def when_user_opens_movie_page(self):
        self.page = open_age_restricted_movie(self.user)

    def then_it_should_restrict_movie(self):
        assert self.page.locator('.movie-title').not_exists()
```

### Combining Approaches

Both methods, splitting tests and parameterized testing, offer unique advantages when applied in isolation. However, their true potential is realized when they are combined, leading to enhanced test coverage and clarity.

By splitting tests, each test is tailored with a specific responsibility, providing clear intent. It becomes straightforward to identify what each test is set out to achieve. Meanwhile, parameterized testing applies consistent test logic across different data sets. This ensures that the application behaves as expected for a wide range of scenarios. For example, adding more test scenarios, such as a 16-year-old user for a negative test and an 18-year-old user for a positive test, ensures that the age "17" isn't just hard-coded into the application logic.
