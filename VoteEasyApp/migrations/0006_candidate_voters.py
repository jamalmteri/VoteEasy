# Generated by Django 4.1.7 on 2023-06-09 13:43

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('VoteEasyApp', '0005_candidate_votes'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='voters',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
