import React from "react";
import { useParams } from "react-router";

import AdminButtons from "../components/AnimalPageComponents/AdminButtons";
import Description from "../components/AnimalPageComponents/Description";
import DetailsContainer from "../components/AnimalPageComponents/DetailsContainer";
import LoadingSpinner from "../components/LoadingSpinner";
import SwiperComponent from "../components/Swipper/Swiper";
import useAnimalDetails from "../hooks/useAnimalDetails";

const AnimalDetails: React.FC = () => {

    const { id } = useParams()
    const {
        animal,
        loading,
        error,
        infoData,
        medicalInfoData
    } = useAnimalDetails(id!);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error loading animal details</div>;
    if (!animal) return <div>Animal not found</div>;

    return (
        <section className=" flex flex-col background-color text-main">
            <div>
                {animal?.image_url && <SwiperComponent img={animal.image_url} />}
            </div>
            <div className="p-6 grid gap-10 md:grid-cols-2 sm:grid-cols-1">

                <Description name={animal?.name} description={animal?.description} />
                <DetailsContainer animalError={error} infoData={infoData} medicalHistoryError={error} medicalInfoData={medicalInfoData} />

            </div>

            <AdminButtons animal={animal} id={id!} />

        </section>
    );
};

export default AnimalDetails