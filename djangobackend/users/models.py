# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class User(AbstractBaseUser):
    email = models.EmailField(
        unique=True,
        max_length=254,
    )
    username = models.CharField(max_length=15)
    token = models.CharField(max_length=15)
    
    objects = models.Manager()

