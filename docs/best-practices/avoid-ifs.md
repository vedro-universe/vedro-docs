# Avoid Ifs in Tests

import Screenshot from '@site/src/components/Screenshot';
import Link from '@site/src/components/Link';


Like any code, test code also has its set of best practices and pitfalls. One common but easily overlooked pitfall is the use of conditional statements, particularly "if" statements, within test cases.

At first glance, using "if" statements in tests might seem harmless or even necessary. After all, the conditional logic allows tests to adapt based on different parameters, making it seem more flexible. However, this apparent benefit is misleading. Introducing conditional statements into test cases can actually lead to a host of problems such as unclear test results, gaps in test coverage, and increased code complexity.

## The Problem with Ifs

Let's start with an example to illustrate the problem. Imagine a movie streaming platform that offers age-restricted movies like "[John Wick](https://www.metacritic.com/movie/john-wick/)", which should be available only to viewers 17 years old or above.

The initial test for this feature might look like this:

```python
import vedro
from contexts import logged_in_user, open_age_restricted_movie

class Scenario(vedro.Scenario):
    subject = 'open age-restricted movie'

    def given_logged_in_user(self):
        # `logged_in_user` provides a user with an age
        # Age determines movie access
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

Both cases show that the test does not actually verify the behavior it aims to. A passing test does not necessarily confirm that the application is correctly implementing age restrictions.

The core of this issue is the test's reliance on output data, in this case, the warning message. Verifying outcomes based solely on output, such as a user-facing warning message, introduces significant risk. Numerous factors, such as future changes in the UI, refactoring of the underlying codebase, internalization and localization adjustments, can influence output data. This makes it an unreliable criterion for evaluating the correct functionality of the code being tested.

### An Attempt to Refine the Test

In this updated version of the test, input data is used for making assertions, which seems like a step in the right direction. The test now uses the user's age as a criterion for determining whether they should be able to access the age-restricted movie.

```python
class Scenario(vedro.Scenario):
    subject = 'open age-restricted movie'

    def given_logged_in_user(self):
        self.user = logged_in_user()

    def when_user_opens_movie_page(self):
        self.page = open_age_restricted_movie(self.user)

    def then_it_should_check_user_age(self):
        # highlight-start
        if self.user["age"] >= 17:
        # highlight-end
            assert self.page.exists('.movie-title') is False
        else:
            assert self.page.exists('.movie-title') is True
```

In this version, the "if" condition is based on the age of the logged-in user, which seems like a more reliable foundation for the test. The age is a part of the input data, which the test assumes is under control and therefore reliable.

However, this refined test still has significant drawbacks. The test heavily relies on the `logged_in_user` function to dictate its path. What if future code refactoring or business requirements change so that `logged_in_user` always returns a user who is 17 or older? In such a case, the test would provide coverage only for one specific scenario—that users aged 17 or above can view the movie. It would fail to verify that younger users are restricted from watching age-sensitive content, essentially defeating the purpose of the test.

In other words, even though the test may seem improved, it still lacks comprehensive coverage. By relying on conditional statements, it opens the door to scenarios where it might not fully validate the functionality it is intended to test.

### The Dangers of Using Ifs

As seen from the examples above, even a well-intentioned effort to make the test more robust can falter when "if" statements are involved. But why are "if" statements so problematic in tests? Let's delve into some key dangers.

**Unnecessary Complexity**

Introducing an "if" statement into a test adds branching logic to test code. In other words, the test can take multiple paths based on varying conditions. While this might seem like a flexible approach, it actually introduces unnecessary complexity. A test should have a straightforward flow so that it clearly either passes or fails based on predefined conditions. If there are multiple branching paths, understanding why a test failed—or even worse, why it passed—becomes difficult.

<Screenshot src={require('./avoid-ifs/scn_diagram.png')} width="450px" shadow="none" /><br/>
<br/>

**Business Logic in Tests**

Tests are designed to validate business logic; they should not contain it themselves. When a test starts to include its own branching logic and conditions, it essentially becomes a mini-program replete with its own business logic. This is a significant problem because the test itself could be buggy and may need its own set of tests. This results in a recursive issue, leading away from the primary purpose of a test, which is to serve as a reliable indicator of code quality.

## Strategies for Improvement

Recognizing the pitfalls of using "if" statements in tests, several alternative approaches can address these issues effectively. Below are two methods that not only simplify the testing process but also enhance its reliability and comprehensibility.

### Splitting Tests

One straightforward method to remove conditional statements from tests is by splitting them into separate tests, each responsible for validating a specific condition. This approach makes each test much easier to understand, as it's designed to verify a single, well-defined behavior. Not only does this method enhance the readability and maintainability of the test suite, but it also ensures that each test serves its intended purpose without ambiguity. 

### Parameterized Testing

Another effective approach is the use of [parameterized testing](https://vedro.io/docs/features/parameterized-scenarios), which allows running the same test multiple times but with different input values. This method covers a wide range of scenarios without duplicating code, as shown in the example below:

```python
import vedro
from vedro import params
from contexts import logged_in_user, open_age_restricted_movie

class Scenario(vedro.Scenario):
    subject = 'open age-restricted movie'

    @params(age=13, can_view_movie=False)
    @params(age=18, can_view_movie=True)
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

With parameterized testing, eliminating conditional logic becomes a straightforward process. Additionally, adding more test scenarios, such as for ages 16 and 18, becomes a matter of simply extending the parameters, ensuring that the age "17" is not hard-coded into the application logic.

Both of these methods focus on making tests straightforward, deterministic, and reliable. By adhering to these principles, tests can fulfill their primary purpose: serving as reliable indicators of the quality of the application's codebase.
