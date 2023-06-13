from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

class TanzaniaRegion(models.Model):
    REGIONS = [
        ('AR', 'Arusha'),
        ('DS', 'Dar es Salaam'),
        ('DO', 'Dodoma'),
        ('IR', 'Iringa'),
        ('KA', 'Kagera'),
        ('KI', 'Kigoma'),
        ('KJ', 'Kilimanjaro'),
        ('LN', 'Lindi'),
        ('MA', 'Manyara'),
        ('MR', 'Mara'),
        ('MB', 'Mbeya'),
        ('MO', 'Morogoro'),
        ('MT', 'Mtwara'),
        ('MU', 'Mwanza'),
        ('NJ', 'Njombe'),
        ('PN', 'Pemba North'),
        ('PS', 'Pemba South'),
        ('PW', 'Pwani'),
        ('RK', 'Rukwa'),
        ('RV', 'Ruvuma'),
        ('SH', 'Shinyanga'),
        ('SI', 'Simiyu'),
        ('TB', 'Tabora'),
        ('TN', 'Tanga'),
        ('ZH', 'Zanzibar Central/South'),
        ('ZN', 'Zanzibar North'),
        ('ZU', 'Zanzibar Urban/West'),
    ]

    region = models.CharField(max_length=2, choices=REGIONS)

    def __str__(self):
        return self.get_region_display()
    
class Candidate(models.Model):
    name = models.CharField(max_length=100)
    candidate_number = models.IntegerField(default=0)
    biography = models.TextField(default='')
    image = models.ImageField(upload_to='candidates/', default='images/default.png')
    election_bullets = models.TextField(default='')
    party = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    state = models.ForeignKey(TanzaniaRegion, on_delete=models.CASCADE)
    votes = models.IntegerField(default=0)  # New field to track votes
    voters = models.ManyToManyField(User) #establish relationship
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # New field to store percentage

    def __str__(self):
        return self.name
    
class Election(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    candidates = models.ManyToManyField(Candidate, related_name='elections')
    voters = models.ManyToManyField(User, related_name='voted_elections')
        
    def __str__(self):
        return self.name
    
    
class Vote(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['candidate', 'election'], name='unique_vote')
        ]
