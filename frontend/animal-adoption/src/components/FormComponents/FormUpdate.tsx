import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import rehypeSanitize from 'rehype-sanitize';

import AutoCompleteSelect from './AutoCompleteSelect';
import ImageUpload from './ImageUpload';
import InputForm from './InputForm';
import { useForm } from '../../hooks/useForm';
import { appendImages } from '../../utils/formUtils';
import { handleAxiosError } from '../../utils/handleAxiosError';
import { countriesSet, countryMap } from '../../utils/locationData';


const FormUpdate: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [availableCities, setAvailableCities] = useState<string[]>([]);


    const { formState: basicInfo, handleInputChange: handleBasicInfoChange, handleFileChange, setFormState: setBasicInfo } = useForm({
        name: '',
        age: '',
        species: '',
        breed: '',
        status: '',
        imageFiles: [] as File[],
        imageUrl: '',
        description: '',
        sex: '',
        country: '',
        city: '',
        weight: '',
    });

    const { formState: medicalInfo, handleInputChange: handleMedicalInfoChange, setFormState: setMedicalInfo } = useForm({
        vaccines: '',
        dewormings: '',
        notes: '',
        treatments: '',
    });


    // Refactor
    const handleCountryChange = (value: string) => {

        const isValidCountry = countriesSet.has(value);

        setBasicInfo(prev => ({
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
        setBasicInfo(prev => ({
            ...prev,
            city: value,
        }));
    };

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
                    country: animal.country,
                    city: animal.city,
                    weight: animal.weight,
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


        const isValidCountry = countriesSet.has(basicInfo.country);
        const isValidCity =
            isValidCountry && countryMap.get(basicInfo.country)?.includes(basicInfo.city);


        if (!isValidCountry || !isValidCity) {
            alert('You must choose a valid country-city pair.');
            return;
        }

        const formData = new FormData();
        formData.append('name', basicInfo.name);
        formData.append('age', basicInfo.age.toString());
        formData.append('species', basicInfo.species);
        formData.append('breed', basicInfo.breed);
        formData.append('status', basicInfo.status);
        formData.append('description', basicInfo.description);
        formData.append('sex', basicInfo.sex);
        formData.append('country', basicInfo.country);
        formData.append('city', basicInfo.city);
        formData.append('weight', Number(basicInfo.weight).toFixed(2));

        appendImages(formData, basicInfo)



        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/animals/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

            console.log('Response:', response);
            alert("Successfully Updated the Animal");

        } catch (error) {
            alert(handleAxiosError(error));
        }
    };
    console.log(basicInfo);

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

            alert("Succesfully update the medical Form");
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
                    <label htmlFor="name">{t('pets.name')}</label>
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
                    <label htmlFor="age">{t('pets.age')}</label>
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
                    <label htmlFor="specie">{t('form.species')}</label>
                    <select
                        name="species"
                        value={basicInfo.species}
                        onChange={handleBasicInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                        <option value="">{t('form.speciesSelect')}</option>
                        <option value="cat">{t('species.cat')}</option>
                        <option value="dog">{t('species.dog')}</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="rasa">{t('form.breed')}</label>
                    <input
                        type="text"
                        name="breed"
                        value={basicInfo.breed}
                        onChange={handleBasicInfoChange}
                        placeholder={t('form.breed')}
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
                        <option value="">{t('form.sexSelect')}</option>
                        <option value="Mascul">{t('sex.female')}</option>
                        <option value="Femela">{t('sex.male')}</option>
                    </select>
                </div>

                <InputForm
                    labelName={t('form.weight')}
                    type={'number'}
                    name={'weight'}
                    formValue={basicInfo.weight}
                    placeHolder={t('form.weight')}
                    onChange={handleBasicInfoChange} />

                {basicInfo.country && (
                    <AutoCompleteSelect
                        options={Array.from(countriesSet)}
                        value={basicInfo.country}
                        onChange={handleCountryChange}
                        placeholder={t('form.countrySelect')}
                        label={t('form.country')}
                    />
                )}

                {basicInfo.country && (
                    <AutoCompleteSelect
                        options={availableCities}
                        value={basicInfo.city}
                        onChange={handleCityChange}
                        placeholder={t('form.citySelect')}
                        label={t('form.city')}
                    />
                )}
                <div>
                    <label htmlFor="status">{t('form.status')}</label>
                    <select
                        name="status"
                        value={basicInfo.status}
                        onChange={handleBasicInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                        <option value="">{t('form.statusSelect')}</option>
                        <option value="Valabil">{t('status.available')}</option>
                        <option value="Adoptat">{t('status.adopted')}</option>
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
                    {t('form.submit')}
                </button>
            </form>

            <form onSubmit={handleSubmitMedicalInfo} className="space-y-4 max-w-lg mx-auto bg-white p-6  shadow-lg">
                {[
                    ["vaccines", t('formMedical.vaccines')],
                    ["notes", t('formMedical.notes')],
                    ["dewormings", t('formMedical.dewormings')],
                    ["treatments", t('formMedical.treatments')]].map((field, index) => (
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
                    {t('formMedical.medicalSubmit')}
                </button>
            </form>

        </>
    );
};

export default FormUpdate;
