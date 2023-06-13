from django.shortcuts import render, redirect, get_object_or_404
from .models import models
from django.contrib.auth import authenticate, login, logout
from .models import Election, Candidate, TanzaniaRegion, Vote
from .forms import RegistrationForm, CandidateForm, ElectionForm
from datetime import date, datetime
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail

from django.utils import timezone
from django.urls import reverse
from django.contrib import messages

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
    current_date = date.today()
    ongoing_elections =Election.objects.filter(models.Q(start_date__lte=current_date) | models.Q(end_date__lte=current_date))
    return render(request, 'voteeasy/dashboard.html', {'ongoing_elections': ongoing_elections})


# the candidate 
def create_candidate(request):
    if request.method == 'POST':
        form = CandidateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('candidates_list')  # Redirect to the candidates list page
    else:
        form = CandidateForm()
    return render(request, 'election/create_candidate.html', {'form': form})

def create_election(request):
    if request.method == 'POST':
        form = ElectionForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('elections_list')
    else:
        form = ElectionForm()
    
    return render(request, 'election/create_election.html', {'form': form})

# def election_list(request):
#     elections = Election.objects.all()
#     return render(request, 'election/election_list.html', {'elections': elections})


def ongoing_elections(request):
    current_date = date.today()
    ongoing_elections =Election.objects.filter(models.Q(start_date__lte=current_date) | models.Q(end_date__lte=current_date))
    return render(request, 'election/ongoing_elections.html', {'ongoing_elections': ongoing_elections})


def candidate_list(request, election_id):
    election = get_object_or_404(Election, pk=election_id)
    candidates = election.candidates.all()
    return render(request, 'election/candidate_list.html', {'election': election, 'candidates': candidates})





# def cast_vote(request, candidate_id):
#     user = request.user
#     candidate = get_object_or_404(Candidate, pk=candidate_id)
#     election = candidate.elections.first()

#     if user in candidate.voters.all():
#         # User has already voted for this candidate
#         messages.error(request, 'You have already cast your vote for this candidate.')
#         return redirect('ongoing_elections')
#     elif user in election.candidates.values('voters__id'):
#         # User has already voted in this election
#         messages.error(request, 'You have already cast your vote in this election.')
#         return redirect('ongoing_elections')
#     else:
#         candidate.votes += 1
#         candidate.voters.add(user)
#         candidate.save()
#         messages.success(request, 'Your vote has been cast successfully.')
#         return redirect('ongoing_elections')

# def cast_vote(request, candidate_id):
#     user = request.user
#     candidate = get_object_or_404(Candidate, pk=candidate_id)
#     election = candidate.elections.first()

#     if Vote.objects.filter(candidate=candidate, election=election).exists():
#         # User has already voted for this candidate in the same election
#         messages.error(request, 'You have already cast your vote for this candidate in this election.')
#         return redirect('ongoing_elections')

#     vote = Vote(candidate=candidate, election=election)
#     vote.save()

#     candidate.votes += 1
#     candidate.voters.add(user)
#     candidate.save()

#     messages.success(request, 'Your vote has been cast successfully.')
#     return redirect('ongoing_elections')
 
def cast_vote(request, candidate_id):
    user = request.user
    if not user.is_authenticated:
        # User is not authenticated, redirect to the registration page
        return redirect('register')
    candidate = get_object_or_404(Candidate, pk=candidate_id)
    election = candidate.elections.first()

    if user in election.voters.all():
        # User has already voted in this election
        messages.error(request, 'You have already cast your vote in this election.')
        return redirect('ongoing_elections')

    # Remove user's previous vote in the same election
    previous_vote = Candidate.objects.filter(voters=user, elections=election).first()
    if previous_vote:
        previous_vote.votes -= 1
        previous_vote.voters.remove(user)
        previous_vote.save()

    candidate.votes += 1
    candidate.voters.add(user)
    candidate.save()
    election.voters.add(user)
    election.save()
    messages.success(request, 'Your vote has been cast successfully.')
    return redirect('ongoing_elections')



from django.utils import timezone

def results(request, election_id):
    election = get_object_or_404(Election, pk=election_id)
    candidates = election.candidates.all().order_by('-votes')
    total_votes = sum(candidate.votes for candidate in candidates)
    total_voters = len(set(user for candidate in candidates for user in candidate.voters.all()))
    
    current_datetime = timezone.now()  # Use timezone.now() to get the current datetime in the timezone-aware format
    end_datetime = timezone.make_aware(datetime.combine(election.end_date, datetime.min.time()))  # Make the end datetime timezone-aware
    
    remaining_time = end_datetime - current_datetime
    remaining_days = remaining_time.days
    remaining_hours = remaining_time.seconds // 3600
    remaining_minutes = (remaining_time.seconds % 3600) // 60
    remaining_seconds = remaining_time.seconds % 60

    remaining_time_str = f"{remaining_days} days | {remaining_hours} hours | {remaining_minutes} minutes | {remaining_seconds} seconds"

    # Assign color class to each candidate
    color_classes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
    for i, candidate in enumerate(candidates):
        candidate.percentage = round(candidate.votes / total_votes * 100, 1)
        candidate.color_class = color_classes[i % len(color_classes)]

    context = {
        'election': election,
        'candidates': candidates,
        'total_votes': total_votes,
        'total_voters': total_voters,
        'remaining_time': remaining_time_str
    }

    return render(request, 'election/results.html', context)


def contact(request):
    return render(request, 'voteeasy/support.html')

def contact_submit(request):
    if request.method == 'POST':
        name = request.POST.get('contact-name', '')
        email = request.POST.get('contact-email', '')
        message = request.POST.get('contact-message', '')

        # Send email
        send_mail(
            'Contact Form Submission',
            f'Name: {name}\nEmail: {email}\n\nMessage: {message}',
            'admin@voteeasy.co.tz',
            ['admin@voteeasy.co.tz'],
            fail_silently=False,
        )

        messages.success(request, 'Thank you for your message. We will get back to you soon.')

        return redirect('index')

    return render(request, 'voteeasy/support.html')

def custom_404_view(request, exception):
    return render(request, '404.html', status=404)