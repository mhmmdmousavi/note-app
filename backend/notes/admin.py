from django.contrib import admin
from django.contrib import admin
from .models import Note

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "created_at")
    search_fields = ("content",)
