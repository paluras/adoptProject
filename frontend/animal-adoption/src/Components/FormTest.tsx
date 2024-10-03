import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '../CustomHooks/useForm';
import ImageUpload from './ImageUpload';
import InputForm from './FormComponents/InputForm';
import SelectForm from './FormComponents/SelectForm';
import MedicalForm from './FormTestMedical';


const AnimalForm: React.FC = () => {

    const [animalId, setAnimalId] = useState();
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
                formData.append('images', file);
            });
        }

        try {
            const response = await axios.post('/api/animals', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    withCredentials: true,
                },
            });
            setAnimalId(response.data.id)
            console.log(animalId);
        } catch (error) {
            console.error('Error adding animal:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">

                <InputForm type={'text'}
                    name={'name'}
                    formValue={formState.name}
                    onChange={handleInputChange}
                    placeHolder={'Azorel'} />

                <InputForm type={'number'}
                    name={'age'}
                    formValue={formState.age}
                    onChange={handleInputChange}
                    placeHolder={'Varsta'} />

                <SelectForm
                    name={"species"}
                    value={formState.species}
                    onChange={handleInputChange}
                    selections={["Pisica", "Caine"]}
                    placeHolder={'Selecteaza Specie'} />

                <SelectForm
                    name={"sex"}
                    value={formState.sex}
                    onChange={handleInputChange}
                    selections={["Femela", "Mascul"]}
                    placeHolder={'Selecteaza Sexul'} />

                <InputForm
                    type={'text'}
                    name={'breed'}
                    formValue={formState.breed}
                    placeHolder={'Rasa'}
                    onChange={handleInputChange} />

                <SelectForm
                    name={"status"}
                    value={formState.status}
                    onChange={handleInputChange}
                    selections={["Adoptat", "Valabil"]}
                    placeHolder={'Selecteaza Statusul'} />

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                        onChange={handleInputChange}
                        value={formState.description}
                        name="description" id="description"></textarea>
                </div>
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
            <div className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                {animalId ? <MedicalForm animalId={animalId} /> : <div>No id</div>}
            </div>
        </>

    );
};

export default AnimalForm;
