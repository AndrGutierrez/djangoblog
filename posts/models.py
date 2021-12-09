from django.db import models
from django.db.models import ForeignKey, CharField, TextField, ImageField
from users.models import User


class Post(models.Model):
    '''Post model'''
    user = ForeignKey(User, on_delete=models.CASCADE)
    title = CharField(max_length=255, null=False)
    content = TextField(null=True, blank=True)
    thumbnail = ImageField(upload_to='posts/pictures/thumbnail')
