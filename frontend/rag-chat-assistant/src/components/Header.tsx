import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="logo">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2970ff" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="#2970ff" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="#2970ff" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1>RAG Assistant</h1>
            </div>
        </header>
    );
};

export default Header;