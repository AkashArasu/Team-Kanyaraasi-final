#!/bin/bash
python3 -m pip install virtualenv
virtualenv env
source ./env/bin/activate
python3 -m pip install -r requirements.txt
python3 -m pip install cefpython3==66.0

find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

cd server/web_server
npm install
npm index &
