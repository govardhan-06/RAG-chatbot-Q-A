import React, { useState, useContext, useRef, useEffect } from 'react';
import { ChatContext, ChatContextType } from '../contexts/ChatContext';
import { sendMessage } from '../utils/api';
import Message from './Message';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Chat.css';

const Chat: React.FC = () => {
    const { messages, addMessage } = useContext(ChatContext) as ChatContextType;
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addMessage(input, 'user');
            setLoading(true);
            try {
                const response = await sendMessage(input.trim());
                addMessage(response.answer, 'bot');
            } catch (error) {
                addMessage('Sorry, there was an error processing your request.', 'bot');
                console.error('Error sending message:', error);
            } finally {
                setLoading(false);
                setInput('');
            }
        }
    };

    return (
        <div className="chat-interface">
            <div className="chat-container">
                <div className="messages-container">
                    {messages.length === 0 && (
                        <div className="welcome-container">
                            <p className="welcome-text">
                                Hello! I'm your RAG-powered AI assistant. I can help you analyze and answer questions about your documents.
                            </p>
                        </div>
                    )}
                    <div className="messages">
                        {messages.map((msg) => (
                            <Message 
                                key={msg.id}
                                text={msg.text}
                                sender={msg.sender === 'bot' ? 'assistant' : 'user'}
                            />
                        ))}
                        {loading && (
                            <div className="loading-message">
                                <LoadingSpinner />
                                <span>RAG Assistant is thinking...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                
                <form onSubmit={handleSendMessage} className="chat-input-form">
                    <div className="input-container">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message RAG Assistant..."
                            disabled={loading}
                            className="chat-input"
                        />
                        <button 
                            type="submit" 
                            disabled={loading || !input.trim()}
                            className="send-button"
                        >
                            <svg viewBox="0 0 24 24" className="send-icon">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;