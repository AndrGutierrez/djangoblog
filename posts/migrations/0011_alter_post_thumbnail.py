# Generated by Django 4.0 on 2022-01-29 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_alter_post_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to='static/posts/thumbnail'),
        ),
    ]