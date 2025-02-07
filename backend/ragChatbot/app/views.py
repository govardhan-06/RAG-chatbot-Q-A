from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .models import Document, Embedding
from .serializers import DocumentSerializer
from .utils import extract_text_from_pdf, generate_embedding, chunk_text
from .rag_pipeline import generate_llm_response
from django.core.files.storage import default_storage
from django.conf import settings
from django.db import connection
import psycopg2,os

class DocumentUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        # Save file temporarily
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)
        with open(file_path, "wb") as f:
            for chunk in file.chunks():
                f.write(chunk)

        # Extract text
        text = extract_text_from_pdf(file_path)

        # Chunk text
        text_chunks= chunk_text(text)

        # Save Document
        document = Document.objects.create(text=text)

        print(len(text_chunks))

        # Generate and Store Embedding
        for chunk in text_chunks:
            print(len(chunk))
            embedding = generate_embedding(chunk)
            Embedding.objects.create(document=document, text_chunk=chunk, embedding=embedding)
            print(f"Embedding for chunk saved")

        return Response({"message": "File uploaded and processed", "document_id": document.id})

class QueryView(APIView):
    def post(self, request):
        query = request.data.get('question', '')

        if not query:
            return Response({"error": "No query provided"}, status=400)

        # Generate query embedding
        query_embedding = generate_embedding(query)

        results=""

        # Perform vector similarity search
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT text_chunk 
                    FROM text_embeddings
                    ORDER BY embedding <=> %s::vector 
                    LIMIT 3
                """, [query_embedding])  
                results = cursor.fetchall()

        except psycopg2.Error as e:
            print(f"Error occurred while querying the database: {e}")

        # If relevant documents found, generate response
        if results:
            retrieved_text = " ".join([row[0] for row in results])
            response = generate_llm_response(retrieved_text, query)
        else:
            response = generate_llm_response("", query)

        return Response({"answer": response["answer"]})
