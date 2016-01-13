BROWSERIFYCMD = node_modules/.bin/browserify -d

SMOKECHROME = node_modules/.bin/tap-closer | \
	node_modules/.bin/smokestack -b chrome

SMOKEFIREFOX = node_modules/.bin/tap-closer | \
	node_modules/.bin/smokestack -b firefox

test: test-chrome test-firefox

test-chrome:
	$(BROWSERIFYCMD) tests/basictests.js | $(SMOKECHROME)

test-firefox:
	$(BROWSERIFYCMD) tests/basictests.js | $(SMOKEFIREFOX)

pushall:
	git push origin master && npm publish
