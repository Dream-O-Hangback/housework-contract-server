#!/bin/bash
REPOSITORY=/home/ec2-user
cd $REPOSITORY

pm2 delete all
rm -rf housework-contract-server
