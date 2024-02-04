from django.db import models

# Create your models here.
# sentiment_analysis_app/models.py

from django.db import models
from django.contrib.auth.models import User

class UserInput(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    response = models.TextField()

    def __str__(self):
        return f'{self.text} - {self.response}'


class Token(models.Model):
    key = models.CharField(max_length=40, primary_key=True)
    user = models.OneToOneField(User, related_name='custom_auth_token', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
