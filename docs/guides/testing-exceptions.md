---
id: testing-exceptions
---

import Link from '@site/src/components/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Testing Exceptions

Exceptions are not just error messages that appear when something goes wrong. Exceptions signal specific conditions that might deviate from a program's usual flow. Fundamentally, they are integral to understanding the behavior of a system.

## Why Test Exceptions?

### 1. Verify the Exception Raised

It's essential to test exceptions to ensure that the system raises the expected exception under certain conditions or with specific inputs. These verifications ensure that the program can correctly detect and respond to anomalies.

### 2. Check Exception Messages

Clear, accurate exception messages are crucial for debugging. By testing exceptions, we confirm that these messages provide the necessary information to engineers about the underlying issue.

### 3. Validate Control Flow

While using exceptions for control flow is a <Link to="https://stackoverflow.com/questions/729379/why-not-use-exceptions-as-regular-flow-of-control">topic of debate</Link>, it's not uncommon in Python. For example, iterators raise `StopIteration` exceptions when they have no more items to return, and the `for` statement relies on this exception to stop iterating.

## Testing Exceptions in Vedro

Vedro provides the `catched` function designed to assist in testing exceptions.

Below is an example where we test the scenario of attempting to open a non-existing file. We expect a `FileNotFoundError` to be raised, and the test verifies the exception's type and message.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

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

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
from vedro import scenario, given, when, then, catched

@scenario()
def try_to_open_nonexisting_file():
    with given:
        filename = "non-existing.file"
    
    with when, catched(Exception) as exc_info:
        open(filename)

    with then:
        assert exc_info.type is FileNotFoundError
        assert str(exc_info.value) == f"[Errno 2] No such file or directory: {filename!r}"
```

  </TabItem>
</Tabs>

The `exc_info` object encapsulates details about the exception. If an exception is raised within the `catched` block, the following attributes are populated:
- `type`: the type of the exception that was raised
- `value`:  the actual exception instance
- `traceback`: the <Link to="https://docs.python.org/3/library/types.html#types.TracebackType">traceback object</Link> containing details about the exception's context

If no exception is raised, all these attributes are set to `None`.

## Explicit Over Implicit

One of the guiding principles of Vedro is <Link to="https://peps.python.org/pep-0020/">"Explicit is better than implicit"</Link>. This philosophy extends to exception testing as well. The `catched` context manager does not implicitly check whether an exception has occurred or not. Engineers must explicitly include this verification in the test. This approach ensures that tests are transparent and free from assumptions.

## Conclusion

In conclusion, while exceptions may seem like disturbances disrupting the smooth flow of a program, they are vital to understanding a system's behavior.
