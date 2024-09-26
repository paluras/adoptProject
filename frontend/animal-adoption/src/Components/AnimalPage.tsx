import React, { useEffect } from "react";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";
import { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SwiperComponent from "./Swipper/Swiper";
import InfoBox from "./InfoBox";
import Markdown from 'react-markdown'

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
    }, [id])

    if (!animals && !medicalHistory) return (<>...Loading</>)

    return (
        <>
            <section className="flex flex-col bg-slate-100 ">
                <div>  {animals?.image_url && (
                    <SwiperComponent img={animals.image_url} />
                )}</div>
                <div className=" p-4 grid gap-14 grid-cols-2">
                    {/* Text Description */}
                    <div>
                        <h1 className="py-4 text-2xl font-bold" >{animals?.name}</h1>
                        <Markdown className={"text-balance"}>{`${animals?.description}`}</Markdown>

                    </div>

                    {/* Additional detail container */}
                    <div className="details-container">
                        <h1 className="text-2xl font-bold py-4">Detali</h1>
                        <div className="grid gap-2 grid-cols-2 w-full">

                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Specie", value: animals?.species }}
                            />
                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Rasa", value: animals?.breed }}
                            />
                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Varsta", value: animals?.age }}
                            />
                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Vaccinuri", value: medicalHistory?.vaccines }}
                            />
                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Note", value: medicalHistory?.notes }}
                            />
                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Deparazitare", value: medicalHistory?.dewormings }}
                            />
                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Tratamente", value: medicalHistory?.treatments }}
                            />
                        </div>
                    </div>
                </div>

                <Link to={`/update-form/${id}`}>
                    <button className="bg-lime-300 p-2 rounded-md border-2 border-lime-500 ">Update the form</button></Link>
            </section>
        </>
    )
}

export default AnimalDetails