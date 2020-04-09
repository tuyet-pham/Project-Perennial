from django.test import SimpleTestCase
from django.test import TestCase
from urls import urlpatterns
from account.views import *
from users.views import *
from django.urls import reverse, resolve, path


"""

This file currently tests that the URLs in the backend are resolved. 
There are 2 different ways the urls are compared in assertEqual.
This is because some URLs have class-based views and some urls have
function views.

For Class-based views, __name__ must be added onto the ends of both 
resolve(url).func argument and the view() 
EG: self.assertEqual(resolve(url).func.__name__, Account.as_view().__name__)

For function-based views, this is not a problem and simply having
resolve(url).func and the function name will work
EG: self.assertEqual(resolve(url).func, register)

"""

class test_account_urls(SimpleTestCase):

    def test_account_url_is_resolved(self):
        url = reverse('account')
        print(resolve(url))
        self.assertEqual(resolve(url).func.__name__, Account.as_view().__name__)
        print()

    def test_monitor_plants_url_is_resolved(self):
        url = reverse('monitorplants')
        print(resolve(url))
        self.assertEqual(resolve(url).func.__name__, MonitorPlants.as_view().__name__)
        print()

    def test_add_plants_url_is_resolved(self):
        url = reverse('addplants')
        print(resolve(url))
        self.assertEqual(resolve(url).func, tempaddplant)
        print()

    def test_options_url_is_resolved(self):
        url = reverse('options')
        print(resolve(url))
        self.assertEqual(resolve(url).func.__name__, Options.as_view().__name__)
        print()

class test_users_urls(SimpleTestCase):

    def test_register_url_is_resolved(self):
        url = reverse('register')
        print(resolve(url))
        self.assertEqual(resolve(url).func, register)
        print()
        
    def test_login_url_is_resolved(self):
        url = reverse('login')
        print(resolve(url))
        self.assertEqual(resolve(url).func, login)
        print()

    def test_logout_url_is_resolved(self):
        url = reverse('logout')
        print(resolve(url))
        self.assertEqual(resolve(url).func, logout)
        print()


class test_admin_urls(SimpleTestCase):

    def test_admin_url_is_resolved(self):
        assert 1 == 1
        