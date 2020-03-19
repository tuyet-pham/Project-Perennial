## About Dir 
The stucture for djangobackend is called a "Flat style". / directory is considered a project and sub directories are considered apps.

$ tree
.
├── manage.py
├── settings.py
├── home
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── urls.py
└── wsgi.py


[more on this topic](https://zindilis.com/blog/2017/01/06/django-anatomy-for-single-app.html)
#### Routes Available

- /auth/register
- /auth/login

- /user/home
- /user/addplant
- /user/options