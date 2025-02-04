from django.urls import path
from .views import DocumentUploadView, QueryView

urlpatterns = [
    path('upload/', DocumentUploadView.as_view(), name='upload-document'),
    path('query/', QueryView.as_view(), name='query-document'),
]
