import React, { useEffect } from "react";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";
import { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const AnimalDetails: React.FC = () => {
    const [animals, setAnimals] = useState<Animal>();
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>();
    const { id } = useParams()

    // refactor this

    const fetchAnimal = async () => {
        try {
            const response = await axios.get(`/api/animals/${id}`)
            setAnimals(response.data)
        } catch (error) {
            console.log({ error })
        }
    }
    const fetchAnimalHystory = async () => {
        try {
            const response = await axios.get(`/api/medical-history/${id}`)
            setMedicalHistory(response.data)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        fetchAnimal();
        fetchAnimalHystory();
    },)



    return (
        <>
            <section className="flex flex-col items-center">
                <div className="w-11/12 gap-2 grid grid-cols-[1fr_1fr_1fr] grid-rows-[0.5fr_0.5fr] p-8">
                    {animals?.image_url && (
                        <img
                            className="col-span-1 row-span-2 w-full h-80 object-cover rounded border-2 border-red-400"
                            width={320}
                            height={320}
                            src={`http://localhost:5000/uploads/${animals.image_url}`}
                            alt={animals.name} />

                    )}
                    <div className="flex w-full flex-col" >
                        <div className="flex justify-between p-2 border-2">
                            <p>Nume: </p> <p>{animals?.name}</p>
                        </div>
                        <div className="flex justify-between p-2 border-2">
                            <p>Specie: </p> <p>{animals?.species}</p>
                        </div>
                        <div className="flex justify-between p-2 border-2">
                            <p>Rasa: </p> <p>{animals?.breed}</p>
                        </div>
                        <div className="flex justify-between p-2 border-2">
                            <p>Varsta: </p> <p>{animals?.age}</p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col" >
                        <div className="flex justify-between p-2 border-2">
                            <p>Vaccinuri:</p>
                            <p> {medicalHistory?.vaccines}</p>
                        </div>
                        <div className="flex justify-between p-2 border-2">
                            <p>Tratamente: </p> <p> {medicalHistory?.treatments}</p>
                        </div>
                        <div className="flex justify-between p-2 border-2">
                            <p>Note: </p> <p> {medicalHistory?.notes}</p>
                        </div>
                        <div className="flex justify-between p-2 border-2">
                            <p>Deparazitare:</p> <p> {medicalHistory?.dewormings}</p>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro eum iure ea fuga labore sapiente consectetur cumque quaerat unde consequatur dicta animi dolor, accusantium illum ut aliquid provident deserunt voluptatum?</div>
                </div>

                <Link to={`/update-form/${id}`}>
                    <button className="bg-lime-300 p-2 rounded-md border-2 border-lime-500 ">Update the form</button></Link>
            </section>
        </>
    )
}

export default AnimalDetails