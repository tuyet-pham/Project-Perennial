from django.test import TestCase, Client
from django.urls import reverse
from account.views import Account, MonitorPlants, AddPlant, tempaddplant, Options
from users.views import register, login, logout
from users.models import User
import json

class TestAccountViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.account_url = reverse('account')
        self.monitor_plants_url = reverse('monitorplants')
        self.options_url = reverse('options')

    def test_Account_GET_no_access(self):
        response = self.client.get(self.account_url)
        self.assertEquals(response.status_code, 403)
        print(response.status_code)
        print()

    def test_MonitorPlants_GET_no_access(self):
        response = self.client.get(self.monitor_plants_url)
        self.assertEquals(response.status_code, 403)
        print(response.status_code)
        print()

    #def test_tempAddPlant_no_access(self):
        #response = client.get(reverse('addplants'))
        #self.assertEquals(response.status_code, 403)
        #print(response.status_code)
        #print()

    def test_Options_POST_no_access(self):
        response = self.client.get(self.options_url)
        self.assertEquals(response.status_code, 403)
        print(response.status_code)
        print()

    #def test_Options_POST(self):
        


class TestUserViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')

    def test_register_ok_status(self):
        response = self.client.get(self.register_url)
        self.assertEquals(response.status_code, 200)
        print(response.status_code)
        print()

    def test_login_ok_status(self):
        response = self.client.get(self.login_url)
        self.assertEquals(response.status_code, 200)
        print(response.status_code)
        print() 

    def test_logout_ok_status(self):
        response = self.client.get(self.logout_url)
        self.assertEquals(response.status_code, 200)
        print(response.status_code)
        print()
