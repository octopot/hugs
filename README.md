> # Hugs [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Platform%20for%20Static%20Sites&url=https://octolab.github.io/hugs/&via=octolab_inc&hashtags=platform,static-sites)
> [![Analytics](https://ga-beacon.appspot.com/UA-109817251-25/hugs/readme?pixel)](https://octolab.github.io/hugs/)
> Platform for Static Sites.

[![Patreon](https://img.shields.io/badge/patreon-donate-orange.svg)](https://www.patreon.com/octolab)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

### Quick start

Requirements:

- Docker 18.03.1-ce or above
- Docker Compose 1.21.1 or above
- GNU Make 3.81 or above

```bash
$ make up status

     Name                    Command               State                    Ports
---------------------------------------------------------------------------------------------------
hugs_click_1      click run --with-profiler  ...   Up      80/tcp, 8090/tcp, 8091/tcp
hugs_database_1   docker-entrypoint.sh postgres    Up      5432/tcp
hugs_forma_1      form-api run --with-profil ...   Up      80/tcp, 8090/tcp, 8091/tcp
hugs_hugo_1       /bin/sh -c hugo server --b ...   Up      1313/tcp
hugs_passport_1   passport run --with-profil ...   Up      80/tcp, 8090/tcp, 8091/tcp
hugs_server_1     /bin/bash -c echo $BASIC_U ...   Up      0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp

$ open https://127.0.0.1.xip.io/
$ open https://click.127.0.0.1.xip.io/
$ open https://forma.127.0.0.1.xip.io/
$ open https://passport.127.0.0.1.xip.io/
```

---

[![@kamilsk](https://img.shields.io/badge/author-%40kamilsk-blue.svg)](https://twitter.com/ikamilsk)
[![@octolab](https://img.shields.io/badge/sponsor-%40octolab-blue.svg)](https://twitter.com/octolab_inc)

made with ❤️ by [OctoLab](https://www.octolab.org/)
