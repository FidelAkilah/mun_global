from rest_framework import serializers
from .models import SkillVideo, SkillCategory

class SkillVideoSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = SkillVideo
        fields = ['id', 'title', 'youtube_url', 'video_id', 'description', 'category_name', 'difficulty']

class SkillCategorySerializer(serializers.ModelSerializer):
    videos = SkillVideoSerializer(many=True, read_only=True)
    
    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'slug', 'videos']