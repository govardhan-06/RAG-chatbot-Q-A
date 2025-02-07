# RAG Chatbot Assistant

A full-stack application that implements a Retrieval-Augmented Generation (RAG) chatbot. Users can upload PDF documents and ask questions about their content. The system uses vector embeddings and LLM to provide accurate responses based on the document content.

## Features

- PDF document upload and processing
- Vector-based document retrieval using pgvector
- AI-powered question answering using Mistral and Groq
- Real-time chat interface
- Docker containerization for easy deployment

### Prerequisites

- Git
- Docker and Docker Compose
- API Keys:
  - Groq API key
  - Mistral AI API key
  - Hugging Face token

### Installation

1. Clone the repository

```bash
git clone https://github.com/govardhan-06/RAG-chatbot-Q-A.git
cd RAG-chatbot-Q-A
```

````

2. Create .env file in ragChatbot directory:

```env
GROQ_API_KEY="your_groq_api_key"
MISTRALAI_API_KEY="your_mistral_api_key"
HF_TOKEN="your_huggingface_token"
DB_HOST="db"
DB_NAME="ragChatBot"
DB_PORT="5432"
DB_USER="local"
DB_PASS="1234"
```

3. Start the application using Docker:

```bash
docker-compose up --build
```

This will start:

- PostgreSQL database with pgvector (port 5432)
- Django backend (port 8000)
- React frontend (port 3000)

4. Access the application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

## Usage

1. Upload a PDF document using the interface
2. Wait for the document to be processed and embedded
3. Ask questions about the document content in the chat interface

## Technologies

- Frontend: React.js, TypeScript
- Backend: Django, LangChain
- Database: PostgreSQL with pgvector
- AI: Mistral AI, Groq

## License

MIT License

## Author

Govardhan A R
````
