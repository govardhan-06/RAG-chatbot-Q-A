import React, { useState, useRef } from 'react';
import { uploadFile } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import '../styles/FileUpload.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }
        
        if (selectedFile.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setError('File size must be less than 10MB');
            return;
        }

        setFile(selectedFile);
        setError(null);
        setSuccess(null);
    };

    const resetForm = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFile(null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await uploadFile(file);
            setSuccess('File uploaded successfully!');
            setUploadedFile(file);
            resetForm();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="file-upload">
            <h2>Upload PDF Document</h2>
            <div className="upload-container">
                <div className="file-input-wrapper">
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        id="file-input"
                        accept="application/pdf" 
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="hidden-input"
                    />
                    <label htmlFor="file-input" className="file-input-label">
                        Choose PDF
                    </label>
                    {file && <span className="selected-file">{file.name}</span>}
                </div>
                <button 
                    onClick={handleUpload} 
                    disabled={isUploading || !file}
                    className="upload-button"
                >
                    {isUploading ? <LoadingSpinner /> : 'Upload PDF'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            
            {uploadedFile && (
                <div className="uploaded-file-tile">
                    <div className="pdf-icon">📄</div>
                    <div className="file-details">
                        <p className="file-name">{uploadedFile.name}</p>
                        <p className="file-size">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;