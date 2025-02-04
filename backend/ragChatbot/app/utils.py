import fitz 
from langchain_mistralai import MistralAIEmbeddings
from django.conf import settings
from dotenv import load_dotenv
import os

load_dotenv()

def extract_text_from_pdf(pdf_path):
    """Extract text from a given PDF file."""
    doc = fitz.open(pdf_path)
    text=""
    for page in doc:
        text += page.get_text("text") + "\n"
    doc.close()
    return text

def chunk_text(text, chunk_size=16300):
    """Split text into chunks of a given size."""
    words = text.split()
    return [" ".join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]

def generate_embedding(text):
    """Generate text embeddings using OpenAI API."""
    # OPENAI_API_KEY = settings.OPENAI_API_KEY
    os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
    MISTRALAI_API_KEY = os.getenv("MISTRALAI_API_KEY")
    embeddings = MistralAIEmbeddings(model="mistral-embed",api_key=MISTRALAI_API_KEY)
    response=embeddings.embed_query(text)
    return response

if __name__=="__main__":
    pdf_path = "../../sample.pdf"
    text = extract_text_from_pdf(pdf_path)
    text_chunks = chunk_text(text)
    tetx_chunks = text_chunks[:1]
    for chunk in text_chunks:
        embedding = generate_embedding(chunk)
        print(embedding)