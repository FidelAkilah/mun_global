# skills/models.py
from django.db import models

class SkillCategory(models.Model):
    name = models.CharField(max_length=100) # e.g., "Speech & Public Speaking"
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class SkillVideo(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='videos', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    youtube_url = models.URLField()
    video_id = models.CharField(max_length=50, help_text="The ID at the end of the URL")
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=20, choices=[('BEG', 'Beginner'), ('INT', 'Intermediate'), ('ADV', 'Advanced')], default='BEG')

    def __str__(self):
        return self.title