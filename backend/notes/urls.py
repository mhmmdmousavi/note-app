from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreateView.as_view(), name="note-list-create"),  # GET, POST
    path("notes/<int:pk>/", views.NoteDetailView.as_view(), name="note-detail"),  # GET, PUT, DELETE
]
