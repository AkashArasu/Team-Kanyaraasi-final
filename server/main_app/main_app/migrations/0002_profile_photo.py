# Generated by Django 3.1.2 on 2020-10-31 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='photo',
            field=models.CharField(blank=True, max_length=4000, null=True),
        ),
    ]
