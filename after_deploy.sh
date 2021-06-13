#!/bin/bash
REPOSITORY=/home/ec2-user/housework-contract-server
cd $REPOSITORY

pm2 start dist/main.js
