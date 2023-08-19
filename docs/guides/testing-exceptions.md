---
id: testing-exceptions
---
# Testing Exceptions

Exceptions are not just error messages that appear when something goes wrong. Exceptions signal specific conditions that might deviate from the program's usual flow. In essence, they are integral to understanding the behavior of a system.

## Why Test Exceptions?

### 1. Verifying the Exception Raised

It's essential to test exceptions to ensure that the system raises the expected exception under certain conditions or with specific inputs. These verifications ensure that the program can correctly detect and respond to anomalies.

### 2. Check Exception Messages

Clear and accurate exception messages are crucial for debugging. By testing exceptions, we confirm that these messages provide the necessary information to engineers about the underlying issue.

### 3. Validate Control Flow

In some programming paradigms, exceptions have roles beyond just signaling errors. For example, in Python, exceptions can act as a control flow mechanism. Python's `StopIteration` exception, which is raised when no more items exist in an iterator, is a case in point. It informs the `for` loop about the end of iteration. 

While there's [debate over the use of exceptions for control flow](https://stackoverflow.com/questions/729379/why-not-use-exceptions-as-regular-flow-of-control), this practice is not uncommon in Python.

## Testing Exceptions in Vedro

Vedro provides the `catched` function designed to assist in testing exceptions.

Below is an example where we're testing the scenario of attempting to open a non-existing file. We expect a `FileNotFoundError` to be raised, and the test verifies both the type of the exception and its message.

```python
import vedro
from vedro import catched

class Scenario(vedro.Scenario):
    subject = "try to open non-existing file"

    def given_non_existing_file(self):
        self.filename = "non-existing.file"

    def when_user_opens_file(self):
        with catched(Exception) as self.exc_info:
            open(self.filename)

    def then_it_should_raise_exception(self):
        assert self.exc_info.type is FileNotFoundError
        assert str(self.exc_info.value) == f"[Errno 2] No such file or directory: {self.filename!r}"
```

The `exc_info` object encapsulates details about the exception. If an exception is raised within the `catched` block, the following attributes are populated:
- `type` — represents the type of the raised exception
- `value` —  holds the instance of the raised exception
- `traceback` — a [traceback object](https://docs.python.org/3/library/types.html#types.TracebackType) containing details about the exception's origin and context

If no exception is raised, all these attributes are set to `None`.

## Explicit Over Implicit

Clarity in testing is essential. Vedro follows the philosophy ["Explicit is better than implicit"](https://peps.python.org/pep-0020/). It's worth noting that the `catched` function doesn't automatically verify if an exception was raised. Engineers must include this verification explicitly in the test. This approach ensures that tests are transparent and free from assumptions.

## Conclusion

In conclusion, while exceptions may seem like disturbances disrupting the smooth flow of a program, they are vital to understanding a system's behavior. Testing exceptions goes beyond error management; it's about understanding and validating the program's responses to various scenarios.
