import React, { useState } from 'react';

// Assuming you have already imported the uploadImage function
import { uploadImage } from '@/app/service/uploadimage';
export default function UploadImageForm() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setError(null);
        setMessage("");

        const formData = new FormData();
        formData.append('image', file);

        try {
            await uploadImage(formData);
            setMessage("Image uploaded successfully!");
        } catch (err) {
            setError("Error uploading image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>Upload</button>
            </form>
            {loading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
}
