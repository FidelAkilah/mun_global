

# admin.py
from django.contrib import admin
from .models import SkillCategory, SkillVideo

class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

class SkillVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'difficulty')
    list_filter = ('category', 'difficulty')
    search_fields = ('title', 'description', 'video_id')

admin.site.register(SkillCategory, SkillCategoryAdmin)
admin.site.register(SkillVideo, SkillVideoAdmin)