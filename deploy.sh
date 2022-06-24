#!/bin/sh
USERNAME="pipi"
IP_ADDRESS="192.168.178.2"

read -p "Compile the latest version? (y/n)" -n 1 -r COMPILE
echo
read -p "Deploy to server? (y/n)" -n 1 -r DEPLOY
echo
read -p "Replace hdmicec? (y/n)" -n 1 -r HDMICEC
echo
read -p "Reboot server? (y/n)" -n 1 -r REBOOT
echo

if [[ $COMPILE =~ ^[Yy]$ ]]
then
    npm run build
fi

if [[ $DEPLOY =~ ^[Yy]$ ]]
then
    scp -r dist/raspberry/ $USERNAME@$IP_ADDRESS:~/
    ssh  -t $USERNAME@$IP_ADDRESS '
        sudo rm -rf ~/lighttpd/*.js ~/lighttpd/*.txt ~/lighttpd/*.html ~/lighttpd/*.css ~/lighttpd/assets/
        sudo mv -f ~/raspberry/* ~/lighttpd/
        sudo rm -rf ~/raspberry
    '
fi

if [[ $HDMICEC =~ ^[Yy]$ ]]
then
    scp -r hdmicec.sh $USERNAME@$IP_ADDRESS:~
fi

if [[ $REBOOT =~ ^[Yy]$ ]]
then
  ssh  -t $USERNAME@$IP_ADDRESS 'sudo reboot'
fi

