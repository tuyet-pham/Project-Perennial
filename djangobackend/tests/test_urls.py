from django.test import SimpleTestCase
from django.test import TestCase
from djangobackend.urls import *
from django.urls import reverse, resolve, path

class test_account_urls(TestCase):

    def test_url_account(self):
        url = reverse('account')
        print(resolve(url))
        