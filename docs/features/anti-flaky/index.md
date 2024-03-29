---
id: anti-flaky
title: Anti-Flaky
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Link from '@site/src/components/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TableOfContents from './TableOfContents';

# Preventing Flaky Tests

<TableOfContents current="Part 1. Preventing Flaky Tests" />

## What are Flaky Tests?

Flaky tests are software tests that exhibit unpredictable outcomes, switching between passing and failing, despite no changes in code or environment. This inconsistency can mislead by masking the presence or absence of bugs and may be caused by various factors, including timing issues, external dependencies, and stateful tests.

## The Impact of Flaky Tests

Flaky tests not only disrupt the testing process but also have broader implications on the overall software development lifecycle. The effects extend far beyond mere annoyance, undermining the foundation of trust, efficiency, and speed within the development and testing teams. Let's explore the key impacts of flaky tests to fully understand their ramifications.

### 1. Erosion of Trust in Test Results

The primary impact of flaky tests is the erosion of trust in the testing process. When tests yield inconsistent results, developers and testers start to question the validity of all test outcomes, not just the flaky ones. This skepticism can lead to a dismissive attitude toward failing tests, potentially allowing real issues to slip through unnoticed. Over time, this erodes confidence in the testing suite as a reliable quality assurance tool.

### 2. Wasted Time and Resources

Flaky tests are notorious time sinks. Engineers often find themselves rerunning tests to determine if a failure is genuine or just another instance of flakiness. This repetitive process consumes valuable time and resources that could be better allocated to more productive tasks, such as feature development or addressing actual bugs.

### 3. Delayed Feedback Loop

In continuous integration and continuous deployment (CI/CD) environments, flaky tests can cause significant delays in the feedback loop. The uncertainty caused by these tests means that code changes cannot be reliably and swiftly moved through the pipeline. These delays impede the agility of the development process, slowing the delivery of new features and fixes. In fast-paced development environments, these delays can be especially detrimental, impacting the overall time-to-market and the ability to quickly adapt to user requirements.

## The First Line of Defense

The best approach to handle flaky tests is to prevent them from occurring in the first place. Here’s how Vedro contributes to this:

### 🛠️ Boosting Test Reliability with Vedro's Best Practices

Vedro promotes <Link to="https://docs.vedro.io/best-practices">best practices</Link> that not only make tests maintainable but also stable, like writing clear tests, avoiding dependencies between tests, and ensuring each test is self-contained. By encouraging and facilitating good practices, Vedro significantly reduces the chances of introducing flaky tests in the first place.

### 🔄 Achieving Test Consistency Through Multiple Runs

Another effective strategy employed by Vedro to combat the issue of flaky tests is the implementation of multiple test runs. This approach is rooted in the principle that consistency in test results is key to establishing their reliability. Running a new test multiple times before integrating it into the codebase greatly enhances the chances of catching flaky behavior early in the development process.

Vedro simplifies this process with straightforward command-line options. For example, executing a test multiple times is achievable using the command:

<Tabs>
  <TabItem value="short_form" label="Short Form" default>

```shell
$ vedro run -N 3
```

  </TabItem>
  <TabItem value="long_form" label="Long Form">

```shell
$ vedro run --repeats 3
```

  </TabItem>
</Tabs>

Output example:

<TerminalOutput>
{`
Scenarios
[1m* auth / register[0m[1m
[0m [32m✔ register via email[0m[32m
[0m │
 ├─[1/3] [32m✔ register via email[0m[38;5;244m (0.18s)[0m[38;5;244m
[0m │
 ├─[2/3] [32m✔ register via email[0m[38;5;244m (0.12s)[0m[38;5;244m
[0m │
 ├─[3/3] [32m✔ register via email[0m[38;5;244m (0.11s)[0m[38;5;244m
[0m 
 
[38;5;249m# --seed c5e5829e-b6a3-459c-a97c-f9047682ae6d
# repeated x3[0m[38;5;249m
[0m[1;32m# 1 scenario, 1 passed, 0 failed, 0 skipped[0m[34m (0.42s)[0m[34m
[0m
`}
</TerminalOutput>

