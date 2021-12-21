'''Post and Comment models'''
from django.db import models
from django.db.models import ForeignKey, CharField, TextField, ImageField, DateTimeField
from users.models import User


class Post(models.Model):
    '''Post model'''
    user = ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = CharField(max_length=255, null=False)
    content = TextField(null=True, blank=True)
    thumbnail = ImageField(upload_to='posts/pictures/thumbnail', null=True)
    created = DateTimeField(auto_now_add=True)
    modified = DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']


class Comment(models.Model):
    '''Post comment model'''
    post = ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = ForeignKey(User, on_delete=models.CASCADE)
    created = DateTimeField(auto_now_add=True)
    modified = DateTimeField(auto_now=True)
    content = TextField(null=False, blank=False)

    class Meta:
        ordering = ['-id']
