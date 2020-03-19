#!/bin/sh
curl -O http://python-distribute.org/distribute_setup.py
sudo python distribute_setup.py
pip3 install couchdbkit
python3 manage.py makemigrations
python3 manage.py migrate
exec "$@"
