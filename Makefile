MATERIAL_KIT := 2.0.3
COMPOSE      := docker-compose -f docker-compose.yml -p hugs


.PHONY: help
help:                       #| Shows available help information of Makefile.
	@fgrep -h "#|" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/#|//'
#|
#|                             ---
#|
.PHONY: up
up:                         #| Builds, (re)creates, starts, and attaches to containers for a service.
	@($(COMPOSE) up -d)
	@($(COMPOSE) rm -f)
#|
.PHONY: clean
clean:                      #| Removes stopped service containers.
	@($(COMPOSE) rm -f)
#|
.PHONY: status
status:                     #| List containers and their status.
	@($(COMPOSE) ps)
#|
.PHONY: down
down:                       #| Stops containers and removes them with networks.
	@($(COMPOSE) down)
#|
.PHONY: destroy
destroy:                    #| Stops containers and removes them with networks, volumes, and images
                            #| created by `up`.
	@($(COMPOSE) down --rmi local --volumes --remove-orphans)
#|
#|                             ---
#|
CONTAINERS = database \
             click \
             forma \
             hugo \
             passport \
             server

.PHONY: services
services:                   #| Shows available services.
	@(echo 'available services:'; for container in $(CONTAINERS); do echo '-' $$container; done)

define container_tpl
#|
.PHONY: up-$(1)
up-$(1):                    #| Builds, (re)creates, starts, and attaches to a container of the service $(1).
                            #| For example `make up-server`. See `make services`.
	@($$(COMPOSE) up -d $(1))
#|
.PHONY: enter-$(1)
enter-$(1):                 #| Enter to a running container of the service $(1).
                            #| For example `make enter-server`. See `make services`.
	@($$(COMPOSE) exec $(1) sh)
#|
.PHONY: start-$(1)
start-$(1):                 #| Start an existing container of the service $(1).
                            #| For example `make start-server`. See `make services`.
	@($$(COMPOSE) start $(1))
#|
.PHONY: restart-$(1)
restart-$(1):               #| Restart a running container of the service $(1).
                            #| For example `make restart-server`. See `make services`.
	@($$(COMPOSE) restart $(1))
#|
.PHONY: stop-$(1)
stop-$(1):                  #| Stop a running container of the service $(1) without removing them.
                            #| For example `make stop-server`. See `make services`.
	@($$(COMPOSE) stop $(1))
#|
.PHONY: log-$(1)
log-$(1):                   #| View output from a container of the service $(1).
                            #| For example `make log-server`. See `make services`.
	@($$(COMPOSE) logs -f $(1))
#|
endef
#|                             ---
#|
render_container_tpl = $(eval $(call container_tpl,$(container)))
$(foreach container,$(CONTAINERS),$(render_container_tpl))

.PHONY: backup-database
backup-database:
	@echo not implemented yet

.PHONY: restore-database
restore-database:
	@echo not implemented yet

.PHONY: demo
demo:                       #| Insert demo data to the database.
	@(docker cp ./etc/demo $$(make status | tail +3 | awk '{print $$1}' | grep _database_ | sort | head -1):/tmp/)
	@($(COMPOSE) exec database /bin/sh -c 'for sql in $$(ls /tmp/demo/click/*.sql); do su - postgres -c "psql click < $$sql"; done')
	@($(COMPOSE) exec database /bin/sh -c 'for sql in $$(ls /tmp/demo/forma/*.sql); do su - postgres -c "psql forma < $$sql"; done')
	@($(COMPOSE) exec database /bin/sh -c 'for sql in $$(ls /tmp/demo/passport/*.sql); do su - postgres -c "psql passport < $$sql"; done')
#|
.PHONY: psql
psql:                       #| Connect to the database with psql.
	@($(COMPOSE) exec database /bin/sh -c 'su - postgres -c psql')
#|
.PHONY: refresh-nginx
refresh-nginx:              #| Sync configurations, process them and reload nginx.
	@($(COMPOSE) exec server ./entrypoint.sh repeat)


.PHONY: publish
publish:
	docker run --rm -it \
	           -v $(PWD)/site:/usr/share/site \
	           -v $(PWD)/docs:/usr/share/docs \
	           -w /usr/share/site \
	           kamilsk/hugo:latest hugo --baseURL https://octolab.github.io/hugs/ \
	                                    --cleanDestinationDir \
	                                    --config=config.yml \
	                                    --destination=/usr/share/docs


.PHONY: pull-template
pull-template:
	rm -rf template
	git clone git@bitbucket.org:octotpl/materialkit.git template
	( \
	  cd template && \
	  git checkout $(MATERIAL_KIT) \
	)
	( \
	  rm -rf site/themes/materialkit/static/vendor/* && \
	  cp -rn template/Template/assets/css site/themes/materialkit/static/vendor/ && \
	  cp -rn template/Template/assets/js  site/themes/materialkit/static/vendor/ \
	)
	rm -rf template/.git
	git add site/themes/materialkit/static/vendor
