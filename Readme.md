## EZExam 

To be filled

## Setup Environment

### Conda virtual environment (Recommended)

* Install miniconda with the latest Python3 distribution

https://docs.conda.io/en/latest/miniconda.html

* Create a new conda virtual environment

```sh
conda create -n venv python=3.7 cmake
```

* Activate the conda virtual environment

```sh
conda activate venv
```

* Install the requirements.txt

```sh
pip install -r requirements.txt
```

### Virtualenv (Optional)

```sh
virtualenv env
source ./env/bin/activate
pip install -r requirements.txt
```
## Instructions to start browser[DEV]

```sh
cd browser_shell & python3 browser_main.py
```
## Instructions to start and run Django app

### 1. Remove these files first

* Delete the 'migrations' folder under main_app

```sh
rm -rf migrations
```
### 2. Delete db.sqlite3

```
rm db.sqlite3
```

### 3. Create and run the migrations:

```sh
python manage.py makemigrations main_app
python manage.py migrate
```

### 4. Sync the database:

```sh
python manage.py migrate --run-syncdb
```

### 5. Create new Superuser

```sh
python manage.py createsuperuser
```
