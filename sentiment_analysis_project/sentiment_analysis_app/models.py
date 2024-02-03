from django.db import models

# Create your models here.
# sentiment_analysis_app/models.py

from django.db import models

class UserInput(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    response = models.TextField()

    def __str__(self):
        return f'{self.text} - {self.response}'
