---
id: measuring-coverage
---

# Measuring Coverage

Code coverage is a crucial metric in software testing, providing insights into which parts of the codebase are exercised by tests and identifying untested sections. Measuring coverage ensures that critical logic is thoroughly tested, reducing the risk of undetected bugs. In the Python ecosystem, the de facto standard for measuring test coverage is [`coverage.py`](https://coverage.readthedocs.io/en/latest/).

## Setting Up Coverage Measurement

### 1. Install `coverage.py`

First, install `coverage.py` using `pip`:

```sh
$ pip install coverage
```

This tool will track executed code during test runs and generate coverage reports.

### 2. Run Tests with Coverage Tracking

To measure coverage while running Vedro tests, execute the following command:

```sh
$ coverage run -m vedro run scenarios/
```

Here’s what happens:

- `coverage run` starts tracking code execution.
- `-m vedro run scenarios/` instructs Vedro to execute all scenarios in the `scenarios/` directory.

### 3. Generate and View Coverage Reports

Once tests complete, generate a text-based coverage report:

```sh
$ coverage report
```

For a more detailed and interactive HTML report:

```sh
$ coverage html
```

Then, open `htmlcov/index.html` in a web browser to explore coverage results visually.

## Uploading Coverage Data to Codecov

[Codecov](https://about.codecov.io/) automates coverage reporting, integrates with CI/CD pipelines, and provides analytics on test coverage trends.

### GitHub Actions Integration

To automate test execution and coverage reporting in GitHub Actions, create `.github/workflows/coverage.yml`:

```yaml
name: Run Tests and Upload Coverage

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install Dependencies
        run: |
          pip install -r requirements.txt
          pip install coverage

      - name: Run Tests with Coverage
        run: |
          coverage run -m vedro run
          coverage xml -o coverage.xml
          coverage report

      - name: Upload Coverage Report
        uses: codecov/codecov-action@v4
        with:
            files: ./coverage.xml
            token: ${{ secrets.CODECOV_TOKEN }}
```

For additional details, refer to the [official GitHub Actions documentation](https://docs.github.com/en/actions/quickstart).

## Best Practices for Coverage Analysis

### 1. Aim for Meaningful Coverage

Strive for high coverage but avoid focusing solely on percentage. Instead, ensure critical paths, edge cases, and business logic are well tested.

### 2. Exclude Non-Essential Code

Exclude test utilities, third-party libraries, and boilerplate code from coverage reports. For more details on configuration options, refer to the [official documentation](https://coverage.readthedocs.io/en/latest/config.html).

### 3. Enforce Coverage Thresholds

To prevent regressions, enforce minimum coverage percentages in CI pipelines:

```sh
$ coverage report --fail-under=80
```

This ensures that test coverage remains above 80% before merging changes.

For Codecov users, configuration options can be customized using a `codecov.yml` file. Refer to the [Codecov documentation](https://docs.codecov.com/docs/codecov-yaml) for details.
