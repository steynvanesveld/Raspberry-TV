#!/bin/sh
USER="pipi"
CLIENT="raspberry.local"

read -p "Deploy new build to server? (y/n)" -n 1 -r DEPLOY
echo
read -p "Replace bash folder? (y/n)" -n 1 -r BASH
echo
read -p "Replace API folder? (y/n)" -n 1 -r API
echo
read -p "Reboot server? (y/n)" -n 1 -r REBOOT
echo


if [[ $DEPLOY =~ ^[Yy]$ ]]
then
    npm run build
    scp -r dist/raspberry/ $USER@$CLIENT:~/
    ssh  -t $USER@$CLIENT '
        sudo rm -rf ~/lighttpd/*.js ~/lighttpd/*.txt ~/lighttpd/*.html ~/lighttpd/*.css ~/lighttpd/assets/
        sudo mv -f ~/raspberry/* ~/lighttpd/
        sudo rm -rf ~/raspberry
    '
fi

if [[ $BASH =~ ^[Yy]$ ]]
then
    scp -r bash/* $USER@$CLIENT:~
fi


if [[ $API =~ ^[Yy]$ ]]
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

