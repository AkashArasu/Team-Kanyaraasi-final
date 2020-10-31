from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from .models import Profile
from django.shortcuts import render, redirect
from . import forms

def signup(request):
    if request.method == 'POST':
        form = forms.SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('email_id')
            password = form.cleaned_data.get('password1')
            photo = form.cleaned_data.get('photo')
            #user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')
    else:
        form = forms.SignUpForm()
    return render(request, 'signup.html', {'form': form})


def get_user_profile(request, username):
    user = Profile.objects.get(username=username)
    print(user.profile)
    return render(request, 'user_profile.html', {"user": user})

