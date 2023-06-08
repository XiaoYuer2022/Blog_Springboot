#!/bin/sh
nohup java -jar -Djava.net.preferIPv4Stack=true blog-api-0.3.1_https.jar  > /dev/null 2>&1 &
