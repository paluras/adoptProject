import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";

import AnimalGrid from "../components/AnimalGrid";
import Filter from "../components/Filter";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAnimalFilter } from "../hooks/useAnimalFilter";
import useFetch from "../hooks/useFetch";
import { Animal } from "../models/AnimalSchema";

interface ListPageProps {
    children: ReactNode;
}

const ListPage: React.FC<ListPageProps> = ({ children }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showFilterButton, setShowFilterButton] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { filters, setFilters, buildQueryString } = useAnimalFilter();
    console.log(filters);


    const { ref: mainContentRef } = useInView({
        threshold: 0.1,
        onChange: (inView) => setShowFilterButton(inView)
    });

    const { data: animals, loading: loadingAnimals } =
        useFetch<Animal[]>(`${import.meta.env.VITE_API_URL}/api/animals?${buildQueryString()}`);

    const handleFilterSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        setIsFilterOpen(false);
    };

    if (loadingAnimals) return <LoadingSpinner />;

    return (
        <div className="background-color text-main">
            {children}
            <h1 className="text-4xl text-center font-bold p-4">{t('common.availableAnimals')}</h1>

            <Filter
                {...filters}
                setSpecies={(species) => setFilters(prev => ({ ...prev, species }))}
                setStatus={(status) => setFilters(prev => ({ ...prev, status }))}
                setSex={(sex) => setFilters(prev => ({ ...prev, sex }))}
                setCity={(city) => setFilters(prev => ({ ...prev, city }))}
                setCountry={(country) => setFilters(prev => ({ ...prev, country }))}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                handleFilterSubmit={handleFilterSubmit}
            />

            {showFilterButton && (
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-8 py-4 rounded-full shadow-lg z-10"
                >
                    {t('common.filter')}
                </button>
            )}

            <div id='main-content' ref={mainContentRef}>
                <AnimalGrid
                    animals={animals || []}
                    onAnimalClick={(id) => navigate(`/${id}`)}
                />
            </div>
        </div>
    );
};
export default ListPage;
