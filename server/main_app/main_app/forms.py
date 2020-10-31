from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column

class SignUpForm(UserCreationForm):
    birth_date = forms.DateField(help_text='Required. Format: DD-MM-YYYY', widget=forms.TextInput(
        attrs={'type': 'date'}
    ))
    email = forms.EmailField(
        max_length=254, help_text='Required. Inform a valid email address.')
    address = forms.CharField(widget=forms.Textarea)
    photo=forms.CharField(widget=forms.HiddenInput,required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
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
            'birth_date',
            'address',
            'photo',
            Submit('submit', 'Sign in')
        )
    class Meta:
        model = User
        fields = ('first_name', 'last_name','username','email','photo',
                  'birth_date','address', 'password1', 'password2',)
