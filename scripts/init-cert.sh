#!/bin/sh

# * Install letsencrypt
# cd /usr/local/src
# sudo git clone https://github.com/letsencrypt/letsencrypt
# /usr/local/src/letsencrypt/letsencrypt-auto --help
#
# * Generate ssl_dhparam
# sudo openssl dhparam 2048 -out /etc/letsencrypt/live/aska.pw/dhparam.pem
#
# * Generate ssl_session_ticket_key
# sudo openssl rand 48 > ticket.key
# sudo mv ticket.key /etc/letsencrypt/live/aska.pw/
#
# * Install st submit
# cd /usr/local/src
# sudo wget https://github.com/grahamedgecombe/ct-submit/archive/master.tar.gz
# sudo tar zxvf master.tar.gz
# cd ct-submit-master/
# sudo /usr/local/go/bin/go build
# sudo install -s -m755 ./ct-submit-master /usr/local/bin/ct-submit
#
# * Run ct submit
# sudo sh /home/aska/aska.pw/scripts/ct-submit.sh

/usr/local/src/letsencrypt/letsencrypt-auto certonly --webroot -d aska.pw --webroot-path /home/aska/aska.pw/static -m s.aska.org@gmail.com --agree-tos
