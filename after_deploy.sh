source /home/ec2-user/.bash_profile
REPOSITORY=/home/ec2-user/housework-contract-server
cd $REPOSITORY

pm2 delete all
pm2 start dist/main.js
