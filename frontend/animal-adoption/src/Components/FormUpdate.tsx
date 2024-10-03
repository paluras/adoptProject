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
        imageFiles: [] as File[],
        imageUrl: '',
        description: '',
        sex: ''
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
                    imageFiles: [],
                    imageUrl: animal.image_url || null,
                    description: animal.description,
                    sex: animal.sex,
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
        formData.append('description', basicInfo.description);
        formData.append('sex', basicInfo.sex)

        // Check if new images were uploaded
        if (Array.isArray(basicInfo.imageFiles) && basicInfo.imageFiles.length > 0) {
            // If new images are uploaded, append them
            basicInfo.imageFiles.forEach(file => {
                formData.append('images', file);
            });
        } else if (basicInfo.imageUrl) {
            // No new images, append the existing image URL(s)
            if (Array.isArray(basicInfo.imageUrl)) {
                basicInfo.imageUrl.forEach(url => formData.append('imageUrl', url));
            } else {
                formData.append('imageUrl', basicInfo.imageUrl);
            }
        }


        try {
            await axios.put(
                `http://localhost:5000/api/animals/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

            onSuccess();
        } catch (error) {
            console.error('Error updating animal:', error);

        }
    };

    const handleSubmitMedicalInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/medical-history/${id}`, medicalInfo, {
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
            <form onSubmit={handleSubmitBasicInfo} className="space-y-4 max-w-lg mx-auto mt-4 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <label htmlFor="name">Nume</label>

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
                    <label htmlFor="age">Varsta</label>

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
                    <label htmlFor="specie">Specie</label>

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
                    <label htmlFor="rasa">Rasa</label>

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
                    <label htmlFor="sex">Sex</label>
                    <select
                        name="sex"
                        value={basicInfo.sex}
                        onChange={handleBasicInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                        <option value="">Select sex</option>
                        <option value="Mascul">Mascul</option>
                        <option value="Femela">Femela</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status">Status</label>
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

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea rows={20} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                        onChange={handleBasicInfoChange}
                        value={basicInfo.description}
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

            <form onSubmit={handleSubmitMedicalInfo} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <label htmlFor="vaccines">Vaccinuri</label>

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
                    <label htmlFor="dewormings">Deparazitare</label>

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
                    <label htmlFor="notes">Note</label>

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
                    <label htmlFor="treatments">Tratamente</label>
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
