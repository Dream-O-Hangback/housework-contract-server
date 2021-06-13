source /home/ec2-user/.bash_profile
REPOSITORY=/home/ec2-user/housework-contract-server
cd $REPOSITORY

npm install -g pm2
pm2 start dist/main.js
