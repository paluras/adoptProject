import React from "react";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SwiperComponent from "../components/Swipper/Swiper";
import InfoBox from "../components/InfoBox";
import DeleteAnimalPageButton from "../components/AnimalPageComponents/DeleteAnimalPageButton";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useFetch from "../hooks/useFetch";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const AnimalDetails: React.FC = () => {

    const { id } = useParams()

    const {
        data: animals,
        loading: animalLoading,
        error: animalError } = useFetch<Animal>(`${import.meta.env.VITE_API_URL}/api/animals/${id}`);

    const { data: medicalHistory,
        loading: medicalHistoryLoading,
        error: medicalHistoryError } = useFetch<MedicalHistory>(`${import.meta.env.VITE_API_URL}/api/medical-history/${id}`);

    const isAdmin: boolean = useSelector((state: RootState) => state.user.isAdmin);
    const userId: number | null = useSelector((state: RootState) => state.user.userId);


    if (animalLoading || medicalHistoryLoading) return <>...Loading</>;


    const medicalInfoData = [
        { prefix: "Vaccinuri", value: medicalHistory?.vaccines },
        { prefix: "Note", value: medicalHistory?.notes },
        { prefix: "Deparazitare", value: medicalHistory?.dewormings },
        { prefix: "Tratamente", value: medicalHistory?.treatments }
    ];
    const infoData = [
        { prefix: "Specie", value: animals?.species },
        { prefix: "Rasa", value: animals?.breed },
        { prefix: "Sex", value: animals?.sex },
        { prefix: "Varsta", value: animals?.age === 1 ? animals.age + ' An' : animals?.age + ' Ani' }
    ]


    return (
        <section className=" flex flex-col background-color text-main">
            <div>
                {animals?.image_url && <SwiperComponent img={animals.image_url} />}
            </div>
            <div className="p-6 grid gap-10 md:grid-cols-2 sm:grid-cols-1">
                <div data-color-mode="light">
                    <h1 className="py-4 text-2xl font-bold">{animals?.name}</h1>
                    <MDEditor.Markdown
                        source={animals?.description}
                        style={{
                            whiteSpace: 'pre-wrap',
                            color: "#232f61",
                            backgroundColor: '#f6f3e9'
                        }}
                        rehypePlugins={[rehypeSanitize]}
                    />
                </div>

                <div className="details-container">
                    <h1 className="text-2xl font-bold py-4">Detali</h1>
                    <div className="grid gap-2 grid-cols-2 w-full">

                        {!animalError && infoData.map((info, index) => (
                            <InfoBox
                                key={index}
                                imgUrl="/icons/heart-solid.svg"
                                title={{ prefix: info.prefix, value: info.value }}
                            />
                        ))}
                        {!medicalHistoryError && (
                            medicalInfoData.map((info, index) => (
                                <InfoBox
                                    key={index}
                                    imgUrl="/icons/heart-solid.svg"
                                    title={{ prefix: info.prefix, value: info.value }}
                                />
                            ))
                        )}

                    </div>
                </div>
            </div>
            {(userId === animals?.user_id || isAdmin) && (
                <div className="w-full gap-4 flex items-center justify-center p-10">
                    <Link to={`/update-form/${id}`}>
                        <button className="w-60 p-10 bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400">
                            Update the form
                        </button>
                    </Link>
                    <DeleteAnimalPageButton animalId={parseInt(id!, 10)} />
                </div>
            )}
        </section>
    );
};

export default AnimalDetails