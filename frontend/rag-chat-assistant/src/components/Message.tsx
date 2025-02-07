import React from 'react';
import '../styles/Message.css';

interface MessageProps {
    text: string;
    sender: 'user' | 'assistant';
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
    return (
        <div className={`message-container ${sender}`}>
            <div className="avatar">
                {sender === 'assistant' ? '🤖' : '👤'}
            </div>
            <div className="message-content">
                <div className="sender-name">
                    {sender === 'user' ? 'You' : 'RAG Assistant'}
                </div>
                <div className="message-text">
                    {text}
                </div>
            </div>
        </div>
    );
};

export default Message;