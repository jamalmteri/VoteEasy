from django.urls import path
from . import views

from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.decorators import login_required

# helper function 
def user_is_admin(user):
    return user.is_superuser

admin_required = user_passes_test(user_is_admin, login_url='login')

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('dashboard/', login_required(views.dashboard), name='dashboard'),  # Add this line

    # path('dashboard/elections/', views.election_list, name='election_list'),

    # path('candidates/create/', admin_required(views.create_candidate), name='create_candidate'),
    # path('elections/create/', admin_required(views.create_election), name='create_election'),
    path('ongoing-elections/', views.ongoing_elections, name='ongoing_elections'),
    path('election/<int:election_id>/candidates/', views.candidate_list, name='candidate_list'),
    path('candidate/<int:candidate_id>/vote/', views.cast_vote, name='cast_vote'),

    path('election/<int:election_id>/results/', views.results, name='election_results'),

    path('contact/', views.contact, name='contact'),
    path('contact/submit/', views.contact_submit, name='contact_submit'),

]