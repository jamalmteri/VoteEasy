from django.shortcuts import render, redirect

from django.contrib.auth import authenticate, login, logout
from .forms import RegistrationForm

# Create your views here.
def index(request):
    return render(request, "voteeasy/index.html")

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
        
    else:
        form = RegistrationForm()

    return render(request, 'voteeasy/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')  # Redirect to a dashboard page after successful login
        else:
            error_message = 'Invalid login credentials. Please try again.'
    else:
        error_message = None
    return render(request, 'voteeasy/login.html', {'error_message': error_message})

def user_logout(request):
    logout(request)
    return redirect('login')

def dashboard(request):

    return render(request, 'voteeasy/dashboard.html')