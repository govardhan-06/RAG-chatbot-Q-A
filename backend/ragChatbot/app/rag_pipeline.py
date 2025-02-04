from langchain_groq import ChatGroq
from django.conf import settings
from dotenv import load_dotenv
import os

load_dotenv()

def generate_llm_response(retrieved_text, query):
    """Generate final response using OpenAI LLM"""
    # GROQ_API_KEY = settings.GROQ_API_KEY
    llm = ChatGroq(model="llama-3.3-70b-versatile",api_key=os.getenv("GROQ_API_KEY"))
    prompt = f"Context: {retrieved_text}\n\nUser Query: {query}\n\nAnswer:"
    
    response = response = llm.invoke(prompt)
    return {"answer": response.content}

if __name__=="__main__":
    retrieved_text = "This is a sample text."
    query = "What is the sample text about?"
    response = generate_llm_response(retrieved_text, query)
    print(response)
