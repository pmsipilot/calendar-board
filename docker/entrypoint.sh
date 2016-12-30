#!/bin/bash -e

CONFIG_KEYS=/calendar-board/config/key.json

pushd /calendar-board/

if [ ! -r $CONFIG_KEYS ]; then

    if [ -z "$CALENDARBOARD_CLIENT_ID" ]; then
	echo >&2 "Please set CALENDARBOARD_CLIENT_ID environment variable"
	exit 1
    fi
    if [ -z "$CALENDARBOARD_CLIENT_SECRET" ]; then
	echo >&2 "Please set CALENDARBOARD_CLIENT_SECRET environment variable"
	exit 1
    fi
    if [ -z "$CALENDARBOARD_PROJECT_ID" ]; then
	echo >&2 "Please set CALENDARBOARD_PROJECT_ID environment variable"
	exit 1
    fi
    if [ -z "$CALENDARBOARD_ORIGIN" ]; then
	echo >&2 "Please set CALENDARBOARD_ORIGIN environment variable"
	exit 1
    fi

    cat config/key.dist.json | jq ".web.client_id=\"$CALENDARBOARD_CLIENT_ID\" | .web.client_secret=\"$CALENDARBOARD_CLIENT_SECRET\" | .web.javascript_origins[0]=\"$CALENDARBOARD_ORIGIN\" | .web.project_id=\"$CALENDARBOARD_PROJECT_ID\"" > config/key.json

fi

make

popd

cp -pR /calendar-board/dist htdocs/


/usr/local/bin/httpd-foreground $@
