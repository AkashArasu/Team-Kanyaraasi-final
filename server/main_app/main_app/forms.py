from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column

class SignUpForm(UserCreationForm):
    birth_date = forms.DateField(help_text='Required. Format: DD-MM-YYYY', widget=forms.TextInput(
        attrs={'type': 'date'}
    ))
    firstname = forms.CharField(help_text='First Name', required=True)
    lastname = forms.CharField(help_text='Last Name')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('firstname', css_class='form-group col-md-6 mb-0'),
                Column('lastname', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
            'birth_date',
            Submit('submit', 'Sign in')
        )
    class Meta:
        model = User
        fields = ('firstname', 'lastname',
                  'birth_date', 'password1', 'password2',)
