from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.BooleanField(source='is_superuser', read_only=True)

    class Meta:
        model = User
        fields = ['username', 'is_admin']