## EZExam 

To be filled

## Setup Environment

### Conda virtual environment

* Install miniconda with the latest Python3 distribution

https://docs.conda.io/en/latest/miniconda.html

* Create a new conda virtual environment

```conda create -n venv python=3.7 cmake```

* Activate the conda virtual environment

```conda activate venv```

* Install the requirements.txt

```pip install -r requirements.txt```

### Virtualenv

```sh
virtualenv env
source ./env/bin/activate
pip install -r requirements.txt
```
## Instructions to start browser[DEV]

```sh
pip3 install cefpython3=66.0
cd browser_shell & python3 browser_main.py
```
## Instructions to start and run Django app

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
python manage.py makemigrations main_app
python manage.py migrate
```

### 4. Sync the database:

```python manage.py migrate --run-syncdb```

### 5. Create new Superuser

```python manage.py createsuperuser```
