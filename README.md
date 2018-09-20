> # 🤗 Hugs [![Tweet][icon_twitter]][twitter_publish]
> [![Analytics][analytics_pixel]][page_promo]
> Platform for Static Sites.

[![Patreon][icon_patreon]](https://www.patreon.com/octolab)
[![License][icon_license]](LICENSE)

## Roadmap

- [x] [MVP][project_v1]
  - [**May 31, 2018**][project_v1_dl]
  - Main concept and components integration.
- [x] [Pre-alpha][project_v2]
  - [**August 31, 2018**][project_v2_dl]
  - Integration of components is complete.
  - Versions 1.x in active development.
- [ ] [Alpha][project_v3]
  - [**September 30, 2018**][project_v3_dl]
  - Versions 1.x are complete.
  - Versions 2.x in active development.
- [ ] [Beta][project_v4]
  - [**October 31, 2018**][project_v4_dl]
  - Versions 2.x are complete.
  - Versions 3.x in active development.
- [ ] [Release Candidate][project_v5]
  - [**November 30, 2018**][project_v5_dl]
  - Versions 3.x are complete.
  - A process of covering integration tests.
- [ ] [Release to the Web][project_v6]
  - [**December 31, 2018**][project_v6_dl]
  - Hugs Platform, SaaS.
  - Ready to use as self-hosted or in the Cloud.

## Quick start

Requirements:

- Docker 18.03.1-ce or above
- Docker Compose 1.21.1 or above
- GNU Make 3.81 or above

```bash
$ git clone git@github.com:octolab/hugs.git # or git@bitbucket.org:kamilsk/hugs.git
$ cd hugs
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
$ open https://127.0.0.1.xip.io/
$ open https://click.127.0.0.1.xip.io/
$ open https://forma.127.0.0.1.xip.io/
$ open https://passport.127.0.0.1.xip.io/
```

## Related projects

| Hugs blocks    | GitHub                                                    | Bitbucket                                                    | Docker Hub                                      | Quay                                             | Brew                  |
|:--------------:|:---------------------------------------------------------:|:------------------------------------------------------------:|:-----------------------------------------------:|:------------------------------------------------:|:---------------------:|
| Click!         | [+](https://github.com/kamilsk/click)                     | [+](https://bitbucket.org/kamilsk/click)                     | [+](https://hub.docker.com/r/kamilsk/click/)    | [+](https://quay.io/repository/kamilsk/click)    | kamilsk/tap/click     |
| Forma          | [+](https://github.com/kamilsk/form-api)                  | [+](https://bitbucket.org/kamilsk/form-api)                  | [+](https://hub.docker.com/r/kamilsk/form-api/) | [+](https://quay.io/repository/kamilsk/form-api) | kamilsk/tap/form-api  |
| Guard          | [+](https://github.com/kamilsk/guard)                     | [+](https://bitbucket.org/kamilsk/guard)                     | -                                               | -                                                | -                     |
| Passport       | [+](https://github.com/kamilsk/passport)                  | [+](https://bitbucket.org/kamilsk/passport)                  | [+](https://hub.docker.com/r/kamilsk/passport/) | [+](https://quay.io/repository/kamilsk/passport) | kamilsk/tap/passport  |
| **Hugs tools** |
| check          | [+](https://github.com/kamilsk/check)                     | [+](https://bitbucket.org/kamilsk/check)                     | -                                               | -                                                | kamilsk/tap/check     |
| go-kit         | [+](https://github.com/kamilsk/go-kit)                    | [+](https://bitbucket.org/kamilsk/go-kit)                    | -                                               | -                                                | -                     |
| retry          | [+](https://github.com/kamilsk/retry)                     | [+](https://bitbucket.org/kamilsk/retry)                     | -                                               | -                                                | kamilsk/tap/retry     |
| semaphore      | [+](https://github.com/kamilsk/semaphore)                 | [+](https://bitbucket.org/kamilsk/semaphore)                 | -                                               | -                                                | kamilsk/tap/semaphore |
| **Misc**       |
| kamilsk/hugo   | [+](https://github.com/kamilsk/shared/tree/docker-go)     | [+](https://bitbucket.org/kamilsk/shared/src/docker-go/)     | [+](https://hub.docker.com/r/kamilsk/hugo/)     | -                                                | -                     |
| kamilsk/nginx  | [+](https://github.com/kamilsk/shared/tree/docker-common) | [+](https://bitbucket.org/kamilsk/shared/src/docker-common/) | [+](https://hub.docker.com/r/kamilsk/nginx/)    | [+](https://quay.io/repository/kamilsk/nginx)    | -                     |
| octolab/lens   | [+](https://github.com/octolab/lens)                      | -                                                            | -                                               | -                                                | -                     |

---

[![Gitter][icon_gitter]](https://gitter.im/octolab/hugs)

made with ❤️ by [OctoLab](https://www.octolab.org/)

[analytics_pixel]: https://ga-beacon.appspot.com/UA-109817251-25/hugs/readme?pixel

[icon_gitter]:     https://badges.gitter.im/Join%20Chat.svg
[icon_license]:    https://img.shields.io/badge/license-MIT-blue.svg
[icon_patreon]:    https://img.shields.io/badge/patreon-donate-orange.svg
[icon_research]:   https://img.shields.io/badge/research-in%20progress-yellow.svg
[icon_twitter]:    https://img.shields.io/twitter/url/http/shields.io.svg?style=social

[page_promo]:      https://octolab.github.io/hugs/

[project_v1]:      https://github.com/kamilsk/form-api/projects/1
[project_v1_dl]:   https://github.com/kamilsk/form-api/milestone/1
[project_v2]:      https://github.com/kamilsk/form-api/projects/2
[project_v2_dl]:   https://github.com/kamilsk/form-api/milestone/2
[project_v3]:      https://github.com/kamilsk/form-api/projects/3
[project_v3_dl]:   https://github.com/kamilsk/form-api/milestone/3
[project_v4]:      https://github.com/kamilsk/form-api/projects/4
[project_v4_dl]:   https://github.com/kamilsk/form-api/milestone/4
[project_v5]:      https://github.com/kamilsk/form-api/projects/5
[project_v5_dl]:   https://github.com/kamilsk/form-api/milestone/5
[project_v6]:      https://github.com/kamilsk/form-api/projects/6
[project_v6_dl]:   https://github.com/kamilsk/form-api/milestone/6

[twitter_publish]: https://twitter.com/intent/tweet?text=Platform%20for%20Static%20Sites&url=https://octolab.github.io/hugs/&via=octolab_inc&hashtags=platform,static-sites
