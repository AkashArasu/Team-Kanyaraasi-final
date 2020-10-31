from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from .models import Profile
from django.shortcuts import render, redirect,get_object_or_404
from . import forms
from django.db import transaction

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core import serializers
from django.conf import settings 
import json

import base64
import face_recognition
import os


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


@transaction.atomic
def proctor_signup(request):
    if request.method == 'POST':
        user_form = forms.UserForm(request.POST)
        profile_form = forms.SignUpForm(request.POST)
        print(request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.refresh_from_db()  # This will load the Profile created by the Signal
            # Reload the profile form with the profile instance
            profile_form = forms.SignUpForm(
                request.POST, instance=user.profile)
            # Manually clean the form this time. It is implicitly called by "is_valid()" method
            profile_form.full_clean()
            profile_form.is_proctor = True
            profile_form.save()  # Gracefully save the form
            login(request, user)
            return redirect('home')
    else:
        user_form = forms.UserForm()
        profile_form = forms.SignUpForm()
    return render(request, 'signup.html', {'user_form': user_form, 'profile_form': profile_form})

@api_view(["POST"])
def faceauth(data):
    try:
        object=data.data
        
        #object =={'id':'email id or whatever','img':'the base 64 string'} 
        #img must be in jpeg format
        encoded_img=object['img']
        imgdata = base64.b64decode(encoded_img)
        
        f=open("./temp.jpg",'wb')
        f.write(imgdata)
        
        picture_of_me=face_recognition.load_image_file(f.name)
        face_encoding = face_recognition.face_encodings(picture_of_me)[0]
        
        ref_path="C:/Users/takas/OneDrive/Pictures/Camera Roll/Akash DB.jpg" #the path to the image stored for reference
        
        ref_image_enc=face_recognition.face_encodings(face_recognition.load_image_file(ref_path))[0]
        results = face_recognition.compare_faces([face_encoding],ref_image_enc)
        f.close()
        os.remove("./temp.jpg")
        if(results[0]==True):
            
            return JsonResponse("Authorized!",safe=False)
        else:
            return JsonResponse("Unauthorized",safe=False)

    except ValueError as e:
        return Response("Error:"+str(e.args),status.HTTP_404_NOT_FOUND)

def get_tandc(request, id):
    return render(request, 'tandc.html',{'tid':id})


def get_test(request, tid):
    return render(request,'test_in_progress.html')

def get_user_profile(request,username):
    # print(instance.id)
    user = User.objects.get(username=request.user)
    instance = get_object_or_404(Profile, user=request.user)

    print(instance.user.username)

    return render(request, 'user_profile.html', {"user":user,"profile":instance})

