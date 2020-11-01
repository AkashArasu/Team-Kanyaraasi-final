## EZExam 

To be filled


### Instructions to start browser[DEV]

```sh
pip3 install cefpython3=66.0
cd browser_shell & pip3 browser_main.py
```


### Run python server(User)

```sh
virtualenv env
source ./env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```
### 1. Remove these files first

* Delete all .py files in migrations folder except __init.py__

```find . -path "*/migrations/*.py" -not -name "__init__.py" -delete```
* Delete all .pyc files in migrations folder except .pyc

```find . -path "*/migrations/*.pyc"  -delete```
* Delete the pycache folder too

### 2. Delete db.sqlite3

```rm db.sqlite3```

### 3. Create and run the migrations:

```
python manage.py makemigrations
python manage.py migrate
```

### 4. Sync the database:

```manage.py migrate --run-syncdb```
