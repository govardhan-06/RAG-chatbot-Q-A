import React from 'react';
import Chat from './components/Chat';
import FileUpload from './components/FileUpload';
import Header from './components/Header';
import { ChatProvider } from './contexts/ChatContext';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <div className="app">
        <main className="main-container">
          <div className="upload-section">
            <FileUpload />
          </div>
          <div className="chat-section">
            <Header />
            <Chat />
          </div>
        </main>
      </div>
    </ChatProvider>
  );
};

export default App;