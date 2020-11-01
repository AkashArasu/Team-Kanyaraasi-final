#!/bin/bash
source env/bin/activate
python3 server/main_app/manage.py runserver 0.0.0.0:8000 &
cd server/web_app
npm index &
