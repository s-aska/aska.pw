#!/bin/sh

# crontab (root)
# 0 4 1 * * /home/aska/aska.pw/scripts/renew-cert.sh

/usr/local/src/letsencrypt/letsencrypt-auto certonly --webroot -d aska.pw --webroot-path /home/aska/aska.pw/static --renew-by-default
/home/aska/aska.pw/scripts/ct-submit.sh
/etc/init.d/nginx reload
