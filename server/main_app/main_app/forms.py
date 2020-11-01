from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column

from .models import Profile
class UserForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            Row(
                Column('first_name', css_class='form-group col-md-6 mb-0'),
                Column('last_name', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
            'username',
            'email',
            Row(
                Column('password1', css_class='form-group col-md-6 mb-0'),
                Column('password2', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
        )
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email','username')

class SignUpForm(forms.ModelForm):
    birth_date = forms.DateField(help_text='Required. Format: DD-MM-YYYY', widget=forms.TextInput(
        attrs={'type': 'date'}
    ))
    address = forms.CharField(widget=forms.Textarea)
    photo = forms.CharField(widget=forms.HiddenInput(), required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            'birth_date',
            'address',
            'photo',
            Submit('submit', 'Sign in')
        )

    class Meta:
        model = Profile
        fields = ( 'photo',
                  'birth_date', 'address',)
