# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
import hashlib

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=200)
    fullname = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    
    def __who__(self):
        return self.username

