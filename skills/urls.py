from django.urls import path
from .views import SkillHubView
urlpatterns = [
    path('', SkillHubView.as_view(), name='skill-hub'),
]