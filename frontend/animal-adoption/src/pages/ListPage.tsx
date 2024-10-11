import React, { ReactNode, useState } from "react";
import { Animal } from "../models/AnimalSchema";
import { useNavigate } from "react-router";
import Card from "../components/CardComponent/CardComponent";
import useFetch from "../hooks/useFetch";

interface ListPageProps {
    children: ReactNode
}

const ListPage: React.FC<ListPageProps> = ({ children }) => {
    const [species, setSpecies] = useState<string>('');
    const [status, setStatus] = useState<string>('Valabil');
    const [sex, setSex] = useState<string>('')

    const query = new URLSearchParams();
    if (species) query.append('species', species);
    if (status) query.append('status', status);
    if (sex) query.append('sex', sex)

    const { data: animals,
        loading: loadingAnimals,
        error: errorsAnimals } = useFetch<Animal[]>(`/api/animals?${query.toString()}`);
    const navigate = useNavigate();

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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

            {/* create a filter component  */}

            <form onSubmit={handleFilterSubmit} className="flex flex-wrap justify-center gap-4 p-4">
                <select
                    value={species}
                    onChange={e => setSpecies(e.target.value)}
                    className="border-2 w-1/6  text-secondary active:border-forth  border-forth p-2 rounded-md "
                >
                    <option value="">All</option>
                    <option value="Caine">Caine</option>
                    <option value="Pisica">Pisica</option>
                </select>

                {/* <input
                    type="number"
                    placeholder="Max Age"
                    value={ageMax}
                    onChange={e => setAgeMax(e.target.value)}
                    className="border-2 w-1/6  border-forth p-2 rounded-md"
                /> */}

                <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="border-2  w-1/6  border-forth p-2 rounded-md"
                >
                    <option value="">All</option>
                    <option value="Valabil">Available</option>
                    <option value="Adoptat">Adopted</option>
                </select>
                <select
                    value={sex}
                    onChange={e => setSex(e.target.value)}
                    className="border-2 w-1/6   border-forth p-2 rounded-md"
                >
                    <option value="">Sex</option>
                    <option value="Femela">Femela</option>
                    <option value="Mascul">Mascul</option>
                </select>
                <button type="submit" className="bg-secondary px-4 rounded-md text-white p-2">Filter</button>
            </form>

            <div className="p-5 gap-4 flex flex-wrap justify-center">
                {animals.length > 0 && !errorsAnimals ? (
                    animals.map(animal => (
                        <Card
                            key={animal.id}
                            id={animal.id}
                            title={animal.name}
                            description={animal.species}
                            imageUrl={animal.image_url ? `http://localhost:5000/uploads/${animal.image_url[0]}` : undefined}
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
