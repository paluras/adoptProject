import React, { useState } from 'react';

interface ImageUploadProps {
    onFileChange: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange }) => {
    const [preview, setPreview] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files); // Convert FileList to Array
            onFileChange(filesArray); // Pass the array of files to the parent

            // Create URLs for previews
            const fileURLs = filesArray.map(file => URL.createObjectURL(file));
            setPreview(fileURLs);
        }
    };

    return (
        <div>
            <label>Upload Images:</label>
            <input type="file" onChange={handleFileChange} accept="image/*" multiple />
            {preview.map((url, index) => (
                <img key={index} src={url} alt={`Preview ${index}`} width="100" />
            ))}
        </div>
    );
};

export default ImageUpload;
