import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface MedicalFormProps {
    animalId: number
}

const MedicalForm: React.FC<MedicalFormProps> = ({ animalId }) => {

    const [vaccines, setVaccines] = useState("");
    const [dewormings, setDeworming] = useState("");
    const [treatments, setTreatments] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/medical-history', {
                id: animalId,
                vaccines,
                dewormings,
                treatments,
                notes
            });

            navigate(`/${animalId}`)
        } catch (error) {
            console.error('Error adding medical history:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Complete the Medical Form</h2>
            <h3 className="text-xl font-semibold mb-2">Vaccines</h3>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Vaccines:</label>
                <input
                    type="text"
                    value={vaccines}
                    onChange={(e) => setVaccines(e.target.value)}
                    placeholder="Vaccines"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">Notes:</label>
                <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Medical notes"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">Dewormings:</label>
                <input
                    type="text"
                    value={dewormings}
                    onChange={(e) => setDeworming(e.target.value)}
                    placeholder="Deworming treatments"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Treatments:</label>
                <input
                    type="text"
                    value={treatments}
                    onChange={(e) => setTreatments(e.target.value)}
                    placeholder="Other treatments"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
                Add Medical Treatments
            </button>
        </form>
    );
}

export default MedicalForm;
