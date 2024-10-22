import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import ImageUpload from './ImageUpload';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { handleAxiosError } from '../../utils/handleAxiosError';
import { appendImages } from '../../utils/formUtils';

const FormUpdate: React.FC = () => {
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
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/animals/${id}`);
                const animal = response.data.body;

                const responseHistory = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-history/${id}`);
                const animalHistory = responseHistory.data.body;

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
                    vaccines: animalHistory?.vaccines || '',
                    treatments: animalHistory?.treatments || '',
                    notes: animalHistory?.notes || '',
                    dewormings: animalHistory?.dewormings || '',
                });
            } catch (error) {
                handleAxiosError(error)
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

        appendImages(formData, basicInfo)

        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/animals/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

        } catch (error) {
            alert(handleAxiosError(error))

        }
    };

    const handleSubmitMedicalInfo = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/medical-history/${id}`,
                {
                    animal_id: parseInt(id!, 10),
                    ...medicalInfo
                }, {
                withCredentials: true
            });
        } catch (error) {
            alert(handleAxiosError(error))



        }
    };

    const handleEditorChange = (value?: string) => {
        setBasicInfo((prevState) => ({
            ...prevState,
            description: value || '',
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmitBasicInfo} className="space-y-4 max-w-lg mx-auto mt-4 bg-white p-6 rounded-t-lg shadow-lg">
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

                <MDEditor
                    data-color-mode="light"
                    value={basicInfo.description}
                    onChange={handleEditorChange}
                    className="bg-gray-50 border border-gray-300 p-4 text-gray-800"
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                />
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

            <form onSubmit={handleSubmitMedicalInfo} className="space-y-4 max-w-lg mx-auto bg-white p-6  shadow-lg">
                {[
                    ["vaccines", "vaccinuri"],
                    ["notes", 'note'],
                    ["dewormings", 'deparazitari'],
                    ["treatments", 'tratamente']].map((field, index) => (
                        <div key={index}>
                            <label className="block text-gray-700 font-semibold mb-1">
                                {field[1].charAt(0).toUpperCase() + field[1].slice(1) + ":"}
                            </label>
                            <input
                                type="text"
                                name={field[0]}
                                value={medicalInfo[field[0] as keyof typeof medicalInfo]} // Access value dynamically
                                onChange={handleMedicalInfoChange}
                                placeholder={field[1].charAt(0).toUpperCase() + field[1].slice(1)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                            />
                        </div>
                    ))}

                <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    Add Medical Treatments
                </button>
            </form>

        </>
    );
};

export default FormUpdate;
