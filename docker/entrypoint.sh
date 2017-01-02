#!/bin/bash -e

pushd /calendar-board/


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

make

popd

cp -pR /calendar-board/dist htdocs/


/usr/local/bin/httpd-foreground $@
