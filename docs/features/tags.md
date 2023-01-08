---
id: tags
title: Tags
slug: tags
---
# Tags

```python
import vedro

class Scenario(vedro.Scenario):
    subject = "register user"
    tags = ["P0"]
```

```shell
$ vedro run -t P0
```
