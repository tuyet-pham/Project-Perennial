from django.test import TestCase, Client, RequestFactory
from django.urls import reverse
from django.contrib.auth.models import AnonymousUser, User, UserManager
from account.views import Account, MonitorPlants, AddPlant, tempaddplant, Options
from users.views import register, login, logout
#from users.models import User
import json

"""
This function tests the functionality of the views.py files in the account and users
folders. The tests currently only consist of verifying that the functions in the 
respective views.py files return the correct status codes.

It is expected we receive status codes 403 for the current Account views tests
as the classes in the account views.py file that manage these functions have 
authentication and permission classes that restrict access only to certain users.
Our tests do not have these permissions yet. Later tests will so we can test all
functionality of these functions.

For the views.py file under the users folder, it is appropriate for us to be 
receiving status codes of 200 in return because there are no restrictions on 
access for these functions. 
"""

class TestAccountViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.account_url = reverse('account')
        self.monitor_plants_url = reverse('monitorplants')
        self.options_url = reverse('options')

    def test_Account_GET_no_access(self):
        request = self.factory.get(self.account_url)
        request.user = AnonymousUser()
        response = Account.as_view()(request)
        self.assertEqual(response.status_code, 403)
        print(response.status_code)
        print()

    def test_Account_GET_access(self):
        request = self.factory.get(self.account_url)
        request.session = {}
        request.user = User.objects.create_user('test','test.com''test')
        response = Account.as_view()(request)
        self.assertEqual(response.status_code, 200)
        print(response.status_code)
        print()

    def test_MonitorPlants_GET_no_access(self):
        request = self.factory.get(self.account_url)
        request.user = AnonymousUser()
        response = MonitorPlants.as_view()(request)
        self.assertEquals(response.status_code, 403)
        print(response.status_code)
        print()

    def test_MonitorPlants_GET_access(self):
        request = self.factory.get(self.monitor_plants_url)
        request.session = {}
        request.user = User.objects.create_user('test','test.com''test')
        response = MonitorPlants.as_view()(request)
        self.assertEqual(response.status_code, 200)
        print(response.status_code)
        print()

    #def test_tempAddPlant_no_access(self):
        #response = client.get(reverse('addplants'))
        #self.assertEquals(response.status_code, 403)
        #print(response.status_code)
        #print()

    def test_Options_POST_no_access(self):
        request = self.factory.post(self.account_url)
        request.user = AnonymousUser()
        response = Options.as_view()(request)
        self.assertEquals(response.status_code, 403)
        print(response.status_code)
        print()

    

    #def test_Options_POST(self):
        


class TestUserViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')

    def test_register_ok_status(self):
        request = self.factory.get(self.register_url)
        request.session = {}
        request.user = AnonymousUser()
        response = register(request)
        self.assertEquals(response.status_code, 200)
        print(response.status_code)
        print()

    def test_login_ok_status(self):
        request = self.factory.get(self.login_url)
        request.session = {}
        request.user = AnonymousUser()
        response = login(request)
        self.assertEquals(response.status_code, 200)
        print(response.status_code)
        print()

    def test_logout_ok_status(self):
        request = self.factory.get(self.logout_url)
        request.session = {}
        request.user = AnonymousUser()
        response = logout(request)
        self.assertEquals(response.status_code, 200)
        print(response.status_code)
        print()
