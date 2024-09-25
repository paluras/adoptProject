import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

interface Animal {
    id: number;
    name: string;
    species: string;
    age: number;
    breed: string;
    status: string;
    image_url: string;

}

interface MedicalFormProps {
    onSuccess: () => void;
}

const MedicalForm: React.FC<MedicalFormProps> = ({ onSuccess }) => {

    const { id } = useParams<{ id: string }>();
    if (!id) {
        throw new Error("Animal ID is undefined. Please check the route.");
    }

    const [vaccines, setVaccines] = useState("");
    const [dewormings, setDeworming] = useState("");
    const [treatments, setTreatments] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    const [animals, setAnimals] = useState<Animal | null>(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            const response = await fetch(`/api/animals/${id}`);
            const data: Animal = await response.json();
            setAnimals(data);
        };

        fetchAnimals();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/medical-history', {
                id: parseInt(id, 10), // Send animal_id, not just id
                vaccines,
                dewormings,
                treatments,
                notes
            });

            navigate(`/${id}`)
            onSuccess(); // Callback for success

        } catch (error) {
            console.error('Error adding medical history:', error);
        }
    };

    if (!animals) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Animal Info</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li className="text-gray-700"><strong>Name:</strong> {animals.name}</li>
                    <li className="text-gray-700"><strong>Age:</strong> {animals.age}</li>
                    <li className="text-gray-700"><strong>Breed:</strong> {animals.breed}</li>
                    <li className="text-gray-700"><strong>Species:</strong> {animals.species}</li>
                    <li className="text-gray-700"><strong>Status:</strong> {animals.status}</li>
                </ul>
            </div>

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
        </div>

    );
}

export default MedicalForm;
