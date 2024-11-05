// src/components/Filter.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useWindowSize from '../hooks/useWindowSize';
import AutoCompleteSelect from './FormComponents/AutoCompleteSelect';
import { countriesSet, countryMap } from '../utils/locationData';

interface Selection {
    value: string;
    key: string;
}

interface SelectFormProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selections: Selection[];
    placeHolder: string;
    disabled?: boolean;
    labelName?: string;
}


const SelectFormElement: React.FC<SelectFormProps> = ({ name, value, onChange, selections }) => {
    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {name}
            </label>
            <select title='species'
                name='species'
                value={value}
                onChange={onChange}
                className="border-2 w-full  text-secondary active:border-forth border-forth p-2 rounded-md"
            >
                {selections.map((selection, index) => (
                    <option key={index} value={selection.key}>{selection.value}</option>
                ))}

            </select>
        </div>
    )
}

interface FilterProps {
    species: string;
    setSpecies: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    sex: string;
    setSex: (value: string) => void;
    country: string;
    setCountry: (value: string) => void;
    city: string;
    setCity: (value: string) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleFilterSubmit: (e: React.FormEvent) => void;
}

const Filter: React.FC<FilterProps> = ({
    species,
    setSpecies,
    status,
    setStatus,
    sex,
    setSex,
    country,
    setCountry,
    city,
    setCity,
    isFilterOpen,
    setIsFilterOpen,
    handleFilterSubmit,
}) => {
    const { width } = useWindowSize();
    const { t } = useTranslation();
    const [availableCities, setAvailableCities] = useState<string[]>([]);
    const [countryError, setCountryError] = useState<string | null>(null);

    const handleCountryChange = (value: string): void => {
        const isValidCountry = countriesSet.has(value);
        setCountry(value);
        setCity('');
        setCountryError(isValidCountry ? null : 'Invalid country selected.');
        const citiesForCountry = isValidCountry ? countryMap.get(value) || [] : [];
        setAvailableCities(citiesForCountry);
    };

    const handleCityChange = (value: string): void => {
        setCity(value);
    };

    return (
        <>
            {width >= 1024 ? (
                // Desktop Filter
                <div className="hidden lg:block">
                    <form onSubmit={handleFilterSubmit} className="flex items-end  flex-wrap justify-center gap-4 p-4">
                        <SelectFormElement
                            name={t('filter.species')}
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            selections={[{ key: '', value: t('species.all') }, { key: 'Caine', value: t('species.dog') }, { key: 'Pisica', value: t('species.cat') }]}
                            placeHolder="All Species"
                        />
                        <SelectFormElement
                            name='Status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            selections={[{ key: '', value: t('status.all') }, { key: "Valabil", value: t('status.available') }, { key: 'Adoptat', value: t('status.adopted') }]}
                            placeHolder='All Status'
                        />

                        <AutoCompleteSelect
                            options={Array.from(countriesSet)}
                            value={country}
                            onChange={handleCountryChange}
                            placeholder={t('filter.selectCountry')}
                            label={t('filter.country')}
                        />

                        {countryError && (
                            <span className="text-red-500">{countryError}</span>
                        )}

                        {country && !countryError && (
                            <AutoCompleteSelect
                                options={availableCities}
                                value={city}
                                onChange={handleCityChange}
                                placeholder={t('filter.selectCity')}
                                label={t('filter.city')}
                            />
                        )}
                        <SelectFormElement
                            name='Sex'
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            selections={[{ key: "", value: t('filter.selectSex') }, { key: "Femela", value: t('sex.female') }, { key: "Mascul", value: t('sex.male') }]}
                            placeHolder='Select a sex'
                        />

                        <button
                            type="submit"
                            className="bg-secondary border-2 border-secondary  px-8 rounded-md h-[45px] text-white p-2 hover:bg-opacity-90 transition-colors duration-300"
                        >
                            {t('filter.filter')}
                        </button>
                    </form>
                </div>
            ) : (
                // Mobile Filter
                <div
                    className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transform ${isFilterOpen ? 'translate-y-0' : 'translate-y-full'
                        } transition-transform duration-300 ease-in-out`}
                >
                    <div className="bg-white rounded-t-3xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="text-gray-500">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleFilterSubmit} className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Specie</label>
                            <select
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                className="w-full border-2 text-secondary active:border-forth border-forth p-2 rounded-md"
                            >
                                <option value="">{t('species.all')}</option>
                                <option value="Caine">{t('species.dog')}</option>
                                <option value="Pisica">{t('species.cat')}</option>
                            </select>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border-2 border-forth p-2 rounded-md"
                            >
                                <option value="">{t('status.all')}</option>
                                <option value="Valabil">{t('status.available')}</option>
                                <option value="Adoptat">{t('status.adopted')}</option>
                            </select>

                            <AutoCompleteSelect
                                options={Array.from(countriesSet)}
                                value={country}
                                onChange={handleCountryChange}
                                placeholder={t('filter.selectCountry')}
                                label={t('filter.country')}
                            />

                            {countryError && (
                                <span className="text-red-500">{countryError}</span>
                            )}

                            {country && !countryError && (
                                <AutoCompleteSelect
                                    options={availableCities}
                                    value={city}
                                    onChange={handleCityChange}
                                    placeholder={t('filter.selectCity')}
                                    label={t('filter.city')}
                                />
                            )}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sexul</label>
                            <select
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                className="w-full border-2 border-forth p-2 rounded-md"
                            >
                                <option value="">{t('sex.all')}</option>
                                <option value="Femela">{t('sex.female')}</option>
                                <option value="Mascul">{t('sex.male')}</option>
                            </select>

                            <button
                                type="submit"
                            >
                                {t('filter.filter')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Filter;