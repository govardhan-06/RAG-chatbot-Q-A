import { useState } from 'react';
import { sendMessage as apiSendMessage } from '../utils/api';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const sendMessage = async (text: string) => {
        setLoading(true);
        try {
            const newMessage: Message = { 
                id: Date.now().toString(), 
                text, 
                sender: 'user' 
            };
            setMessages(prev => [...prev, newMessage]);

            const response = await apiSendMessage(text);
            
            const botMessage: Message = { 
                id: (Date.now() + 1).toString(), 
                text: response.answer, 
                sender: 'bot' 
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, there was an error processing your request.',
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return { messages, sendMessage, loading };
};

export default useChat;