#!/bin/bash
export DISPLAY=:0
export XAUTHORITY=/home/pipi/.Xauthority

while read oneline
do
    keyline=$(echo $oneline | grep " key ")
    if [ -n "$keyline" ]; then
        strkey=$(grep -oP '(?<=sed: ).*?(?= \()' <<< "$keyline")
        strcurrent=$(echo $oneline | grep "current")
        if [ -n "$strcurrent" ]; then
            case "$strkey" in
                "select")
                    xdotool key "Return"
                ;;
                "exit")
                    xdotool key "BackSpace"
                ;;
                "up")
                    xdotool key "Up"
                ;;
                "right")
                    xdotool key "Right"
                ;;
                "down")
                    xdotool key "Down"
                ;;
                "left")
                    xdotool key "Left"
                ;;
                *)
                    xdotool key "$strkey"
                ;;
            esac
        fi
    fi
done
