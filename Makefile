MATERIAL_KIT := 2.0.3
COMPOSE      := docker-compose -f docker-compose.yml -p hugs


.PHONY: up
up:
	$(COMPOSE) up -d
	$(COMPOSE) rm -f

.PHONY: clean
clean:
	$(COMPOSE) rm -f

.PHONY: status
status:
	$(COMPOSE) ps

.PHONY: down
down:
	$(COMPOSE) down

.PHONY: destroy
destroy:
	$(COMPOSE) down --rmi local --volumes --remove-orphans



CONTAINERS = database \
             click \
             forma \
             hugo \
             passport \
             server

define container_tpl

.PHONY: up-$(1)
up-$(1):
	$$(COMPOSE) up -d $(1)

.PHONY: enter-$(1)
enter-$(1):
	$$(COMPOSE) exec $(1) sh

.PHONY: start-$(1)
start-$(1):
	$$(COMPOSE) start $(1)

.PHONY: stop-$(1)
stop-$(1):
	$$(COMPOSE) stop $(1)

.PHONY: log-$(1)
log-$(1):
	$$(COMPOSE) logs -f $(1)

endef

render_container_tpl = $(eval $(call container_tpl,$(container)))
$(foreach container,$(CONTAINERS),$(render_container_tpl))

.PHONY: backup-database
backup-database:
	@echo not implemented

.PHONY: restore-database
restore-database:
	@echo not implemented

.PHONY: psql
psql:
	$(COMPOSE) exec database /bin/sh -c 'su - postgres -c psql'



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
