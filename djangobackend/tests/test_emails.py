from django.test import SimpleTestCase
from django.test import TestCase
from urls import urlpatterns
from django.urls import reverse, resolve, path
import requests
from email_stuff.email_notification import send_simple_message

class test_emails(SimpleTestCase):

    def test_simple_test(self):
        response = send_simple_message()
        self.assertEquals(response.status_code, 200)

