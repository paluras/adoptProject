import React from 'react';
import { useTranslation } from 'react-i18next';

import useWindowSize from '../hooks/useWindowSize';

interface FilterProps {
    species: string;
    setSpecies: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    sex: string;
    setSex: React.Dispatch<React.SetStateAction<string>>;
    isFilterOpen: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleFilterSubmit: (e: React.FormEvent) => void;
}

const MobileFilter: React.FC<FilterProps> = ({
    species,
    setSpecies,
    status,
    setStatus,
    sex,
    setSex,
    isFilterOpen,
    setIsFilterOpen,
    handleFilterSubmit,
}) => {
    const { t } = useTranslation();
    const { width } = useWindowSize();


    return (
        // Mobile Filter
        width < 1024 ? (
            <div className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transform ${isFilterOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out`}>
                <div className="bg-white rounded-t-3xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Filters</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleFilterSubmit} className="space-y-4">
                        <select
                            value={species}
                            onChange={e => setSpecies(e.target.value)}
                            className="w-full border-2 text-secondary active:border-forth border-forth p-2 rounded-md"
                        >
                            <option value="">{t('species.all')}</option>
                            <option value="Caine">Caine</option>
                            <option value="Pisica">Pisica</option>
                        </select>

                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="w-full border-2 border-forth p-2 rounded-md"
                        >
                            <option value="">All Status</option>
                            <option value="Valabil">Available</option>
                            <option value="Adoptat">Adoptat</option>
                        </select>

                        <select
                            value={sex}
                            onChange={e => setSex(e.target.value)}
                            className="w-full border-2 border-forth p-2 rounded-md"
                        >
                            <option value="">All Sex</option>
                            <option value="Femela">Femela</option>
                            <option value="Mascul">Mascul</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-secondary px-8 rounded-md text-white p-2 hover:bg-opacity-90 transition-colors duration-300"
                        >
                            Apply Filters
                        </button>
                    </form>
                </div>
            </div>) :

            (<div className="hidden lg:block">
                <form onSubmit={handleFilterSubmit} className="flex flex-wrap justify-center gap-4 p-4">
                    <select
                        value={species}
                        onChange={e => setSpecies(e.target.value)}
                        className="border-2 w-[calc(25%-0.75rem)] text-secondary active:border-forth border-forth p-2 rounded-md"
                    >
                        <option value="">All Species</option>
                        <option value="Caine">Caine</option>
                        <option value="Pisica">Pisica</option>
                    </select>

                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="border-2 w-[calc(25%-0.75rem)] border-forth p-2 rounded-md"
                    >
                        <option value="">All Status</option>
                        <option value="Valabil">Available</option>
                        <option value="Adoptat">Adoptat</option>
                    </select>

                    <select
                        value={sex}
                        onChange={e => setSex(e.target.value)}
                        className="border-2 w-[calc(25%-0.75rem)] border-forth p-2 rounded-md"
                    >
                        <option value="">All Sex</option>
                        <option value="Femela">Femela</option>
                        <option value="Mascul">Mascul</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-secondary w-[calc(25%-0.75rem)] px-4 rounded-md text-white p-2 hover:bg-opacity-90 transition-colors duration-300"
                    >
                        Filter
                    </button>
                </form>
            </div>)



    );
};

export default MobileFilter;