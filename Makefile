MATERIAL_KIT := 2.0.3

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
