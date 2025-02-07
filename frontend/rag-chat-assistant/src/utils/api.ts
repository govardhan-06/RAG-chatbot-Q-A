import axios, { AxiosResponse } from 'axios';

interface ChatResponse {
    answer: string;
    sources?: string[];
}

interface UploadResponse {
    success: boolean;
    message: string;
}

const API_URL = process.env.REACT_APP_BACKEND_URL;

if (!API_URL) {
    throw new Error('REACT_APP_BACKEND_URL is not defined');
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response: AxiosResponse<UploadResponse> = await axios.post(
            `${API_URL}/upload/`, 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
};

export const sendMessage = async (userInput: string): Promise<ChatResponse> => {
    try {
        const response: AxiosResponse<ChatResponse> = await axios.post(
            `${API_URL}/query/`, 
            { question: userInput }
        );
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('Failed to get response from chatbot');
    }
};