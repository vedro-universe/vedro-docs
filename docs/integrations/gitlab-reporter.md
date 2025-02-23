---
id: gitlab-reporter
---

import Link from '@site/src/components/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Screenshot from '@site/src/components/Screenshot';
import VideoEmbed from '@site/src/components/VideoEmbed';

# GitLab Reporter

<Link to="https://pypi.org/project/vedro-gitlab-reporter/">GitLab Reporter</Link> is a Vedro plugin that enhances the readability and navigability of your test reports. By utilizing <Link to="https://docs.gitlab.com/ee/ci/jobs/#custom-collapsible-sections">GitLab's collapsible sections</Link>, it provides a more organized and efficient way to review your reports.

The plugin allows you to collapse different elements of your reports, such as steps, variables, or the test scope, making it easier to manage and comprehend the information.

## Installation

<Tabs>
  <TabItem value="quick" label="Quick" default>

For a quick installation, you can use a plugin manager like so:

```shell
$ vedro plugin install vedro-gitlab-reporter
```

  </TabItem>
  <TabItem value="manual" label="Manual">

If you prefer a manual approach, follow these steps:

1. Install the package using pip:

```shell
$ pip install vedro-gitlab-reporter
```

2. Then, enable the plugin in the `vedro.cfg.py` configuration file:

```python
# ./vedro.cfg.py
import vedro
import vedro_gitlab_reporter

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class GitlabReporter(vedro_gitlab_reporter.GitlabReporter):
            enabled = True
```

  </TabItem>
</Tabs>

## How to Use GitLab Reporter

After the installation, all you need to do is run your Vedro tests with the GitLab Reporter as follows:

```shell
$ vedro run -r gitlab --gitlab-collapsable {steps,vars,scope}
```

In the command above, the \{steps, vars, scope\} parameters dictate what elements the plugin should collapse in your report. Each mode has its unique functionality; let's explore them in further detail.

### Steps Mode

In the steps mode, exceptions in the report will be displayed while the steps are collapsed. This mode enhances the readability of your report by giving you the option to show or hide variables within each step.

```shell
$ vedro run -r gitlab --gitlab-collapsable steps
```

<VideoEmbed
  src={require('./gitlab/collapsable_steps.mov')}
  preview={require('./gitlab/collapsable_steps.png')}
  width="700px"
  height="525px"
/>

### Vars Mode

The vars mode operates differently. In this mode, the plugin will show both exceptions and step names while collapsing the variables. This mode provides greater control over the report details by allowing you to selectively show or hide variable values.

```shell
$ vedro run -r gitlab --gitlab-collapsable vars
```

<VideoEmbed
  src={require('./gitlab/collapsable_vars.mov')}
  preview={require('./gitlab/collapsable_vars.png')}
  width="700px"
  height="525px"
/>

### Scope Mode

Alternatively, in the scope mode, exceptions and step names are displayed while the <Link to="/docs/features/scope" target='_blank'>Scope</Link> is collapsed.  This provides you with the flexibility to show or hide the test Scope within your report, allowing for a high-level overview of the test while retaining the option to delve into more detail when necessary.

```shell
$ vedro run -r gitlab --gitlab-collapsable scope
```

<VideoEmbed
  src={require('./gitlab/collapsable_scope.mov')}
  preview={require('./gitlab/collapsable_scope.png')}
  width="700px"
  height="525px"
/>
