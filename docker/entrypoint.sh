#!/bin/bash -e

CONFIG_KEYS=/calendar-board/config/key.js

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
fi

make

popd

cp -pR /calendar-board/dist htdocs/


/usr/local/bin/httpd-foreground $@
