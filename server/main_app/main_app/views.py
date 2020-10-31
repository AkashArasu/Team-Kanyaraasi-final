from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from .models import Profile
from django.shortcuts import render, redirect,get_object_or_404
from . import forms
from django.db import transaction


@transaction.atomic
def signup(request):
    if request.method == 'POST':
        user_form = forms.UserForm(request.POST)
        profile_form = forms.SignUpForm(request.POST)
        print(request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.refresh_from_db()  # This will load the Profile created by the Signal
            # Reload the profile form with the profile instance
            profile_form = forms.SignUpForm(request.POST, instance=user.profile)
            # Manually clean the form this time. It is implicitly called by "is_valid()" method
            profile_form.full_clean()
            profile_form.save()  # Gracefully save the form
            login(request, user)
            return redirect('home')
    else:
        user_form = forms.UserForm()
        profile_form = forms.SignUpForm()
    return render(request, 'signup.html', {'user_form': user_form,'profile_form':profile_form})


def get_user_profile(request,username):
    # print(instance.id)
    user = User.objects.get(username=request.user)
    instance = get_object_or_404(Profile, user=request.user)

    print(instance.user.username)

    return render(request, 'user_profile.html', {"user":user,"profile":instance})

