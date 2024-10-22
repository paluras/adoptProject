import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '../hooks/useForm';
import ImageUpload from '../components/FormComponents/ImageUpload';
import InputForm from '../components/FormComponents/InputForm';
import SelectForm from '../components/FormComponents/SelectForm';
import MedicalForm from '../components/FormComponents/FormTestMedical';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { handleAxiosError } from '../utils/handleAxiosError';
import { appendImages } from '../utils/formUtils';

const AnimalForm: React.FC = () => {

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

        appendImages(formData, formState);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/animals`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            setAnimalId(response.data.body.id)

        } catch (error) {
            if (handleAxiosError(error) === "Access denied, token missing") {
                alert('Login in order to add a animal')
            } else {
                alert(handleAxiosError(error))
            }
        }
    };

    const handleEditorChange = (value?: string) => {
        setFormState((prevState) => ({
            ...prevState,
            description: value || '',
        }));
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4  max-w-lg mx-auto my-3 bg-white p-6 rounded-lg shadow-lg">
                <InputForm
                    type={'text'}
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
