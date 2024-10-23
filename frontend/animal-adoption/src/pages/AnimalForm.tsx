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
import AutoCompleteSelect from '../components/FormComponents/AutoCompleteSelect';
import { countryMap, countriesSet } from '../utils/locationData';

const AnimalForm: React.FC = () => {
    const [availableCities, setAvailableCities] = useState<string[]>([]);
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
        country: '',
        city: '',
        countryError: null as string | null,
        weight: '',
    });

    // Refactor
    const handleCountryChange = (value: string) => {

        const isValidCountry = countriesSet.has(value);

        setFormState(prev => ({
            ...prev,
            country: value,
            city: '',
            countryError: isValidCountry ? null : 'Invalid country selected.',
        }));
        const citiesForCountry = isValidCountry ? countryMap.get(value) || [] : [];
        setAvailableCities(citiesForCountry);
    };

    // Refactor

    const handleCityChange = (value: string) => {
        setFormState(prev => ({
            ...prev,
            city: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValidCountry = countriesSet.has(formState.country);
        const isValidCity =
            isValidCountry && countryMap.get(formState.country)?.includes(formState.city);

        if (!isValidCountry || !isValidCity) {
            alert('You must choose a valid country-city pair.');
            return;
        }

        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('age', formState.age.toString());
        formData.append('species', formState.species);
        formData.append('breed', formState.breed);
        formData.append('status', formState.status);
        formData.append('sex', formState.sex);
        formData.append('description', formState.description);
        formData.append('country', formState.country);
        formData.append('city', formState.city);
        formData.append('weight', Number(formState.weight).toFixed(2));

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
            const errorMessage = handleAxiosError(error);

            if (errorMessage === 'Access denied, token missing') {
                alert('Login in order to add an animal');
            } else {
                alert(errorMessage);
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
                    labelName='Nume'
                    type={'text'}
                    name={'name'}
                    formValue={formState.name}
                    onChange={handleInputChange}
                    placeHolder={'Azorel'} />

                <InputForm type={'number'}
                    labelName='Varsta'
                    name={'age'}
                    formValue={formState.age}
                    onChange={handleInputChange}
                    placeHolder={'Varsta'} />

                <SelectForm
                    labelName='Specie'
                    name={"species"}
                    value={formState.species}
                    onChange={handleInputChange}
                    selections={["Pisica", "Caine"]}
                    placeHolder={'Selecteaza Specie'} />

                <SelectForm
                    labelName='Sex'
                    name={"sex"}
                    value={formState.sex}
                    onChange={handleInputChange}
                    selections={["Femela", "Mascul"]}
                    placeHolder={'Selecteaza Sexul'} />

                <InputForm
                    labelName='Rasa'
                    type={'text'}
                    name={'breed'}
                    formValue={formState.breed}
                    placeHolder={'Rasa'}
                    onChange={handleInputChange} />

                <InputForm
                    labelName='Greutate'
                    type={'number'}
                    name={'weight'}
                    formValue={formState.weight}
                    placeHolder={'Greutate'}
                    onChange={handleInputChange} />

                <SelectForm
                    labelName='Status'
                    name={"status"}
                    value={formState.status}
                    onChange={handleInputChange}
                    selections={["Adoptat", "Valabil"]}
                    placeHolder={'Selecteaza Statusul'} />

                <AutoCompleteSelect
                    options={Array.from(countriesSet)}
                    value={formState.country}
                    onChange={handleCountryChange}
                    placeholder="Select a country"
                    label="Country"
                />

                {formState.countryError && (
                    <span className="text-red-500">{formState.countryError}</span>
                )}

                {formState.country && !formState.countryError && (
                    <AutoCompleteSelect
                        options={availableCities}
                        value={formState.city}
                        onChange={handleCityChange}
                        placeholder="Select a city"
                        label="City"
                    />
                )}
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
