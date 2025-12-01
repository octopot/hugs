---
id: 7
database_id: 322539799
node_id: MDU6SXNzdWUzMjI1Mzk3OTk=
status: closed
title: "integrate material kit template"
labels: []
url: https://github.com/octopot/hugs/issues/7
created_at: 2018-05-12T20:14:40Z
updated_at: 2018-05-17T15:30:32Z
---

# integrate material kit template

```
+.PHONY: pull-template
 +pull-template:
 +	rm -rf template
 +	git clone git@bitbucket.org:octotpl/materialkit.git template
 +	( \
 +	  cd template && \
 +	  git checkout 2.x && \
 +	  git describe --tags \
 +	)
 +	( \
 +	  cp -n template/Template/assets/css/material-kit.min.css docs/assets/css/ && \
 +	  cp -n template/Template/assets/js/bootstrap-material-design.min.js docs/assets/js/ \
 +	  cp -n template/Template/assets/js/material-kit.min.js docs/assets/js/ \
 +	)
 +	rm -rf template/.git
```
