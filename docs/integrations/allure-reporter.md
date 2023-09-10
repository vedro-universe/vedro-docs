---
id: allure-reporter
---

import Link from '@site/src/components/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Screenshot from '@site/src/components/Screenshot';

# Allure Reporter

<Link to="https://pypi.org/project/vedro-allure-reporter/">Allure Reporter</Link> is a plugin for Vedro that provides integration with the <Link to="https://docs.qameta.io/allure/">Allure Framework</Link>, a flexible, lightweight, multi-language test report tool. The Allure Framework offers a concise representation of test results in a clean, easily understandable web report format.

## Installation

<Tabs>
  <TabItem value="quick" label="Quick" default>

For a quick installation, you can use a plugin manager like so:

```shell
$ vedro plugin install vedro-allure-reporter
```

  </TabItem>
  <TabItem value="manual" label="Manual">

If you prefer a manual approach, follow these steps:

1. Install the package using pip:

```shell
$ pip3 install vedro-allure-reporter
```

2. Then, enable the plugin in the `vedro.cfg.py` configuration file:

```python
# ./vedro.cfg.py
import vedro
import vedro_allure_reporter


class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class AllureReporter(vedro_allure_reporter.AllureReporter):
            enabled = True
```

  </TabItem>
</Tabs>

## Basic Usage

To run tests with the Allure reporter, use the following command:

```shell
$ vedro run -r rich allure
```

This command executes your tests and saves the report data in the `./allure_reports` directory.

To generate a report from the saved data, use the <Link to="https://docs.qameta.io/allure/#_installing_a_commandline">Allure command-line tool</Link> as follows:

```shell
$ allure serve ./allure_reports
```

This command will serve up the report (<Link to="https://allure-framework.github.io/allure-demo/5/">demo</Link>).

:::info

If you are using <Link to="https://docs.qameta.io/allure-testops/">Allure TestOps</Link>, you can upload your report using <Link to="https://docs.qameta.io/allure-testops/ecosystem/allurectl/">allurectl</Link>

<details>
  <summary>Show more...</summary>
  <div>

```shell
$ export ALLURE_ENDPOINT=<endpoint>
$ export ALLURE_PROJECT_ID=<project_id>
$ export ALLURE_TOKEN=<token>

$ export LAUNCH_ID=`allurectl launch create --launch-name test --no-header --format ID | tail -n1`
$ allurectl upload ./allure_reports --launch-id $LAUNCH_ID
$ allurectl launch close $LAUNCH_ID
```

  </div>
</details>

:::

## Labels

You can easily label your tests using Allure's built-in decorators. Labels help you categorize your tests and add metadata for better reporting and visualization.

For example, you can label behaviors using the `Epic`, `Feature`, and `Story` decorators:

```python
import vedro
from vedro_allure_reporter import allure_labels, Story, Epic, Feature

@allure_labels(
    Epic("User Profile Management"),
    Feature("Updating Profile Details"),
    Story("Profile Picture Update")
)
class Scenario(vedro.Scenario):
    subject = "update profile picture"

    ...
```

In addition to the built-in labels, Allure also allows you to create custom labels:

```python
import vedro
from vedro_allure_reporter import allure_labels, AllureLabel

@allure_labels(AllureLabel("smoke", "true"))
class Scenario(vedro.Scenario):
    subject = "update profile picture"

    ...
```

## Configuration

The Allure Reporter is customizable to your needs. You can define the project name, set the report directory, attach tags, artifacts, define scope, and even apply global labels.

### Project Name

```python
# ./vedro.cfg.py
class AllureReporter(allure_reporter.AllureReporter):
    project_name = "<project_name>"
```

This option adds the "project_name" label to every scenario. This is useful when your final report contains scenarios from different projects or repos.

### Report Directory

```python
# ./vedro.cfg.py
class AllureReporter(allure_reporter.AllureReporter):
    report_dir: Path = Path("./allure_reports")
```

This option sets the directory for Allure reports. The default report directory is `./allure_reports`.

### Tags

```python
# ./vedro.cfg.py
class AllureReporter(allure_reporter.AllureReporter):
    attach_tags = True
```

You can attach tags to your Allure report. This option is set to `True` by default.

For example:

```python
import vedro

class Scenario(vedro.Scenario):
    subject = "update profile picture"
    tags = ["API"]
```

<Screenshot src={require('./allure/allure_tags.png')} />

### Artifacts

```python
# ./vedro.cfg.py
class AllureReporter(allure_reporter.AllureReporter):
    attach_artifacts = True
```

Artifacts, such as files and logs, or other supplementary data, can be attached to your report. This option is set to `True` by default.

<Tabs>
  <TabItem value="file_artifact" label="FileArtifact" default>

```python
import vedro
from vedro.plugins.artifacted import attach_artifact, FileArtifact
from PIL import Image
from pathlib import Path

@vedro.context
def generated_profile_picture(filename="picture.png") -> Image:
    image = Image.new("RGB", size=(100, 100))
    image.save(filename, format="png")

    artifact = FileArtifact(filename, "image/png", Path(filename))
    attach_artifact(artifact)

    return image
```

  </TabItem>
  <TabItem value="memory_artifact" label="MemoryArtifact">

```python
import vedro
from vedro.plugins.artifacted import attach_artifact, MemoryArtifact
from PIL import Image
from io import BytesIO

@vedro.context
def generated_profile_picture(filename="picture.png") -> Image:
    binary = BytesIO()
    image = Image.new("RGB", size=(100, 100))
    image.save(binary, format="png")

    artifact = MemoryArtifact(filename, "image/png", binary.getvalue())
    attach_artifact(artifact)

    return image
```

  </TabItem>
</Tabs>

This will attach the generated profile picture to the Allure report as an artifact.

<Screenshot src={require('./allure/allure_artifact.png')} />

### Scope

```python
# ./vedro.cfg.py
class AllureReporter(allure_reporter.AllureReporter):
    attach_scope = True
```

The <Link to="/docs/features/scope" target='_blank'>Scope</Link> can be attached to your Allure report. Note, this is set to `False` by default.

<Screenshot src={require('./allure/allure_scope.png')} />

### Global Labels

```python
# ./vedro.cfg.py
from vedro_allure_reporter import AllureLabel

class AllureReporter(allure_reporter.AllureReporter):
    labels = [
        AllureLabel("microservice", "profile"),
    ]
```

You can use this configuration option to add custom labels to each scenario.

## Command Line Arguments

- `--allure-report-dir` — Sets the directory for Allure reports. The default is` ./allure_reports`.
- `--allure-attach-scope` — Attaches scope to the Allure report.

These command-line arguments can be used to override the default configurations specified in the `vedro.cfg.py` file.

### Running Scenarios with Labels

Vedro Allure Reporter allows running specific scenarios annotated with particular <Link to="https://docs.qameta.io/allure-testops/faq/labels/">Allure labels</Link>.

To filter and execute scenarios based on specific Allure labels, use the `--allure-labels` argument followed by the label name and its corresponding value:

```shell
$ vedro run --allure-labels label1=val1 label2=val2 ...
```

For example, to run scenarios exclusively labelled with the `Epic` _"User Profile Management"_ and the `Feature` _"Updating Profile Details"_, use the following command:

```shell
$ vedro run --allure-labels epic="User Profile Management" feature="Updating Profile Details"
```
