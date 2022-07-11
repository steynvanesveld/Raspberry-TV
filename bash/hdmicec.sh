#!/bin/bash
export DISPLAY=:0
export XAUTHORITY=/home/pipi/.Xauthority

while read oneline
do
    keyline=$(echo $oneline | grep " key ")
    if [ -n "$keyline" ]; then
        strkey=$(grep -oP '(?<=sed: ).*?(?= \()' <<< "$keyline")
        strstat=$(grep -oP '(?<=key ).*?(?=:)' <<< "$keyline")
        strpressed=$(echo $strstat | grep "pressed")
        if [ -n "$strpressed" ]; then
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
            esac
        fi
    fi
done
