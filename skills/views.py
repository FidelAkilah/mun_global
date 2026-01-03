from django.shortcuts import render

from rest_framework import generics
from .models import SkillCategory
from .serializers import SkillCategorySerializer

class SkillHubView(generics.ListAPIView):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
