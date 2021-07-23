source /home/ec2-user/.bash_profile
REPOSITORY=/home/ec2-user/housework-contract-server
cp /home/ec2-user/.env.prod $REPOSITORY
cd $REPOSITORY

pm2 delete all
pm2 start dist/main.js
