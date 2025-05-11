---
id: temporary-files
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Working with Temp Files

Temporary files and directories are a foundational part of modern test suites, especially when simulating interactions with the filesystem. Whether you're storing intermediate data, mimicking file uploads, or creating sandboxed environments, they allow you to replicate real-world behaviors in an isolated and controllable way. Properly managing these resources helps keep your tests clean, reliable, and reproducible.

Vedro makes this process easy with two built-in helpers:

- `create_tmp_file()` — for generating temporary files
- `create_tmp_dir()` — for creating temporary directories

These utilities are part of Vedro's core philosophy: to keep tests expressive, maintainable, and free from noisy boilerplate code.

## Creating Temporary Files

Temporary files are useful when you need a file-like object that exists on disk during a test. For example, they’re great for simulating file uploads or testing components that read from the filesystem.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
import vedro
from vedro import create_tmp_file

class Scenario(vedro.Scenario):
    subject = "Upload file"

    def given_tmp_file(self):
        self.tmp_file = create_tmp_file()
        self.tmp_file.write_text("Hello, World!")
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
# Install via: vedro plugin install vedro-fn
from vedro_fn import scenario, given
from vedro import create_tmp_file

@scenario()
def upload_file():
    with given:
        tmp_file = create_tmp_file()
        tmp_file.write_text("Hello, World!")
```

  </TabItem>
</Tabs>

You can read from and write to this file just like any other [`Path`](https://docs.python.org/3/library/pathlib.html#basic-use) object in Python. After the scenario completes, the file remains available for manual inspection unless explicitly removed.

## Creating Temporary Directories

Temporary directories are helpful for simulating file trees, generating multiple test files, or isolating filesystem changes. They allow you to create a full structure of nested files and folders, which is ideal for integration testing.

<Tabs groupId="test-style">
  <TabItem value="class-based" label="Class-based" default>

```python
import vedro
from vedro import create_tmp_dir

class Scenario(vedro.Scenario):
    subject = "Upload files"

    def given_tmp_dir(self):
        self.tmp_dir = create_tmp_dir()
        (self.tmp_dir / "file1.txt").write_text("Hello, World!")
```

  </TabItem>
  <TabItem value="function-based" label="Function-based">

```python
# Install via: vedro plugin install vedro-fn
from vedro_fn import scenario, given
from vedro import create_tmp_dir

@scenario()
def upload_files():
    with given:
        tmp_dir = create_tmp_dir()
        (tmp_dir / "file1.txt").write_text("Hello, World!")
```

  </TabItem>
</Tabs>

Once created, the directory and its contents behave like any normal [`Path`](https://docs.python.org/3/library/pathlib.html#basic-use). You can iterate through contents, perform assertions, or run subprocesses that rely on those files.

Temporary files and directories are created inside the `.vedro/tmp` directory by default. They are **not** automatically deleted after a test run, which makes it easier to debug test outputs. However, the entire directory is wiped at the start of each new run to ensure no stale data remains.

## Customizing Temporary Names

You may want more descriptive file or directory names when debugging or inspecting the `.vedro/tmp` contents. Both `create_tmp_file()` and `create_tmp_dir()` accept optional `prefix` and `suffix` parameters:

```python
tmp_file = create_tmp_file(prefix="test_", suffix=".log")
tmp_dir = create_tmp_dir(prefix="mydir_")
```

This customization is particularly useful when generating multiple temporary resources during a run and needing to distinguish between them. For example, logs, snapshots, or batch-generated reports can be grouped logically by name.

## Changing the Temporary Root Directory

In some cases, the default `.vedro/tmp` location may not be ideal — especially when running tests in CI environments or within restricted filesystems. You can change the root directory for all temporary files using either configuration or command-line options.

#### Via Config

Update your `vedro.Config` to override the default location:

```python
from pathlib import Path
import vedro.plugins.temp_keeper as temp_keeper

class Config(vedro.Config):
    class Plugins(vedro.Config.Plugins):
        class TempKeeper(temp_keeper.TempKeeper):
            tmp_dir = Path("tmp/")
```

This allows you to redirect all temporary resources to a directory of your choice, relative to the project root or as an absolute path.

#### Via CLI

```sh
$ vedro run --tmp-dir /path/to/custom/tmp
```

The CLI argument overrides the config setting and is useful when you want to dynamically control where files go without modifying source code. This is especially handy for test runners in different environments.

Both options support relative paths (based on `project_dir`) and absolute paths. The CLI setting takes precedence over the configuration value. By default, `.vedro/tmp/` is used.

## Cleanup Behavior

By default, Vedro preserves temporary files and directories after each test run so you can inspect them manually. This is useful for debugging, verifying output files, or analyzing test artifacts post-run.

At the start of each test run, however, Vedro clears the entire temporary root directory to avoid leftover data from previous runs. This guarantees a clean and isolated environment every time.

To disable this automatic cleanup behavior, use one of the following options:

#### Via Config

```python
from pathlib import Path
import vedro.plugins.temp_keeper as temp_keeper

class Config(vedro.Config):
    class Plugins(vedro.Config.Plugins):
        class TempKeeper(temp_keeper.TempKeeper):
            cleanup_tmp = False
```

This ensures that even across multiple test runs, your temporary files remain untouched unless manually removed.

#### Via CLI

```sh
$ vedro run --no-tmp-cleanup
```

This is particularly useful during exploratory testing or when you need to preserve artifacts for additional post-processing.

## API Reference

### `create_tmp_file`

```python
def create_tmp_file(*, suffix: Optional[str] = None, prefix: Optional[str] = None) -> Path
```

Creates a temporary file in the configured temporary root directory.

- `suffix` — Optional suffix for the filename (e.g., ".txt")
- `prefix` — Optional prefix for the filename (e.g., "log_")
- **Returns** — A [`Path`](https://docs.python.org/3/library/pathlib.html#basic-use) object representing the created file

Internally, `create_tmp_file` uses Python's [`tempfile.NamedTemporaryFile`](https://docs.python.org/3/library/tempfile.html#tempfile.NamedTemporaryFile) with `delete=False` to ensure the file persists.

### `create_tmp_dir`

```python
def create_tmp_dir(*, suffix: Optional[str] = None, prefix: Optional[str] = None) -> Path
```

Creates a temporary directory in the configured temporary root directory.

- `suffix` — Optional suffix for the directory name
- `prefix` — Optional prefix for the directory name
- **Returns** — A [`Path`](https://docs.python.org/3/library/pathlib.html#basic-use) object representing the created directory

Internally, `create_tmp_dir` uses Python's [`tempfile.mkdtemp`](https://docs.python.org/3/library/tempfile.html#tempfile.mkdtemp), providing a unique directory each time.
