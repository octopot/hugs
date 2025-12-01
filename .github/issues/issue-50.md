---
id: 50
database_id: 326041066
node_id: MDU6SXNzdWUzMjYwNDEwNjY=
status: closed
title: "use trim for proxy/forma"
labels: []
url: https://github.com/octopot/hugs/issues/50
created_at: 2018-05-24T09:37:57Z
updated_at: 2018-05-24T10:30:52Z
---

# use trim for proxy/forma

```
like for proxy/click
    {{- $base  := strings.TrimRight "/" (cond $enabled .Site.BaseURL $service) -}}
    {{- $path  := strings.TrimLeft  "/" (cond $_has $_pass $click) -}}
```
