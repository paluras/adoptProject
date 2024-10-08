import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm } from '../../hooks/useForm';
import ImageUpload from './ImageUpload';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import MedicalForm from './FormTestMedical';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';



const AnimalForm: React.FC = () => {
    const dispatch = useDispatch();
    const [animalId, setAnimalId] = useState();
    const { formState, handleInputChange, handleFileChange, setFormState } = useForm({
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

        } catch (error) {
            if (AxiosError.ERR_BAD_REQUEST) {
                alert("Login in order to add a animal")
                dispatch(logout())
            }
            console.error('Error adding animal:', error);
        }
    };

    const handleEditorChange = (value?: string) => {
        setFormState((prevState) => ({
            ...prevState,
            description: value || '',  // Ensures description is never undefined
        }));
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


                <MDEditor
                    data-color-mode="light"
                    value={formState.description}
                    onChange={handleEditorChange}
                    className="bg-gray-50 border border-gray-300 p-4 text-gray-800"
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                />
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
            {animalId ?
                <div className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <MedicalForm animalId={animalId} />
                </div>
                : null}
        </>

    );
};

export default AnimalForm;
