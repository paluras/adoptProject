import axios from 'axios';
import { t } from 'i18next';
import React from "react";
import { useNavigate } from 'react-router-dom';

import { useForm } from "../../hooks/useForm";
import { handleAxiosError } from "../../utils/handleAxiosError";




interface MedicalFormProps {
    animalId: number;
}

const MedicalForm: React.FC<MedicalFormProps> = ({ animalId }) => {
    const navigate = useNavigate();

    const { formState, handleInputChange } = useForm({
        vaccines: "",
        dewormings: "",
        treatments: "",
        notes: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/medical-history`, {
                animal_id: animalId,
                ...formState
            }, {
                withCredentials: true
            });

            navigate(`/${animalId}`);
        } catch (error) {
            alert(handleAxiosError(error))

            handleAxiosError(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Complete the Medical Form</h2>
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
                            value={formState[field[0] as keyof typeof formState]}
                            onChange={handleInputChange}
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
    );
};

export default MedicalForm;
