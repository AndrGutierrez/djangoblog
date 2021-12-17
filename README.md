# Djangoblog (beta)
## _A blog system made in django_

### How to install
clone this repo, go to *djangoblog* folder and run: 
```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### Set env variables 
I will declarate them like this in a .env file, these values may change depending on your database setup
```
DATABASE_USER=root
DATABASE_HOST=localhost
DATABASE_ROOT_PASSWORD=""
DATABASE_NAME=djangoblog
DATABASE_PORT=3066
DEBUG=True
```

### Setup frontend
Go to frontend folder

### Set frontend env variables
The api route may change depending on where it is hosted, in development by default it is like this
```
API_ROUTE='http://localhost:8000'
```

### Build frontend
```
npm i
npm run build
```

### Run project
after this go to your root folder and run 
```
python manage.py runserver
```