### 🔍 Unveiling Hidden Dependencies with Random Test Ordering

A critical factor in ensuring the robustness of a test suite is the independence of each test. Tests should not rely on the execution sequence or the side effects of other tests to pass. However, in reality, hidden dependencies between tests can exist, often unnoticed until they manifest as flaky behavior.

Running tests in a randomized order is an effective strategy to expose these hidden dependencies. If a test suite consistently passes when executed in a specific order but fails under a randomized sequence, it indicates that some tests are not truly independent. This scenario is a red flag, signaling the presence of interdependencies that can lead to unpredictable test outcomes.

Vedro makes it easy to run tests in a random order, which can be done using a simple command:

```shell
$ vedro run --order-random
```

## Ensuring Test Reliability

While the features and best practices provided by Vedro significantly enhance test reliability, there is an inherent challenge: ensuring that all team members consistently follow these guidelines and run new or modified tests before integrating them into the codebase. Vedro addresses this challenge through automation and integration tools designed to enforce best practices and efficiently detect flakiness.

### 🤖 Automating Flakiness Detection

Vedro offers a plugin, <Link to="https://pypi.org/project/vedro-git-changed/">vedro-git-changed</Link>, which automatically identifies and runs test scenarios that have changed relative to a specified git branch. This targeted approach ensures that newly introduced or modified tests are scrutinized for flakiness before being merged.

To install the plugin, use the command:

```shell
$ vedro plugin install vedro-git-changed
```

To run tests that have changed against the main branch, execute:

```shell
$ vedro run --changed-against-branch=main
```

To further bolster flaky test detection and ensure test suite robustness, the plugin can be seamlessly integrated into CI pipelines. Here are example configurations for <Link to="https://docs.gitlab.com/ee/ci/">GitLab CI</Link>
 and <Link to="https://github.com/features/actions">GitHub Actions</Link>:

<Tabs>
  <TabItem value="gitlab_ci" label="GitLab CI" default>

```yaml
# .gitlab-ci.yml
run_changed_tests:
  stage: test
  image: python:3.11
  before_script:
    - pip install -r requirements.txt
  script:
    - vedro run --changed-against-branch=main -N 10 --order-random
  only:
    refs:
      - branches
    changes:
      - scenarios/**/*
```

  </TabItem>
  <TabItem value="github_actions" label="GitHub Actions">

```yaml
# .github/workflows/run_changed_tests.yml
on:
  push:
    branches-ignore:
      - 'main'
    paths:
      - 'scenarios/**'

jobs:
  run_changed_tests:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'

    - name: Install Dependencies
      run: pip install -r requirements.txt

    - name: Run Changed Tests
      run: vedro run --changed-against-branch=main -N 10 --order-random
```

  </TabItem>
</Tabs>

The `vedro-git-changed` plugin not only simplifies the process of running new or changed tests locally but also establishes a robust quality gate within the CI pipeline. Automatically running tests multiple times in random order reduces the likelihood of undetected flakiness.

### ✅ Enforcing Best Practices

<Link to="/docs/integrations/flake8-linter" target="_blank">Flake8-Vedro</Link> extends the capabilities of the popular <Link to="https://flake8.pycqa.org/en/latest/">Flake8</Link> linting tool by introducing rules and checks specifically tailored for Vedro test scenarios. Although it might not cover every possible best practice, it focuses on enforcing a set of rules that significantly contribute to improving test quality.

To install `flake8-vedro`, run the following command:

```shell
$ pip install flake8-vedro
```

To check for linting errors, use the command below:

```shell
$ flake8
```

Integrating Flake8-Vedro into the CI pipeline adds another layer of quality control. By automatically running this specialized linter on each commit, it detects deviations from established best practices early in the development cycle. Alongside code reviews, this automated check acts as a vigilant gatekeeper, ensuring that all tests remain maintainable and stable. This approach upholds the quality and reliability of the test suite.
