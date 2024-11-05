import axios from "axios";
import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router";

import { handleAxiosError } from "../../utils/handleAxiosError";

interface DeleteAnimalPageButtonProps {
    animalId: number
}

const DeleteAnimalPageButton: React.FC<DeleteAnimalPageButtonProps> = ({ animalId }) => {
    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/animals/${animalId}`, {
                withCredentials: true,
            })
            alert("Deleted succesfully")
            navigate('/')
        } catch (error) {
            handleAxiosError(error)
        }
    }

    return (
        <button onClick={handleSubmit} className="w-60 p-10 bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400">
            {t('adminButtons.delete')}
        </button>
    )
}
export default DeleteAnimalPageButton