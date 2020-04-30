#!/bin/bash

echo "Setting up cron schedule"

declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env

echo "SHELL=/bin/bash
BASH_ENV=/container.env
* * * * * python3 /watering_service.py >> /var/log/cron.log 2>&1
#Extra blank line" > scheduler.txt

touch /var/log/cron.log

crontab scheduler.txt
cron
tail -f /var/log/cron.log
