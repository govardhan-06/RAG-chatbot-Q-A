from django.db import models
from pgvector.django import VectorField


class Document(models.Model):
    text = models.TextField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document {self.id}"

class Embedding(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    text_chunk = models.TextField()
    embedding = VectorField(dimensions=1024)

    class Meta:
        db_table = 'text_embeddings'

    def __str__(self):
        return f"Embedding for Document {self.document.id}"
