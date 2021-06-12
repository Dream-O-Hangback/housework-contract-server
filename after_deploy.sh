#!/bin/bash
REPOSITORY=/home/ec2-user/housework-contract-server
cd $REPOSITORY

mkdir client/logs
mkdir server/logs

pm2 start dist/main.js
