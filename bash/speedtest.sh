#!/bin/bash
speedtest=`speedtest`
file='lighttpd/api/speedtest.txt'
echo "$speedtest" > $file
