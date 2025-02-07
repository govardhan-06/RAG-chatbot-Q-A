import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>RAG Chatbot</h2>
            <ul>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                        end
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/upload" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Upload PDF
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/chat" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/settings" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Settings
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;