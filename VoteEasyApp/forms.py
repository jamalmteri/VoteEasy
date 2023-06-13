from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from .models import Candidate, Election, TanzaniaRegion

class RegistrationForm(UserCreationForm):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    date_of_birth = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    national_id = forms.CharField(max_length=100)
    state = forms.CharField(max_length=100)

    def clean_national_id(self):
        national_id = self.cleaned_data.get('national_id')
        if not national_id.isdigit():
            raise ValidationError("National ID should only contain digit numbers.")
        return national_id

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'name', 'email', 'date_of_birth', 'national_id', 'state')


class CandidateForm(forms.ModelForm):
    state = forms.ModelChoiceField(queryset=TanzaniaRegion.objects.all())
    class Meta:
        model = Candidate
        fields = ['name', 'party', 'position', 'state']

class ElectionForm(forms.ModelForm):
    class Meta:
        model = Election
        fields = ['name', 'start_date', 'end_date', 'candidates']