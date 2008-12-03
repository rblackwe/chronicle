#
#  Utility makefile for people working with chronicle
#
#  The targets are intended to be useful for people who are using
# the remote repository - but it also contains other useful targets.
#
# Steve
# --
# http://www.steve.org.uk/
#

#
#  Only used to build distribution tarballs.
#
DIST_PREFIX = ${TMP}
VERSION     = 3.2
BASE        = chronicle


#
#  Installation prefix, useful for the Debian package.
#
prefix=


nop:
	@echo "Valid targets are (alphabetically) :"
	@echo " "
	@echo " clean         = Remove bogus files and any local output."
	@echo " diff          = See the local changes."
	@echo " test          = Run our simple test cases."
	@echo " test-verbose  = Run our simple test cases, verbosely."
	@echo " update        = Update from the remote repository."
	@echo " "


#
#  Delete all temporary files, recursively.
#
clean:
	@find . -name '.*~' -exec rm \{\} \;
	@find . -name '.#*' -exec rm \{\} \;
	@find . -name '*~' -exec rm \{\} \;
	@find . -name '*.1' -exec rm \{\} \;
	@find . -name '*.bak' -exec rm \{\} \;
	@find . -name '*.tmp' -exec rm \{\} \;
	@if [ -d comments ]; then rm -rf comments; fi
	@if [ -d output   ]; then rm -rf output; fi
	@if [ -e build-stamp ]; then rm -f build-stamp; fi
	@if [ -e debian/chronicle.debhelper.log ]; then rm debian/chronicle.debhelper.log; fi

#
#  Show what has been changed in the local copy vs. the remote repository.
#
diff:
	hg diff


#
#  Install to /usr/local/bin
#
#  Install the themes without hardwiring a list of them.
#
install:
	mkdir -p ${prefix}/etc
	cp ./etc/chroniclerc ${prefix}/etc/chroniclerc
	mkdir -p ${prefix}/usr/local/bin
	cp ./bin/chronicle ${prefix}/usr/local/bin
	cp ./bin/chronicle-spooler ${prefix}/usr/local/bin
	mkdir -p ${prefix}/usr/share/chronicle/themes/xml
	cp -r ./themes/xml/*.* ${prefix}/usr/share/chronicle/themes/xml
	for i in themes/*/; do \
		mkdir -p ${prefix}/usr/share/chronicle/themes/$$(basename $$i) ;\
		cp -r ./themes/$$(basename $$i)/*.* ${prefix}/usr/share/chronicle/themes/$$(basename $$i)/ ;\
	done


#
#  Make a new release tarball, and make a GPG signature.
#
release: tidy clean
	rm -rf $(DIST_PREFIX)/$(BASE)-$(VERSION)
	rm -f $(DIST_PREFIX)/$(BASE)-$(VERSION).tar.gz
	cp -R . $(DIST_PREFIX)/$(BASE)-$(VERSION)
	perl -pi.bak -e "s/UNRELEASED/$(VERSION)/g" $(DIST_PREFIX)/$(BASE)-$(VERSION)/bin/chronicle
	perl -pi.bak -e "s/UNRELEASED/$(VERSION)/g" $(DIST_PREFIX)/$(BASE)-$(VERSION)/bin/chronicle-spooler
	rm  $(DIST_PREFIX)/$(BASE)-$(VERSION)/bin/*.bak
	find  $(DIST_PREFIX)/$(BASE)-$(VERSION) -name ".hg*" -print | xargs rm -rf
	find  $(DIST_PREFIX)/$(BASE)-$(VERSION) -name ".release" -print | xargs rm -rf
	find  $(DIST_PREFIX)/$(BASE)-$(VERSION)/blog -name "*.txt" -print | xargs rm -rf
	rm -rf $(DIST_PREFIX)/$(BASE)-$(VERSION)/debian
	cd $(DIST_PREFIX) && tar -cvf $(DIST_PREFIX)/$(BASE)-$(VERSION).tar $(BASE)-$(VERSION)/
	gzip $(DIST_PREFIX)/$(BASE)-$(VERSION).tar
	mv $(DIST_PREFIX)/$(BASE)-$(VERSION).tar.gz .
	rm -rf $(DIST_PREFIX)/$(BASE)-$(VERSION)
	gpg --armour --detach-sign $(BASE)-$(VERSION).tar.gz


#
#  Tidy the code
#
tidy:
	if [ -x /usr/bin/perltidy ]; then \
	perltidy -b -nt -bt=2 -sbt=1 -bl  -mbl=3 -sbl -bbs -bbb -anl  -lp bin/chronicle ;\
	perltidy -b -nt -bt=2 -sbt=1 -bl  -mbl=3 -sbl -bbs -bbb -anl  -lp cgi-bin/comments.cgi \
	; fi


#
#  Run the test suite.
#
test:
	prove --shuffle tests/


#
#  Run the test suite verbosely.
#
test-verbose:
	prove --shuffle --verbose tests/



#
#  Update the local copy from the remote repository.
#
#  NOTE: Removes empty local directories.
#
update:
	hg pull --update


steve:
	./bin/chronicle --theme-dir=./themes --theme=default --url-prefix=http://www.steve.org.uk/Software/chronicle/demo/ --pre-build="/bin/rm -rf ./output" --post-build="rsync -v -r output/* steve@www.steve.org.uk:/home/www/www.steve.org.uk/htdocs/Software/chronicle/demo/" --no-comments --no-cache --blog-title="Sample Blog" --blog-subtitle="Created by Chronicle"
	./bin/chronicle  --theme-dir=./themes --theme=copyrighteous --url-prefix=http://www.steve.org.uk/Software/chronicle/demo2/ --pre-build="/bin/rm -rf ./output"  --post-build="rsync -v -r output/* steve@www.steve.org.uk:/home/www/www.steve.org.uk/htdocs/Software/chronicle/demo2/" --no-comments --no-cache --blog-title="Sample Blog" --blog-subtitle="Created by Chronicle"
	./bin/chronicle --theme-dir=./themes --theme=blocky --url-prefix=http://www.steve.org.uk/Software/chronicle/demo3/ --pre-build="/bin/rm -rf ./output"  --post-build="rsync -v -r output/* steve@www.steve.org.uk:/home/www/www.steve.org.uk/htdocs/Software/chronicle/demo3/" --no-comments --no-cache --blog-title="Sample Blog" --blog-subtitle="Created by Chronicle"
	./bin/chronicle --theme-dir=./themes --theme=leftbar --url-prefix=http://www.steve.org.uk/Software/chronicle/demo4/ --pre-build="/bin/rm -rf ./output"  --post-build="rsync -v -r output/* steve@www.steve.org.uk:/home/www/www.steve.org.uk/htdocs/Software/chronicle/demo4/" --no-comments --no-cache --blog-title="Sample Blog" --blog-subtitle="Created by Chronicle"
