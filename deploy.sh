#!/bin/sh
USER="pipi"
CLIENT="raspberry.local"

read -p "Compile the latest version? (y/n)" -n 1 -r COMPILE
echo
read -p "Deploy to server? (y/n)" -n 1 -r DEPLOY
echo
read -p "Replace hdmicec? (y/n)" -n 1 -r HDMICEC
echo
read -p "Replace API folder? (y/n)" -n 1 -r APIFOLDER
echo
read -p "Reboot server? (y/n)" -n 1 -r REBOOT
echo

if [[ $COMPILE =~ ^[Yy]$ ]]
then
    npm run build
fi

if [[ $DEPLOY =~ ^[Yy]$ ]]
then
    scp -r dist/raspberry/ $USER@$CLIENT:~/
    ssh  -t $USER@$CLIENT '
        sudo rm -rf ~/lighttpd/*.js ~/lighttpd/*.txt ~/lighttpd/*.html ~/lighttpd/*.css ~/lighttpd/assets/
        sudo mv -f ~/raspberry/* ~/lighttpd/
        sudo rm -rf ~/raspberry
    '
fi

if [[ $HDMICEC =~ ^[Yy]$ ]]
then
    scp -r hdmicec.sh $USER@$CLIENT:~
fi

if [[ $APIFOLDER =~ ^[Yy]$ ]]
then
    scp -r api/ $USER@$CLIENT:~/
    ssh  -t $USER@$CLIENT '
        sudo mv -f ~/api/* ~/lighttpd/api/
        sudo rm -rf ~/api
    '
fi

if [[ $REBOOT =~ ^[Yy]$ ]]
then
  ssh  -t $USER@$CLIENT 'sudo reboot'
fi

