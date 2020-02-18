from django.contrib import admin

from .models import Book

class BookModelsAdmin(admin.Models):
    list_display = ('title','price', 'id', 'created_at')
    ordering = ('-created_at',)
    readonly = ('id', 'created_at')

admin.site.register(Book, BookModelsAdmin)