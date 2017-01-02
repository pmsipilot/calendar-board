DIST_DIR = ./dist
CONFIG_DIR = ./config
BIN_DIR = ./node_modules/.bin
BIN_FILE = $(DIST_DIR)/app.js

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

$(BIN_FILE): $(DIST_DIR) $(CONFIG_DIR)/key.js node_modules
	$(BIN_DIR)/browserify index.js -o $(BIN_FILE) -t [ babelify ]

$(CONFIG_DIR)/key.js: $(CONFIG_DIR)/key.dist.js
	cp $< $@
