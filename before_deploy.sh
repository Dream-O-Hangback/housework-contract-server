#!/bin/bash
REPOSITORY=/home/ubuntu
cd $REPOSITORY

pm2 delete all
rm -rf housework-contract-server
