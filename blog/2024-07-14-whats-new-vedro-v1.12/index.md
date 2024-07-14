---
slug: whats-new-vedro-v1.12
tags: [vedro, changelog]
hide_table_of_contents: false
---

import Link from '@site/src/components/Link';
import TerminalOutput from '@site/src/components/TerminalOutput';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SubscribeTip from '../_subscribe_for_updates.md';

# What's New in Vedro v1.12

We are excited to announce the release of <Link to="https://pypi.org/project/vedro/">Vedro v1.12</Link>, bringing several new features and enhancements designed to improve your testing experience. Let's dive into the details of this update.

<!--truncate-->

## New Assertions with Beautiful Diffs

### Enhanced AssertionError Output

We've introduced new assertions that provide beautiful and informative diffs, making it easier to spot differences between expected and actual values.

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ update task[0m[31m
[0m   [32m✔ given_created_task[0m[32m
[0m   [32m✔ when_user_updates_task[0m[32m
[0m   [31m✗ then_it_should_return_updated_task[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m──────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/tests/scenarios/[0m[1;33mupdate_task.py[0m:[94m26[0m in [92mthen_it_should_return_updated_task[0m  [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m23 [0m        }                                                            [31m│[0m
[31m│[0m   [2m24 [0m                                                                     [31m│[0m
[31m│[0m   [2m25 [0m    [94mdef[0m [92mthen_it_should_return_updated_task[0m([96mself[0m):                    [31m│[0m
[31m│[0m [31m❱ [0m26         [94massert[0m [96mself[0m.result == {                                      [31m│[0m
[31m│[0m   [2m27 [0m            [33m"[0m[33mtotal[0m[33m"[0m: [94m1[0m,                                              [31m│[0m
[31m│[0m   [2m28 [0m            [33m"[0m[33mitems[0m[33m"[0m: [                                               [31m│[0m
[31m│[0m   [2m29 [0m                {                                                    [31m│[0m
[31m╰───────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [38;5;244m          {[0m
    [32m-             'task_id': [0m[30;42m1[0m[32m,[0m
    [31m+             'task_id': [0m[30;41m2[0m[31m,[0m
    [38;5;244m              'description': 'Implement user authentication system',[0m
    [38;5;244m...[0m
    [38;5;244m              'assignee': 'Bob',[0m
    [32m-             'due_date': '2024-07-1[0m[30;42m4[0m[32m'[0m
    [31m+             'due_date': '2024-07-1[0m[30;41m5[0m[31m'[0m
    [38;5;244m          }[0m
 
 
[38;5;249m# --seed 69a72e09-1556-4cd7-b13a-895797bd2cd0[0m[38;5;249m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.10s)[0m[34m
[0m
`}
</TerminalOutput>

### Full Diff Display

For more detailed output, use the `--show-full-diff` argument to see the complete diff of the assertions.

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ update task[0m[31m
[0m   [32m✔ given_created_task[0m[32m
[0m   [32m✔ when_user_updates_task[0m[32m
[0m   [31m✗ then_it_should_return_updated_task[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m──────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/tests/scenarios/[0m[1;33mupdate_task.py[0m:[94m26[0m in [92mthen_it_should_return_updated_task[0m  [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m23 [0m        }                                                            [31m│[0m
[31m│[0m   [2m24 [0m                                                                     [31m│[0m
[31m│[0m   [2m25 [0m    [94mdef[0m [92mthen_it_should_return_updated_task[0m([96mself[0m):                    [31m│[0m
[31m│[0m [31m❱ [0m26         [94massert[0m [96mself[0m.result == {                                      [31m│[0m
[31m│[0m   [2m27 [0m            [33m"[0m[33mtotal[0m[33m"[0m: [94m1[0m,                                              [31m│[0m
[31m│[0m   [2m28 [0m            [33m"[0m[33mitems[0m[33m"[0m: [                                               [31m│[0m
[31m│[0m   [2m29 [0m                {                                                    [31m│[0m
[31m╰───────────────────────────────────────────────────────────────────────────╯[0m
[1;91mAssertionError[0m
[1m>>> assert [0m[1;31mactual[0m[1m == [0m[1;32mexpected[0m
    [38;5;244m  {[0m
    [38;5;244m      'total': 1,[0m
    [38;5;244m      'items': [[0m
    [38;5;244m          {[0m
    [32m-             'task_id': [0m[30;42m1[0m[32m,[0m
    [31m+             'task_id': [0m[30;41m2[0m[31m,[0m
    [38;5;244m              'description': 'Implement user authentication system',[0m
    [38;5;244m              'status': 'in progress',[0m
    [38;5;244m              'assignee': 'Bob',[0m
    [32m-             'due_date': '2024-07-1[0m[30;42m4[0m[32m'[0m
    [31m+             'due_date': '2024-07-1[0m[30;41m5[0m[31m'[0m
    [38;5;244m          }[0m
    [38;5;244m      ][0m
    [38;5;244m  }[0m
 
 
[38;5;249m# --seed afa8aad3-0a43-44f1-b12c-cbfa9c57ee63[0m[38;5;249m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.10s)[0m[34m
[0m
`}
</TerminalOutput>

## New Command-Line Arguments

### Change Project Directory

The `--project-dir` argument allows you to specify the root directory of your project, providing a reference point for relative paths and file operations. By default, it uses the directory from which the command is executed.

```shell
$ vedro run --project-dir /app/tests
```

## Enhancements to RichReporter

### Suppress Modules in Traceback

The `tb_suppress_modules` parameter allows you to suppress specific modules in the traceback output, making the relevant information more prominent.

<Tabs>
  <TabItem value="suppressed" label="Suppressed" default>

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ login as user[0m[31m
[0m   [32m✔ given_user_creds[0m[32m
[0m   [32m✔ when_user_logins[0m[32m
[0m   [32m✔ then_it_should_return_ok_status[0m[32m
[0m   [31m✗ and_it_should_return_json_body[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m──────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/tests/scenarios/[0m[1;33mlogin_as_user.py[0m:[94m33[0m in [92mand_it_should_return_json_body[0m    [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m30 [0m        [94massert[0m [96mself[0m.response.status_code == [94m200[0m                      [31m│[0m
[31m│[0m   [2m31 [0m                                                                     [31m│[0m
[31m│[0m   [2m32 [0m    [94mdef[0m [92mand_it_should_return_json_body[0m([96mself[0m):                        [31m│[0m
[31m│[0m [31m❱ [0m33         [94massert[0m json.loads([96mself[0m.response.body) == {}                  [31m│[0m
[31m│[0m   [2m34 [0m                                                                     [31m│[0m
[31m╰───────────────────────────────────────────────────────────────────────────╯[0m
[1;91mJSONDecodeError: [0mExpecting value: line [1;36m1[0m column [1;36m2[0m [1m([0mchar [1;36m1[0m[1m)[0m
 
 
[37m# --seed 19686856-8704-4d7b-8088-6044ba4e8052[0m[37m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.10s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
  <TabItem value="not_suppressed" label="Not Suppressed">

<TerminalOutput>
{`
Scenarios
[1m* [0m[1m
[0m [31m✗ login as user[0m[31m
[0m   [32m✔ given_user_creds[0m[32m
[0m   [32m✔ when_user_logins[0m[32m
[0m   [32m✔ then_it_should_return_ok_status[0m[32m
[0m   [31m✗ and_it_should_return_json_body[0m[31m
[0m[31m╭─[0m[31m────────────────────[0m[31m [0m[1;31mTraceback [0m[1;2;31m(most recent call last)[0m[31m [0m[31m──────────────────[0m[31m─╮[0m
[31m│[0m [2;33m/tests/scenarios/[0m[1;33mlogin_as_user.py[0m:[94m33[0m in [92mand_it_should_return_json_body[0m    [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m30 [0m        [94massert[0m [96mself[0m.response.status_code == [94m200[0m                      [31m│[0m
[31m│[0m   [2m31 [0m                                                                     [31m│[0m
[31m│[0m   [2m32 [0m    [94mdef[0m [92mand_it_should_return_json_body[0m([96mself[0m):                        [31m│[0m
[31m│[0m [31m❱ [0m33         [94massert[0m json.loads([96mself[0m.response.body) == {}                  [31m│[0m
[31m│[0m   [2m34 [0m                                                                     [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m [2;33m/usr/local/lib/python3.12/json/[0m[1;33m__init__.py[0m:[94m346[0m in [92mloads[0m                   [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m343 [0m    [94mif[0m ([96mcls[0m [95mis[0m [94mNone[0m [95mand[0m object_hook [95mis[0m [94mNone[0m [95mand[0m                     [31m│[0m
[31m│[0m   [2m344 [0m            parse_int [95mis[0m [94mNone[0m [95mand[0m parse_float [95mis[0m [94mNone[0m [95mand[0m           [31m│[0m
[31m│[0m   [2m345 [0m            parse_constant [95mis[0m [94mNone[0m [95mand[0m object_pairs_hook [95mis[0m [94mNone[0m   [0m [31m│[0m
[31m│[0m [31m❱ [0m346         [94mreturn[0m _default_decoder.decode(s)                           [31m│[0m
[31m│[0m   [2m347 [0m    [94mif[0m [96mcls[0m [95mis[0m [94mNone[0m:                                                 [31m│[0m
[31m│[0m   [2m348 [0m        [96mcls[0m = JSONDecoder                                           [31m│[0m
[31m│[0m   [2m349 [0m    [94mif[0m object_hook [95mis[0m [95mnot[0m [94mNone[0m:                                     [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m [2;33m/usr/local/lib/python3.12/json/[0m[1;33mdecoder.py[0m:[94m337[0m in [92mdecode[0m                   [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m334 [0m[33m        containing a JSON document).[0m                                [31m│[0m
[31m│[0m   [2m335 [0m                                                                    [31m│[0m
[31m│[0m   [2m336 [0m[33m        """[0m                                                         [31m│[0m
[31m│[0m [31m❱ [0m337         obj, end = [96mself[0m.raw_decode(s, idx=_w(s, [94m0[0m).end())           [31m│[0m
[31m│[0m   [2m338 [0m        end = _w(s, end).end()                                      [31m│[0m
[31m│[0m   [2m339 [0m        [94mif[0m end != [96mlen[0m(s):                                           [31m│[0m
[31m│[0m   [2m340 [0m            [94mraise[0m JSONDecodeError([33m"[0m[33mExtra data[0m[33m"[0m, s, end)             [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m [2;33m/usr/local/lib/python3.12/json/[0m[1;33mdecoder.py[0m:[94m355[0m in [92mraw_decode[0m               [31m│[0m
[31m│[0m                                                                           [31m│[0m
[31m│[0m   [2m352 [0m        [94mtry[0m:                                                        [31m│[0m
[31m│[0m   [2m353 [0m            obj, end = [96mself[0m.scan_once(s, idx)                       [31m│[0m
[31m│[0m   [2m354 [0m        [94mexcept[0m [96mStopIteration[0m [94mas[0m err:                                [31m│[0m
[31m│[0m [31m❱ [0m355             [94mraise[0m JSONDecodeError([33m"[0m[33mExpecting value[0m[33m"[0m, s, err.value) [0m [31m│[0m
[31m│[0m   [2m356 [0m        [94mreturn[0m obj, end                                             [31m│[0m
[31m│[0m   [2m357 [0m                                                                    [31m│[0m
[31m╰───────────────────────────────────────────────────────────────────────────╯[0m
[1;91mJSONDecodeError: [0mExpecting value: line [1;36m1[0m column [1;36m2[0m [1m([0mchar [1;36m1[0m[1m)[0m
 
 
[37m# --seed 1094bf78-c18e-4dae-ba73-55c57ac1a105[0m[37m
[0m[1;31m# 1 scenario, 0 passed, 1 failed, 0 skipped[0m[34m (0.10s)[0m[34m
[0m
`}
</TerminalOutput>

  </TabItem>
</Tabs>

### Traceback Width Control

Set the width of the traceback output with the `tb_width` parameter. If not set, the terminal width will be used.

```python
class RichReporter(vedro.plugins.director.rich.RichReporter):
    tb_width = 120
```

### Show Scope

The `show_scope` parameter (and `--show-scope` or `-S` argument) provides a snapshot of crucial variables when a test scenario fails. It is now the recommended way to show scope.

```shell
$ vedro run -S
```

---

<SubscribeTip />
