> # Hugs [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Platform%20for%20Static%20Sites&url=https://octolab.github.io/hugs/&via=octolab_inc&hashtags=platform,static-sites)
> [![Analytics](https://ga-beacon.appspot.com/UA-109817251-25/hugs/readme?pixel)](https://octolab.github.io/hugs/)
> Platform for Static Sites.

[![Patreon](https://img.shields.io/badge/patreon-donate-orange.svg)](https://www.patreon.com/octolab)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Quick start

Requirements:

- Docker 18.03.1-ce or above
- Docker Compose 1.21.1 or above
- GNU Make 3.81 or above

```bash
$ make up demo status

     Name                    Command               State                    Ports
---------------------------------------------------------------------------------------------------
hugs_click_1      click run --with-profiler  ...   Up      80/tcp, 8090/tcp, 8091/tcp
hugs_database_1   docker-entrypoint.sh postgres    Up      5432/tcp
hugs_forma_1      form-api run --with-profil ...   Up      80/tcp, 8090/tcp, 8091/tcp
hugs_hugo_1       /bin/sh -c hugo server --b ...   Up      1313/tcp
hugs_passport_1   passport run --with-profil ...   Up      80/tcp, 8090/tcp, 8091/tcp
hugs_server_1     /bin/bash -c echo $BASIC_U ...   Up      0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp

$ make help
# up:              Builds, (re)creates, starts, and attaches to containers for a service.
#
# clean:           Removes stopped service containers.
#
# status:          List containers and their status.
#
# down:            Stops containers and removes them with networks.
#
# destroy:         Stops containers and removes them with networks, volumes, and images
#                  created by `up`.
#                  ---
# services:        Shows available services.
#
# up-$(1):         Builds, (re)creates, starts, and attaches to a container of the service $(1).
#                  For example `make up-server`. See `make services`.
#
# enter-$(1):      Enter to a running container of the service $(1).
#                  For example `make enter-server`. See `make services`.
#
# start-$(1):      Start an existing container of the service $(1).
#                  For example `make start-server`. See `make services`.
#
# restart-$(1):    Restart a running container of the service $(1).
#                  For example `make restart-server`. See `make services`.
#
# stop-$(1):       Stop a running container of the service $(1) without removing them.
#                  For example `make stop-server`. See `make services`.
#
# log-$(1):        View output from a container of the service $(1).
#                  For example `make log-server`. See `make services`.
#                  ---
# psql:            Connect to the database with psql.
#
# refresh-nginx:   Sync configurations, process them and reload nginx.
$ open https://127.0.0.1.xip.io/
$ open https://click.127.0.0.1.xip.io/
$ open https://forma.127.0.0.1.xip.io/
$ open https://passport.127.0.0.1.xip.io/
```

## Related projects

### Services

#### Click!

- Source code at GitHub: [github.com/kamilsk/click](https://github.com/kamilsk/click)
- Mirror at Bitbucket: [bitbucket.org/kamilsk/click](https://bitbucket.org/kamilsk/click)
- Docker image: [kamilsk/click](https://hub.docker.com/r/kamilsk/click/)
- Mirror at Quay: [quay.io/kamilsk/click](https://quay.io/repository/kamilsk/click)

#### Forma

- Source code at GitHub: [github.com/kamilsk/form-api](https://github.com/kamilsk/form-api)
- Mirror at Bitbucket: [bitbucket.org/kamilsk/form-api](https://bitbucket.org/kamilsk/form-api)
- Docker image: [kamilsk/form-api](https://hub.docker.com/r/kamilsk/form-api/)
- Mirror at Quay: [quay.io/kamilsk/form-api](https://quay.io/repository/kamilsk/form-api)

#### Passport

- Source code at GitHub: [github.com/kamilsk/passport](https://github.com/kamilsk/passport)
- Mirror at Bitbucket: [bitbucket.org/kamilsk/passport](https://bitbucket.org/kamilsk/passport)
- Docker image: [kamilsk/passport](https://hub.docker.com/r/kamilsk/passport/)
- Mirror at Quay: [quay.io/kamilsk/passport](https://quay.io/repository/kamilsk/passport)

### Infrustructure

#### kamilsk/nginx

- Source code at GitHub: [kamilsk/docker/nginx](https://github.com/kamilsk/shared/tree/docker-common#kamilsknginx-mirror-at-quayio)
- Docker image: [kamilsk/nginx](https://hub.docker.com/r/kamilsk/nginx/)
- Mirror at Quay: [quay.io/kamilsk/nginx](https://quay.io/repository/kamilsk/nginx)

#### kamilsk/hugo

- Source code at GitHub: [kamilsk/docker/hugo](https://github.com/kamilsk/shared/tree/docker-go#kamilskhugo)
- Docker image: [kamilsk/hugo](https://hub.docker.com/r/kamilsk/hugo/)
- Mirror at Quay: ~

---

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/octolab/hugs)
[![@kamilsk](https://img.shields.io/badge/author-%40kamilsk-blue.svg)](https://twitter.com/ikamilsk)
[![@octolab](https://img.shields.io/badge/sponsor-%40octolab-blue.svg)](https://twitter.com/octolab_inc)

made with ❤️ by [OctoLab](https://www.octolab.org/)
