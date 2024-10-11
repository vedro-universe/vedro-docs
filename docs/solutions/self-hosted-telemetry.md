import Link from '@site/src/components/Link';

# Vedro Telemetry

<Link to="https://pypi.python.org/pypi/vedro-telemetry/">vedro-telemetry</Link> is an external Vedro plugin that enables saving telemetry events to your own **self-hosted** server.

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
- **Purpose**: Useful for tracking the adoption of specific tools like Allure (if <Link to="https://pypi.org/project/vedro-allure-reporter/">vedro-allure-reporter</Link> is enabled) or <Link to="https://pypi.org/project/vedro-git-changed/">vedro-git-changed</Link> to combat flaky tests (plugin targets changed tests to help <Link to="/docs/features/anti-flaky#ensuring-test-reliability">detect flakiness early</Link>).
- **Benefit**: Helps teams monitor which plugins are being used across projects, ensuring consistency and aiding in the adoption of useful tools.

## Installation

1. **Set Up Self-Hosted Telemetry Server**

   Before using the plugin, you need to set up your own telemetry server to collect and store the telemetry data. Instructions on how to set up a self-hosted telemetry server can be found in the <Link to="/docs/solutions/setting-up-self-hosted-telemetry-server">Vedro Telemetry Server documentation</Link>.

2. **Install the Plugin**

   Install the <Link to="https://pypi.org/project/vedro-telemetry/">vedro-telemetry</Link> plugin using the following command:

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

   Replace `http://localhost:8080` with the URL of your self-hosted telemetry server, and `my-project` with your project's unique identifier. The `project_id` is used to distinguish data from different projects in your dashboards.

## Usage

Once the plugin is installed and configured, it will automatically start collecting telemetry data during your Vedro test runs.

Run your Vedro tests as usual:

```bash
$ vedro run
```

At the end of the test session, the collected telemetry data will be sent to the specified API endpoint.

:::info
Examples of the data that will be sent are available <Link to="https://github.com/vedro-universe/vedro-telemetry/tree/main/examples">here</Link>
:::

## Configuration

You can customize the `vedro-telemetry` plugin in your `vedro.cfg.py` file:

```python
import vedro
import vedro_telemetry

class Config(vedro.Config):
      class Plugins(vedro.Config.Plugins):
         class VedroTelemetry(vedro_telemetry.VedroTelemetry):
            api_url = "http://your-telemetry-server.com"
            project_id = "my-unique-project-id"
            timeout = 10.0
            raise_exception_on_failure = False
```

- **`api_url` (str)**:  
  Specifies the URL of your self-hosted telemetry server where the telemetry data will be sent. The default value is `"http://localhost:8080"`. Replace it with your telemetry server's URL.

- **`project_id` (str or None)**:  
  A unique identifier for your project used to distinguish data from different projects in your dashboards. If not specified, the plugin attempts to automatically determine the project name by searching for a `.git` directory in the project’s root folder. It's recommended to set this explicitly.

- **`timeout` (float)**:  
  Defines the timeout duration (in seconds) for sending telemetry data to the server. The default is `5.0`. Adjust this value if you experience timeouts.

- **`raise_exception_on_failure` (bool)**:  
  Determines whether the plugin should raise an exception if it fails to send telemetry data. The default is `True`. Set it to `False` to suppress exceptions and print error messages to `stderr` instead.
