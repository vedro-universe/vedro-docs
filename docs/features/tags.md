---
id: tags
---

import TerminalOutput from '@site/src/components/TerminalOutput';

# Tags

Software projects often grow like snowballs, accumulating complexity as they evolve. As new features are added, the number of accompanying tests also increases. What starts as a simple suite of tests can quickly turn into an unmanageable mountain of test cases, complicating both maintenance and test discovery.

## The Good Old Directory Approach

In a project's initial stages, organizing tests into directories is usually sufficient. This method offers a straightforward way to group tests based on single characteristics like the feature under test or the interacting component. However, as the project grows and tests become more complex and numerous, the single-axis organizational structure provided by directories becomes insufficient for effective test management.

For instance, suppose you're working on a high-priority test to verify a crucial authentication feature in your API that writes login events to a [Kafka](https://kafka.apache.org/) message broker. Where should this test be placed?

1. In a directory named `authentication/` because it tests that particular feature?
2. In another directory named `api/` because it focuses on the API component?
3. In a directory named `kafka/` because it also involves Kafka messaging?
4. Or perhaps in a directory named `p0/` to indicate its high priority?

## Logical Grouping

As a project scales, so must its test management strategy. A more robust solution is needed for effective test management, and this is where logical grouping becomes indispensable. Imagine having the ability to organize your tests based on multiple factors, rather than just one. What if you could label tests based on functionality, the components they interact with, or even their priority within the test suite? Such multi-axial categorization introduces flexibility and significantly improves manageability.

### Defining Tags

[Vedro](https://vedro.io) elegantly addresses this challenge through the concept of **tags**. Tags serve as unique identifiers for logical groups, allowing for a more flexible way to manage tests.

Defining tags for a test scenario is straightforward. Here's an example to illustrate:

```python
import vedro

class Scenario(vedro.Scenario):
    subject = 'register new user'
    tags = ['AUTH_REGISTER', 'API', 'KAFKA', 'P0']
```

The scenario is tagged with the following labels:

- `AUTH_REGISTER` — Denotes the feature related to authentication registration
- `API` — Highlights the component being tested
- `KAFKA` — Indicates the messaging system involved
- `P0` — Signifies its high priority

These tags facilitate effortless identification, execution, and management of this specific test across various dimensions.

### Using Tags

The true power of tags becomes apparent when you need to execute specific groups of tests. Vedro provides a command-line interface that enables selective test execution based on assigned tags.

For instance, to run all tests tagged with `API`, you can use the following command:

```shell
$ vedro run --tags "API"
```

Moreover, you can employ [Boolean logic](https://en.wikipedia.org/wiki/Boolean_algebra) to combine tags and create complex filtering conditions. For example, to run scenarios that include either the `API` or `UI` tag but do not include the `P0` tag, you can use the following command:

```shell
$ vedro run --tags "(API or UI) and (not P0)"
```

Vedro also offers a `--dry-run` feature that lets you preview which scenarios would be executed, allowing for fine-tuning before actual execution.

```shell
$ vedro run --dry-run --tags "(API or UI) and AUTH_LOGIN"
```

This command previews the scenarios without executing them:

<TerminalOutput>
{`
Scenarios
[1m* auth / login[0m[1m
[0m [32m✔ login as registered user[0m[38;5;244m[0m[38;5;244m
[0m   [38;5;244m> scenarios/auth/login/login_as_registered_user.py[0m[38;5;244m
[0m 
[0m [32m✔ try to login as nonexisting user[0m[38;5;244m[0m[38;5;244m
[0m   [38;5;244m> scenarios/auth/login/try_to_login_as_nonexisting_user.py[0m[38;5;244m
[0m 
[0m [32m✔ try to login with incorrect password[0m[38;5;244m[0m[38;5;244m
[0m   [38;5;244m> scenarios/auth/login/try_to_login_with_incorrect_password.py[0m[38;5;244m
[0m 
[0m[1;32m# 3 scenarios, 3 passed, 0 failed, 0 skipped[0m[34m[0m[34m
[0m
`}
</TerminalOutput>

## Benefits of Using Tags

Using tags for test management brings numerous advantages that contribute to more efficient and effective testing. Here are some key benefits:

- **Enhanced Test Management**: The ability to attach multiple tags to a single test offers a multi-dimensional approach to categorization. This frees you from the constraints of a directory-based organizational scheme, providing greater flexibility for test management.

- **Precise Test Execution**: Vedro’s tag system supports complex Boolean logic, enabling you to easily include or exclude specific tests based on intricate criteria. This provides greater control over the tests executed in each run.

- **Simplified Maintenance**: When your codebase undergoes changes, like feature additions or deprecations, tags make it straightforward to update corresponding tests. A simple search for relevant tags allows for easy adjustments, ensuring that your test suite remains up-to-date and relevant.

- **Built-In Documentation**: Each tag acts as built-in documentation, describing the test's various attributes. This not only improves readability but also makes it easier for both new and existing team members to understand the purpose, scope, and importance of each test without having to delve into the code or external documentation.

- **Efficient Test Discovery**: The `--dry-run` feature and tag-based querying simplify the test discovery process. Unlike directory-based approaches, where navigating through folders can be cumbersome, tagging enables quick test preview and selection, saving time especially in large projects.

- **Contextual Test Reporting**: Tagging tests enhances reporting capabilities. When tests fail, their tags can provide immediate context, helping you to easily identify patterns or specific features that require attention, leading to a more targeted and efficient debugging process.

While directories may suffice for initial test organization, their limitations quickly become apparent as the project scales. Implementing a tagging system can significantly improve the organization, maintainability, and effectiveness of your test suite, becoming a powerful tool for quality assurance in larger, more complex projects.
