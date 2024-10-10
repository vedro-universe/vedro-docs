# Vedro Telemetry

[vedro-telemetry](https://pypi.python.org/pypi/vedro-telemetry/) is an external Vedro plugin that enables saving telemetry events to your own **self-hosted** server.

It's useful for teams with multiple projects to monitor and analyze their test suites across different projects in a centralized manner. By collecting telemetry data, teams can gain insights into test performance and detect areas that need improvement.

## Overview

After installation and configuration, you can access several dashboards in your self-hosted Grafana instance. These dashboards provide visualizations based on the telemetry data collected from your test runs.

### 1. Project Overview

- **Description**: A list of projects with Python and Vedro versions.
- **Purpose**: Useful for tracking projects that use outdated Python versions or older versions of the Vedro framework.
- **Benefit**: Ensures all projects are up-to-date and compatible with the latest features and security updates.

### 2. Scenario Count

- **Description**: A list of projects with the count of total scenarios.
- **Purpose**: Useful for monitoring the growth of test suites over time and understanding the scale of testing efforts across projects.
- **Benefit**: Helps teams assess testing efforts and identify projects that may need more tests.

### 3. Plugin Usage

- **Description**: Displays the plugins used across different projects and the number of projects using each plugin.
- **Purpose**: Helps in understanding the common tools and plugins utilized within the team.
- **Benefit**: Promotes standardization and identifies potential needs for plugin updates or replacements.

### 4. Startup Time

- **Description**: A list of projects with the median and average time to the first significant line of the test.
- **Purpose**: Useful for measuring the startup time of tests.
- **Benefit**: Indicates the efficiency of test setup or highlights potential bottlenecks in test initialization.

### 5. Plugin Adoption

- **Description**: A list of projects with all enabled plugins (including their versions).
- **Purpose**: Useful for tracking the adoption of specific tools like Allure (if `vedro-allure-reporter` is enabled) or `vedro-git-changed` to [combat flaky tests](/docs/features/anti-flaky#ensuring-test-reliability) (plugin targets changed tests to help detect flakiness early).
- **Benefit**: Helps teams monitor which plugins are being used across projects, ensuring consistency and aiding in the adoption of useful tools.

## Installation

1. **Set Up Self-Hosted Telemetry Server**

   Before using the plugin, you need to set up your own telemetry server to collect and store the telemetry data. Instructions on how to set up a self-hosted telemetry server can be found [here](/docs/solutions/setting-up-self-hosted-telemetry-server).

2. **Install the Plugin**

   Install the `vedro-telemetry` plugin using the following command:

   ```bash
   $ vedro plugin install vedro-telemetry
   ```

3. **Configure the Plugin**

   Configure the `api_url` to point to your telemetry server in your `vedro.cfg.py` configuration file:

   ```python
   import vedro
   import vedro_telemetry

   class Config(vedro.Config):
       class Plugins(vedro.Config.Plugins):
           class VedroTelemetry(vedro_telemetry.VedroTelemetry):
               enabled = True
               api_url = "http://localhost:8080"
               project_id = "my-project"
   ```

   Replace `"http://localhost:8080"` with the URL of your self-hosted telemetry server, and `"my-project"` with your project's unique identifier.

## Usage

Once the plugin is installed and configured, it will automatically start collecting telemetry data during your Vedro test runs.

Run your Vedro tests as usual:

```bash
$ vedro run
```

At the end of the test session, the collected telemetry data will be sent to the specified API endpoint.

Examples of the data that will be sent are available [here](https://github.com/vedro-universe/vedro-telemetry/tree/main/examples).
