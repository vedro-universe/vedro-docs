# Parallel Execution

:::caution
Please note that this documentation is currently under finalization and improvement
:::

Vedro allows you to split and run your tests across multiple nodes in parallel. This is done by slicing the test suite into separate parts and executing each slice on a different node.

## Configuration Options

- `--slicer-total`: This flag specifies the total number of nodes (slices) that the test suite will be divided into for parallel execution.
  
- `--slicer-index`: This flag determines the index of the current node (slice). It should be assigned a unique number between `0` and `slicer-total - 1`.

### Example:

To run tests in parallel on two nodes, execute the following commands:

1. On the **first** node:

  ```shell
  $ vedro run --slicer-total=2 --slicer-index=0
  ```

2. On the **second** node:

  ```shell
  $ vedro run --slicer-total=2 --slicer-index=1
  ```

## Integration with CI/CD Platforms

Different CI/CD platforms offer various ways to implement parallel execution. Here's how to set it up on popular platforms:

### GitHub Actions

To achieve parallel execution in GitHub Actions, use the [matrix strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs).

```yml
# .github/workflows/test.yml
name: Test

on: push

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-total: [2]
        node-index: [0, 1]

    steps:
    - uses: actions/checkout@v4
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    - name: Install Dependencies
      run: pip install -r requirements.txt
    - name: Run Tests
      run: vedro run --slicer-total=${{ matrix.node-total }} --slicer-index=${{ matrix.node-index }}
```

For additional details, refer to the [official GitHub Actions documentation](https://docs.github.com/en/actions/quickstart).

### GitLab CI

GitLab CI natively supports [parallel execution](https://docs.gitlab.com/ee/ci/yaml/README.html#parallel):

```yml
# .gitlab-ci.yml
test:
  image: python:3.11
  parallel: 2
  before_script:
    - pip install -r requirements.txt
  script:
    - vedro run --slicer-total=$CI_NODE_TOTAL --slicer-index=$((CI_NODE_INDEX-1))
```

:::note
GitLab starts counting indexes from 1, hence the adjustment `$((CI_NODE_INDEX-1))`
:::

For more details, refer to the [official GitLab CI documentation](https://docs.gitlab.com/ee/ci/).

### Drone CI

In [Drone CI](https://docs.drone.io/quickstart/docker/), you can define parallel steps as follows:

Here's an example:

```yml
# .drone.yml
kind: pipeline
type: docker
name: default

steps:
- name: fork1
  image: python:3.11
  commands:
  - pip install -r requirements.txt
  - vedro run --slicer-total=2 --slicer-index=0

- name: fork2
  image: python:3.11
  commands:
  - pip install -r requirements.txt
  - vedro run --slicer-total=2 --slicer-index=1

- name: join
  image: python:3.11
  depends_on: [ fork1, fork2 ]
```

To execute the parallel steps defined in your `.drone.yml` file locally, use the [drone exec command](https://docs.drone.io/cli/install/). This allows you to run the CI pipeline steps on your local machine, simulating the environment as if they were being run on the actual Drone CI server.

```shell
$ drone exec
```
