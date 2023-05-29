---
code: null
id: MDU6SXNzdWUzMjYwNDEwNjY=
databaseId: 326041066
number: 50
url: https://github.com/octopot/hugs/issues/50
title: "use trim for proxy/forma"
issueType: null
labels: []
assignees:
  - kamilsk
milestone: "[[milestone-1]]"
parent: null
issueFields: {}
state: CLOSED
stateReason: COMPLETED
duplicateOf: null
createdAt: 2018-05-24T09:37:57Z
updatedAt: 2018-05-24T10:30:52Z
lastEditedAt: null
closedAt: 2018-05-24T10:30:52Z
---

# use trim for proxy/forma

```
like for proxy/click
    {{- $base  := strings.TrimRight "/" (cond $enabled .Site.BaseURL $service) -}}
    {{- $path  := strings.TrimLeft  "/" (cond $_has $_pass $click) -}}
```
