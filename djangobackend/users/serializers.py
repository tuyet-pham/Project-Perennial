from rest_framework import serializers
from users import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'username',
            'fullname',
            'email',
            'password',
        )
        model = models.User
