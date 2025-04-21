---
id: debug-prompt
---

import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Debug Prompt

Auto‑generates **AI‑friendly debug prompts** for failed Vedro scenarios, helping you quickly spot root causes and apply the *smallest* possible fix.

## ✨ Features

- **Zero‑config.** Enable the plugin and you’re done.
- **Automatic prompt generation.** On every failed scenario a Markdown file is produced with steps, source, error message & traceback.
- **LLM‑ready.** A built‑in *system prompt* instructs [ChatGPT](https://chatgpt.com) (or any LLM) to analyse, locate the bug and suggest a minimal patch.

## 🛠 Installation

<Tabs>
  <TabItem value="quick" label="Quick" default>

For a one‑liner install via Vedro’s plugin manager:

```shell
$ vedro plugin install vedro-debug-prompt
```

  </TabItem>
  <TabItem value="manual" label="Manual">

Prefer manual steps? No problem:

1. Install the package:

```shell
$ pip install vedro-debug-prompt
```

2. Enable the plugin in `vedro.cfg.py`:

```python
import vedro
import vedro_debug_prompt

class Config(vedro.Config):

    class Plugins(vedro.Config.Plugins):

        class DebugPrompt(vedro_debug_prompt.DebugPrompt):
            enabled = True
```

  </TabItem>
</Tabs>

## 🚀 Usage

Run your tests as usual:

```sh
$ vedro run
```

Example output when a scenario fails:

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ decode base64 encoded string[0m[31m
[0m   [38;5;244m|> AI Debug Prompt: .vedro/tmp/prompt_liywiyo1.md[0m[38;5;244m
[0m   [32m✔ given_encoded_string[0m[32m
[0m   [32m✔ when_user_decodes_string[0m[32m
[0m   [31m✗ then_it_should_return_decoded_string[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m─────────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/scenarios/[0m[1;33mdecode_base64_str.py[0m:[94m20[0m in [92mthen_it_should_return[0m                  [31m│[0m
[31m│[0m                                                                              [31m│[0m
[31m│[0m   [2m17 [0m        [96mself[0m.result = b64decode([96mself[0m.encoded)                           [31m│[0m
[31m│[0m   [2m18 [0m                                                                        [31m│[0m
[31m│[0m   [2m19 [0m    [94mdef[0m[90m [0m[92mthen_it_should_return_decoded_string[0m([96mself[0m):                     [31m│[0m
[31m│[0m [31m❱ [0m20         [1;4;94massert[0m[1;4m [0m[1;4;96mself[0m[1;4m.result == [0m[1;4;33m"[0m[1;4;33mbanana[0m[1;4;33m"[0m                                  [31m│[0m
[31m│[0m   [2m21 [0m                                                                        [31m│[0m
[31m╰──────────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [32m- 'banana'[0m 
    [31m+ [0m[30;41mb[0m[31m'banana'[0m 
 
 
[38;5;249m# --seed 280dc986-e618-4102-aa53-056c2876c00e[0m[38;5;249m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.00s)[0m[34m
[0m
`}
</TerminalOutput>


Open the referenced `prompt_*.md` file and paste its contents into ChatGPT.

:::tip
In most terminals you can ⌘‑click (or Ctrl‑click on Linux/Windows) the file path to open it instantly
:::

A typical response might look like:

>1. **Root cause**
>   The call to `b64decode` returns a `bytes` object (`b'banana'`), but the test asserts against a Python `str` (`"banana"`), so the types (and values) don’t match.
>
>2. **Suggested fix (code)**  
>   Apply this minimal patch in `scenarios/decode_base64_str.py`:
>
>   ```diff
>    def when_user_decodes_string(self):
>   -    self.result = b64decode(self.encoded)
>   +    self.result = b64decode(self.encoded).decode('utf-8')
>   ```
>
>3. **Why this works**  
>   By calling `.decode('utf-8')` on the `bytes` result, you convert it to a `str` (`"banana"`), which matches the test’s expected value.
