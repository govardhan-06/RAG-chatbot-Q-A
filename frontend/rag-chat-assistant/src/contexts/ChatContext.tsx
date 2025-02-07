import React, { createContext, useContext, useState } from 'react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

export interface ChatContextType {
    messages: Message[];
    addMessage: (text: string, sender: 'user' | 'bot') => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (text: string, sender: 'user' | 'bot') => {
        const newMessage: Message = {
            id: Math.random().toString(36).substr(2, 9),
            text,
            sender,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export { ChatContext };