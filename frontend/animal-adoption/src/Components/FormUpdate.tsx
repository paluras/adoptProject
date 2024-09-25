import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from '../CustomHooks/useForm';
import ImageUpload from './ImageUpload';

interface AnimalFormProps {
    onSuccess: () => void;
}

const FormUpdate: React.FC<AnimalFormProps> = ({ onSuccess }) => {
    const { id } = useParams<{ id: string }>();

    const { formState: basicInfo, handleInputChange: handleBasicInfoChange, handleFileChange, setFormState: setBasicInfo } = useForm({
        name: '',
        age: '',
        species: '',
        breed: '',
        status: '',
        imageFile: null as File | null,
        imageUrl: '',
    });

    const { formState: medicalInfo, handleInputChange: handleMedicalInfoChange, setFormState: setMedicalInfo } = useForm({
        vaccines: '',
        dewormings: '',
        notes: '',
        treatments: '',
    });


    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const response = await axios.get(`/api/animals/${id}`);
                const animal = response.data;
                const responseHistory = await axios.get(`/api/medical-history/${id}`);
                const animalHistory = responseHistory.data;

                setBasicInfo({
                    name: animal.name,
                    age: animal.age,
                    species: animal.species,
                    breed: animal.breed,
                    status: animal.status,
                    imageFile: null,
                    imageUrl: animal.image_url || '',
                });

                setMedicalInfo({
                    vaccines: animalHistory.vaccines,
                    treatments: animalHistory.treatments,
                    notes: animalHistory.notes,
                    dewormings: animalHistory.dewormings,
                });
            } catch (error) {
                console.error('Error fetching animal:', error);
            }
        };
        fetchAnimal();
    }, [id, setBasicInfo, setMedicalInfo]);


    const handleSubmitBasicInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', basicInfo.name);
        formData.append('age', basicInfo.age.toString());
        formData.append('species', basicInfo.species);
        formData.append('breed', basicInfo.breed);
        formData.append('status', basicInfo.status);

        if (basicInfo.imageFile) {
            formData.append('image', basicInfo.imageFile);
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/animals/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            onSuccess();
        } catch (error) {
            console.error('Error updating animal:', error);
        }
    };

    const handleSubmitMedicalInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/medical-history/${id}`, medicalInfo, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
            onSuccess();
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitBasicInfo} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <input
                        type="text"
                        name="name"
                        value={basicInfo.name}
                        onChange={handleBasicInfoChange}
                        placeholder="Animal Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="age"
                        value={basicInfo.age}
                        onChange={handleBasicInfoChange}
                        placeholder="Age"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>

                <div>
                    <select
                        name="species"
                        value={basicInfo.species}
                        onChange={handleBasicInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                        <option value="">Select species</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>
                </div>

                <div>
                    <input
                        type="text"
                        name="breed"
                        value={basicInfo.breed}
                        onChange={handleBasicInfoChange}
                        placeholder="Breed"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>
                <div>
                    <select
                        name="status"
                        value={basicInfo.status}
                        onChange={handleBasicInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                        <option value="">Select Status</option>
                        <option value="available">Available</option>
                        <option value="adopted">Adopted</option>
                    </select>
                </div>

                {/* Image Uploader */}
                <div>
                    <ImageUpload onFileChange={(file) => handleFileChange(file, 'imageFile')} />
                </div>

                <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    Submit
                </button>
            </form>

            <form onSubmit={handleSubmitMedicalInfo} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <input
                        type="text"
                        name="vaccines"
                        value={medicalInfo.vaccines}
                        onChange={handleMedicalInfoChange}
                        placeholder="Vaccines"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="dewormings"
                        value={medicalInfo.dewormings}
                        onChange={handleMedicalInfoChange}
                        placeholder="dewormings"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="notes"
                        value={medicalInfo.notes}
                        onChange={handleMedicalInfoChange}
                        placeholder="notes"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="treatments"
                        value={medicalInfo.treatments}
                        onChange={handleMedicalInfoChange}
                        placeholder="treatments"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    Submit
                </button>
            </form>

        </>
    );
};

export default FormUpdate;
