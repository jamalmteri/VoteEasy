from django.contrib import admin
from .models import Election, Candidate, TanzaniaRegion

class CandidateAdmin(admin.ModelAdmin):
    exclude = ('votes', 'voters', 'percentage')

admin.site.register(Election)
admin.site.register(TanzaniaRegion)
admin.site.register(Candidate, CandidateAdmin)
