import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

interface DeleteAnimalPageButtonProps {
    animalId: number
}

const DeleteAnimalPageButton: React.FC<DeleteAnimalPageButtonProps> = ({ animalId }) => {
    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
            await axios.delete(`https://adoptproject.onrender.com/animals/${animalId}`)
            alert("Deleted succesfully")
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleSubmit} className="w-60 p-10 bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400">
            Delete form
        </button>
    )
}
export default DeleteAnimalPageButton