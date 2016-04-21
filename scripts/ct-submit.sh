#!/bin/sh
KEY=/etc/letsencrypt/live/aska.pw/fullchain.pem
SCTS_DIR=/etc/letsencrypt/live/aska.pw/scts
CTSUBMIT=/usr/local/bin/ct-submit

echo 1
sudo sh -c "$CTSUBMIT ct.googleapis.com/aviator \
<$KEY \
>$SCTS_DIR/aviator.sct"
echo 2
sudo sh -c "$CTSUBMIT ct.googleapis.com/pilot \
<$KEY \
>$SCTS_DIR/pilot.sct"
echo 3
sudo sh -c "$CTSUBMIT ct.googleapis.com/rocketeer \
<$KEY \
>$SCTS_DIR/rocketeer.sct"
#echo 4
#sudo sh -c "$CTSUBMIT ct1.digicert-ct.com/log \
#<$KEY \
#>$SCTS_DIR/digicert.sct"
#echo 5
#sudo sh -c "$CTSUBMIT ct.izenpe.com \
#<$KEY \
#>$SCTS_DIR/izenpe.sct"
#echo 6
#sudo sh -c "$CTSUBMIT log.certly.io \
#<$KEY \
#>$SCTS_DIR/certly.sct"
