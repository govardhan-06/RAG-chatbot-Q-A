# RAG Chatbot Assistant

A full-stack application that implements a Retrieval-Augmented Generation (RAG) chatbot. Users can upload PDF documents and ask questions about their content. The system uses vector embeddings and LLM to provide accurate responses based on the document content.

## Features

- PDF document upload and processing
- Vector-based document retrieval using pgvector
- AI-powered question answering using Mistral and Groq
- Real-time chat interface
- Docker containerization for easy deployment

## Prerequisites

- Docker and Docker Compose
- Mistral AI API key
- Groq API key
- Hugging Face token

## Environment Setup

1. Create a `.env` file in the `backend/ragChatbot/` directory with the following variables:

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

````

## Running with Docker

1. Build and start the containers:

```sh
docker-compose up --build
```

This will start three containers:

- PostgreSQL database with pgvector extension (port 5432)
- Django backend (port 8000)
- React frontend (port 3000)

2. Access the application:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api](http://localhost:8000/api)

## API Endpoints

- `POST /api/upload/`: Upload PDF documents
- `POST /api/query/`: Send questions about uploaded documents

## Project Structure

```
.
├── backend/
│   └── ragChatbot/
│       ├── app/
│       │   ├── models.py      # Database models
│       │   ├── utils.py       # PDF processing and embeddings
│       │   ├── views.py       # API endpoints
│       │   └── rag_pipeline.py # LLM integration
│       └── Dockerfile
├── frontend/
│   └── rag-chat-assistant/
│       ├── src/
│       │   ├── components/    # React components
│       │   ├── contexts/      # React contexts
│       │   ├── styles/        # CSS styles
│       │   └── utils/         # API integration
│       └── Dockerfile
└── docker-compose.yml
```

## Development

To run the application in development mode:

1. Start the database:

```sh
docker-compose up db
```

2. Run the backend (from backend/ragChatbot/):

```sh
python manage.py runserver
```

3. Run the frontend (from frontend/rag-chat-assistant/):

```sh
npm install
npm start
```

## Technologies Used

- **Frontend**:

  - React.js
  - TypeScript
  - Axios
  - CSS3

- **Backend**:

  - Django
  - Django REST Framework
  - pgvector
  - LangChain
  - Mistral AI
  - Groq

- **Database**:
  - PostgreSQL
  - pgvector extension

## License

MIT License

## Author

Govardhan A R
````
