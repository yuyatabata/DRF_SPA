from rest_framework import viewsets
from rest_framework.permission import IsAuhtenticated0rReadOnly

from shop.models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.object.all()
    serializer_class = BookSerializer
    permission_class = [IsAuhtenticated0rReadOnly]