import React, { useState } from 'react';

interface ImageUploadProps {
    onFileChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onFileChange(file);

            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
        }
    };

    return (
        <div>
            <label>Upload Image:</label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {preview && <img src={preview} alt="Preview" width="100" />}
        </div>
    );
};

export default ImageUpload;
