import fitz 
from langchain_mistralai import MistralAIEmbeddings
from django.conf import settings
from tenacity import retry, stop_after_attempt, wait_fixed
from dotenv import load_dotenv
import os

load_dotenv()

def extract_text_from_pdf(pdf_path):
    """Extract text from a given PDF file."""
    doc = fitz.open(pdf_path)
    text=""
    for page in doc:
        text += page.get_text("text")
    doc.close()
    return text

def chunk_text(text, chunk_size=8192):
    """Splits text into chunks of a given size while preserving words."""
    words = text.split()
    chunks, word, length = [], "", 0

    for w in words:
        if length + len(w) < chunk_size:
            word += (" " if word else "") + w  
            length += len(w) + 1  
        else:
            chunks.append(word)
            word, length = w, len(w)  
    if word:
        chunks.append(word)  

    return chunks

@retry(stop=stop_after_attempt(5), wait=wait_fixed(1))
def generate_embedding(text):
    """Generate text embeddings using API."""
    os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
    MISTRALAI_API_KEY = os.getenv("MISTRALAI_API_KEY")
    embeddings = MistralAIEmbeddings(model="mistral-embed",api_key=MISTRALAI_API_KEY)
    response=embeddings.embed_query(text)
    return response