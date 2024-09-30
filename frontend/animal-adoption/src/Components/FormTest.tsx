import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../CustomHooks/useForm';
import ImageUpload from './ImageUpload';

interface AnimalFormProps {
    onSuccess: () => void;
}

const AnimalForm: React.FC<AnimalFormProps> = ({ onSuccess }) => {
    const navigate = useNavigate();

    // Use custom hook for form handling
    const { formState, handleInputChange, handleFileChange } = useForm({
        name: '',
        age: '',
        species: '',
        breed: '',
        status: '',
        sex: '',
        description: '',
        imageFiles: [] as File[],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('age', formState.age.toString());
        formData.append('species', formState.species);
        formData.append('breed', formState.breed);
        formData.append('status', formState.status);
        formData.append('sex', formState.sex);
        formData.append('description', formState.description);

        if (Array.isArray(formState.imageFiles)) {
            formState.imageFiles.forEach(file => {
                formData.append('images', file); // This should match the multer configuration
            });
        }

        console.log('Files to upload:', formState.imageFiles);


        try {
            const response = await axios.post('/api/animals', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    withCredentials: true,
                },
            });
            console.log(response);


            const newAnimalId = response.data.id;
            navigate(`/animals/${newAnimalId}`);
            onSuccess();
        } catch (error) {

            console.error('Error adding animal:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div>
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Animal Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
            </div>

            <div>
                <input
                    type="number"
                    name="age"
                    value={formState.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
            </div>

            <div>
                <select
                    name="species"
                    value={formState.species}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    <option value="">Select species</option>
                    <option value="Pisica">Cat</option>
                    <option value="Caine">Dog</option>
                </select>
            </div>
            <div>
                <select
                    name="sex"
                    value={formState.sex}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    <option value="">Select sex</option>
                    <option value="Mascul">Mascul</option>
                    <option value="Femela">Femela</option>
                </select>
            </div>

            <div>
                <input
                    type="text"
                    name="breed"
                    value={formState.breed}
                    onChange={handleInputChange}
                    placeholder="Breed"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
            </div>

            <div>
                <select
                    name="status"
                    value={formState.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="adopted">Adopted</option>
                </select>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    onChange={handleInputChange}
                    value={formState.description}
                    name="description" id="description"></textarea>
            </div>

            {/* Image Uploader */}
            <div>
                <ImageUpload onFileChange={(files) => handleFileChange(files, 'imageFiles')} />
            </div>

            <button
                type="submit"
                className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
                Submit
            </button>
        </form>

    );
};

export default AnimalForm;
