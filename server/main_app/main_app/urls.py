"""main_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name = 'home.html'), name = 'home'),
    url(r'^admin/', admin.site.urls),
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^login/$', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    url(r'^logout/$', auth_views.LogoutView.as_view(template_name = 'logged_out.html'), name = 'logout'),
    url(r'profile/(?P<username>[a-zA-Z0-9._]+)$', views.get_user_profile, name = 'profile'),
    url(r'^signup/proctor/$', views.proctor_signup, name = 'proctor_signup'),
    url(r'^tandc/(?P<id>[0-9]+)$', views.get_tandc, name = 'tandc'),
    url(r'^test/(?P<tid>[0-9]+)$',views.get_test,name='test'),
    url(r'^faceauth/',views.faceauth,name='faceauth')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
     urlpatterns += static(settings.MEDIA_URL,
                           document_root=settings.MEDIA_ROOT)
