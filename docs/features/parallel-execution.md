# Parallel Execution

:::tip What’s inside
* 🚀 Speed up test runs by splitting scenarios across multiple nodes
* ⚙️ Configure parallel execution with `--slicer-total` and `--slicer-index`
* ☁️ Set up parallel runs in CI with GitHub Actions, GitLab CI, or Drone
:::

## Introduction

Need to run your test suite faster? Vedro makes it easy to execute tests in parallel across multiple nodes or containers.

Each node runs a different “slice” of the test suite. Together, the nodes split the work and reduce overall test time — perfect for CI pipelines.

## Running in Parallel

Use two command-line options to configure parallel execution:
- `--slicer-total`: total number of nodes (slices)
- `--slicer-index`: index of the current node (from `0` to `slicer-total - 1`)

### Example: 2 nodes

**Node 1**

```shell
$ vedro run --slicer-total=2 --slicer-index=0
```

**Node 2**

```shell
$ vedro run --slicer-total=2 --slicer-index=1
```

## CI/CD Integration

Most CI systems support parallel execution through job matrices or native parallel support. Here’s how to use slicing with the most common platforms.

### GitHub Actions

Use a [matrix strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) to run Vedro in parallel:

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
        python-version: '3.12'
    - name: Install Dependencies
      run: pip install -r requirements.txt
    - name: Run Tests
      run: vedro run --slicer-total=${{ matrix.node-total }} --slicer-index=${{ matrix.node-index }}
```

See [GitHub Actions docs](https://docs.github.com/en/actions/quickstart) for more.

### GitLab CI

GitLab supports [parallel jobs](https://docs.gitlab.com/ee/ci/yaml/README.html#parallel) natively using the `parallel` keyword:

```yml
# .gitlab-ci.yml
test:
  image: python:3.12
  parallel: 2
  before_script:
    - pip install -r requirements.txt
  script:
    - vedro run --slicer-total=$CI_NODE_TOTAL --slicer-index=$((CI_NODE_INDEX-1))
```

:::note
GitLab uses 1-based indexing (`CI_NODE_INDEX` starts from 1), so subtract 1 to match Vedro’s 0-based indexing.
:::

See [GitLab CI docs](https://docs.gitlab.com/ee/ci/) for more.

### Drone CI

[Drone](https://docs.drone.io/quickstart/docker/) supports parallel pipelines using multiple `steps`. Here’s how to split a run across two nodes:

```yml
# .drone.yml
kind: pipeline
type: docker
name: default

steps:
- name: fork1
  image: python:3.12
  commands:
  - pip install -r requirements.txt
  - vedro run --slicer-total=2 --slicer-index=0

- name: fork2
  image: python:3.12
  commands:
  - pip install -r requirements.txt
  - vedro run --slicer-total=2 --slicer-index=1

- name: join
  image: python:3.12
  depends_on: [ fork1, fork2 ]
```

To test locally:

```shell
$ drone exec
```
