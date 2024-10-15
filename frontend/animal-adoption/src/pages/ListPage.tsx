import React, { ReactNode, useState } from "react";
import { Animal } from "../models/AnimalSchema";
import { useNavigate } from "react-router";
import Card from "../components/CardComponent/CardComponent";
import useFetch from "../hooks/useFetch";
import { useInView } from "react-intersection-observer";
import Filter from "../components/Filter";

interface ListPageProps {
    children: ReactNode;
}

const ListPage: React.FC<ListPageProps> = ({ children }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showFilterButton, setShowFilterButton] = useState(false);
    const [species, setSpecies] = useState<string>('');
    const [status, setStatus] = useState<string>('Available');
    const [sex, setSex] = useState<string>('');

    const { ref: mainContentRef, inView } = useInView({
        threshold: 0.1,
        onChange: (inView) => {
            setShowFilterButton(inView);
        }
    });
    console.log(inView);


    const query = new URLSearchParams();
    if (species) query.append('species', species);
    if (status) query.append('status', status);
    if (sex) query.append('sex', sex);

    const { data: animals, loading: loadingAnimals, error: errorsAnimals } = useFetch<Animal[]>(`https://adoptproject.onrender.com/api/animals?${query.toString()}`);
    const navigate = useNavigate();

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsFilterOpen(false);
    };

    if (animals === null || loadingAnimals === true) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-secondary" role="status">
                </div>
            </div>
        );
    }

    return (
        <div className="background-color text-main">
            {children}

            <h1 className="text-4xl text-center font-bold p-4">Available Animals</h1>

            <Filter species={species}
                setSpecies={setSpecies}
                status={status}
                setStatus={setStatus}
                sex={sex}
                setSex={setSex}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                handleFilterSubmit={handleFilterSubmit} />

            {showFilterButton && (
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-8 py-4 rounded-full shadow-lg z-10"
                >
                    Filter
                </button>
            )}

            <div id='main-content' ref={mainContentRef} className="p-5 gap-4 flex flex-wrap justify-center">
                {animals.length > 0 && !errorsAnimals ? (
                    animals.map(animal => (
                        <Card
                            key={animal.id}
                            id={animal.id}
                            title={animal.name}
                            description={animal.species}
                            imageUrl={animal.image_url ? `https://adoptproject.onrender.com/uploads/${animal.image_url[0]}` : undefined}
                            onButtonClick={() => navigate(`/${animal.id}`)}
                        />
                    ))
                ) : (
                    <p>No animals available for adoption at this time.</p>
                )}
            </div>


        </div>
    );
};

export default ListPage;
