---
id: selective-discoverer
---

# Selective Discoverer

:::caution

This page describes an experimental framework feature. Backward compatibility is not guaranteed.

:::

## Overview

The Python import system, crucial for module and package loading, significantly influences the startup speed of applications with heavy dependencies. For example, importing a comprehensive library such as [Pandas](https://pypi.org/project/pandas/) alone involves loading over 625 unique modules, taking more than 320 milliseconds. This overhead can substantially impact the startup time of test suites with a large number of scenarios (thousands or more).

To mitigate this issue, Vedro introduces an experimental feature: `--exp-selective-discoverer`. This feature aims to enhance startup speed by selectively loading scenarios from specified files or directories, thus bypassing the conventional, slower Python import mechanism.

## How to Use

The Selective Discoverer is activated by adding the `--exp-selective-discoverer` argument to the Vedro run command, followed by specifying the target files or directories.

### Examples

- **Single File**: To run scenarios from a specific file:

  ```
  $ vedro run --exp-selective-discoverer scenarios/login_via_email.py
  ```

- **Multiple Files**: To run scenarios from multiple specific files:

  ```
  $ vedro run --exp-selective-discoverer scenarios/login.py scenarios/register.py
  ```

- **Single Directory**: To run scenarios from all files within a specific directory:

  ```
  $ vedro run --exp-selective-discoverer scenarios/auth/
  ```

### Mechanism

Upon activation, the Selective Discoverer feature "hides" all directories and files not explicitly specified in the command from the framework. This approach simulates an environment where only the designated files or directories exist, speeding up the loading process by avoiding unnecessary module imports.

### Compatibility and Limitations

Currently, the `--exp-selective-discoverer` feature cannot be used in conjunction with the `--ignore` and `--subject` parameters. This limitation has been acknowledged and is planned to be addressed in future versions of Vedro.

However, other scenario filters remain fully functional with the Selective Discoverer. For instance, to run all scenarios within the `scenarios/auth/` directory that are tagged with `API`, the following command can be used:

```sh
$ vedro run --exp-selective-discoverer scenarios/auth/ --tags API
```
