# Generated by Django 4.1.7 on 2023-06-13 17:05

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('VoteEasyApp', '0008_vote_vote_unique_vote'),
    ]

    operations = [
        migrations.AddField(
            model_name='election',
            name='voters',
            field=models.ManyToManyField(related_name='voted_elections', to=settings.AUTH_USER_MODEL),
        ),
    ]
