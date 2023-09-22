# ParkFit


## Application Overview
   ParkFit is a dynamic fitness and outdoor activity platform designed to foster a vibrant fitness community. Whether you're an outdoor enthusiast looking for exciting classes or a fitness instructor eager to share your expertise, ParkFit is the place to connect.


 
## Getting Started

### Server Side
1. Clone this repository for the server side:
```sh
git clone git@github.com:austin0102/NSSl-Final-Capstone.git
cd NSS1-Final-Capstone
```
2. Initialize virtual environment:
```sh
pipenv shell
```
3. Install third party packages:
```sh
pipenv install django autopep8 pylint djangorestframework django-cors-headers pylint-django
```
4. Create the project and API application 
```sh
django-admin startproject parkfit .
python3 manage.py startapp parkfitapi
```

5. Migrate and seed database 
```sh
rm db.sqlite3
rm -rf ./parkfitapi/migrations
python3 manage.py migrate
python3 manage.py makemigrations parkfitapi
python3 manage.py migrate parkfitapi
python3 manage.py loaddata users
python3 manage.py loaddata tokens
python manage.py loaddata trainers
python manage.py loaddata difficulties
python manage.py loaddata classes
python manage.py loaddata comments
python manage.py loaddata athletes
python manage.py loaddata athlete_classes



```
6. Get the server running
```sh
python3 manage.py runserver
```


### Client Side
1. Clone this repository for the client side:
```sh
git clone git@github.com:austin0102/NSS-Capstone-Client.git
cd NSS-Capstone-Client
```
2. Install dependencies: 
```sh
npm install
```
3. Run the code 
```sh
npm start
```
4. Click the Register Button to create a new profile then login.

### Contact
Email: austinwarrick@gmail.com