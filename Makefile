BIN_DIR = ./dist
BIN_FILE = $(BIN_DIR)/app.js

build: $(BIN_DIR) $(BIN_FILE)
	./node_modules/.bin/browserify index.js -o $(BIN_FILE) -t [ babelify ]

clean:
	rm -rf ./node_modules $(BIN_DIR)

dev: build
	./node_modules/.bin/http-server .

.PHONY: build clean dev

node_modules: package.json
	npm install

$(BIN_DIR):
	mkdir -p $@

$(BIN_FILE): node_modules
