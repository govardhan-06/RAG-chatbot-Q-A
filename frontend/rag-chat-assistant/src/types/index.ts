// src/types/index.ts

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}

export interface User {
    id: string;
    name: string;
}

export interface FileUpload {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
}