from django.db import models

# Create your models here.
# sentiment_analysis_app/models.py

from django.db import models

class UserInput(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
