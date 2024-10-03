import React, { useEffect } from "react";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";
import { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SwiperComponent from "../Components/Swipper/Swiper";
import InfoBox from "../Components/InfoBox";
import Markdown from 'react-markdown'
import DeleteAnimalPageButton from "../Components/DeleteAnimalPageButton";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AnimalDetails: React.FC = () => {
    const [animals, setAnimals] = useState<Animal>();
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>();
    const { id } = useParams()
    const isAdmin: boolean = useSelector((state: RootState) => state.user.isAdmin);
    const userId: number | null = useSelector((state: RootState) => state.user.userId);
    // refactor this

    const fetchAnimal = async () => {
        try {
            const response = await axios.get(`/api/animals/${id}`)
            setAnimals(response.data)

            console.log(animals);

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
                <div className=" p-6 grid gap-10 md:grid-cols-2 sm:grid-cols-1">
                    {/* Text Description */}
                    <div>
                        <h1 className="py-4 text-2xl font-bold" >{animals?.name}</h1>
                        <Markdown className={"text-balance font-light"}>{`${animals?.description}`}</Markdown>

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
                                title={{ prefix: "Sex", value: animals?.sex }}
                            />
                            <InfoBox
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: "Varsta", value: animals?.age + ' Ani' }}
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
                {userId === animals?.user_id || isAdmin ?
                    <div className="w-full gap-4 flex items-center justify-center p-10">
                        <Link to={`/update-form/${id}`}>
                            <button className="w-60 p-10 bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400">
                                Update the form
                            </button></Link>
                        <DeleteAnimalPageButton
                            animalId={parseInt(id!, 10)}
                        />

                    </div>
                    : null}

            </section>
        </>
    )
}

export default AnimalDetails