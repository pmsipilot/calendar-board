DIST_DIR = ./dist
CONFIG_DIR = ./config
BIN_DIR = ./node_modules/.bin
BIN_FILE = $(DIST_DIR)/app.js

ALL_SRC = $(shell find src/ -type f -iname '*.js')

build: $(BIN_FILE)

clean:
	rm -rf ./node_modules $(DIST_DIR)

dev: build
	$(BIN_DIR)/http-server .

.PHONY: build clean dev

node_modules: package.json
	npm install

$(DIST_DIR):
	mkdir -p $@

$(BIN_FILE): $(DIST_DIR) node_modules $(ALL_SRC) Makefile
	$(BIN_DIR)/browserify index.js -o $(BIN_FILE) \
		-t [ babelify ] \
		-t [ envify \
			--CALENDARBOARD_CLIENT_ID=$(CALENDARBOARD_CLIENT_ID) \
			--CALENDARBOARD_CLIENT_SECRET=$(CALENDARBOARD_CLIENT_SECRET) \
			--CALENDARBOARD_PROJECT_ID=$(CALENDARBOARD_PROJECT_ID) \
			--CALENDARBOARD_ORIGIN=$(CALENDARBOARD_ORIGIN) \
			--CALENDARBOARD_CALENDARS=$(CALENDARBOARD_CALENDARS) \
		]

