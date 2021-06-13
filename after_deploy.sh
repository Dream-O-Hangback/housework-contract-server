#!/bin/bash
REPOSITORY=/home/ec2-user/housework-contract-server
cd $REPOSITORY

sudo mkdir client/logs
sudo mkdir server/logs

pm2 start dist/main.js
