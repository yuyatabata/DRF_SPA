import uuid
from django.db import models
from django.utils import timezone

class Book(models.Model):
    class Meta:
        db_table = 'book'

        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        title = models.CharField(verbose_name='タイトル', max_length=20)
        price = models.IntegerField(verbose_name='価格', null=True)
        created_at = mdoels.DateField(default=timezone.nov)

        def__str__(self):
            return self.title