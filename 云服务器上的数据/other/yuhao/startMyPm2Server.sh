#!/bin/sh

/usr/bin/pm2 start /home/ubuntu/Blog/cms/app.js --name="cms-blog"

/usr/bin/pm2 start /home/ubuntu/Blog/view/app.js --name="view-blog"

