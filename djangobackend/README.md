## About Dir 
The stucture for djangobackend is called "Flat style". / directory is considered a project and sub directories are considered apps.

$ tree<br>
.<br>
├── manage.py<br>
├── settings.py<br>
├── account/<br>
├──────| views.py <br>
├──────| urls.py <br>
├── users/<br>
├──────| views.py <br>
├──────| urls.py<br>
├── urls.py<br>
└── wsgi.py<br>


[more on this topic](https://zindilis.com/blog/2017/01/06/django-anatomy-for-single-app.html)
#### Routes Available

- /                       <--- Root route, Login Page
- /users
- /acount

