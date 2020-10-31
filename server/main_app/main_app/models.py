from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(max_length=500, blank=True)
    email_id = models.TextField(null=True,blank=True)
    birth_date = models.DateField(null=True, blank=True)
    firstname = models.CharField(null=True, blank=True)
    lastname=models.CharField(null=True,blank=True)
    


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
