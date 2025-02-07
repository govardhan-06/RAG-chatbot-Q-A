from langchain_groq import ChatGroq
from django.conf import settings
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

def generate_llm_response(retrieved_text, query):
    """Generate final response using LLM"""
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    llm = ChatGroq(model="llama-3.3-70b-versatile",api_key=GROQ_API_KEY)

    if(retrieved_text):

        if len(retrieved_text) > 4096:
            retrieved_text = retrieved_text[:4096]

        prompt_template = PromptTemplate.from_template("""
        You are a helpful assistant capable of answering questions using provided context.

        Context:
        {retrieved_text}

        User Query:
        {query}

        Instructions:
        - If the context provides sufficient information to answer the user's query, respond clearly and concisely.
        - If the context does not provide relevant information or if there is no matching content for the query, inform the user that the answer cannot be determined based on the provided context.
        - The response must be in normal text format.

        Answer:
        """)

        prompt = prompt_template.invoke({
            "retrieved_text": retrieved_text,
            "query": query
        })
    
    else:
        # Fallback prompt when no relevant context is found
        prompt_template = PromptTemplate.from_template("""
        You are a helpful assistant. Please answer the following query to the best of your ability:

        User Query:
        {query}

        Instructions:
        - Provide a clear and concise response based on your general knowledge
        - The response must be in normal text format.

        Answer:
        """)
        prompt = prompt_template.invoke({
            "query": query
        })
    
    response = response = llm.invoke(prompt)
    return {"answer": response.content}
