import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Animal } from '../models/AnimalSchema';
import Card from './CardComponent/CardComponent';
// import axios from 'axios';



const AnimalsList: React.FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            const response = await fetch('/api/animals');
            const data: Animal[] = await response.json();
            setAnimals(data);
        };
        fetchAnimals();
    }, []);

    const navigate = useNavigate();
    return (
        <div  >
            <h1 className='text-4xl text-center font-bold p-4'>Available Animals</h1>
            <div className='p-5 gap-4 flex flex-wrap justify-center '>
                {animals.length > 0 ? (
                    animals.map(animal => (
                        <Card key={animal.id}
                            id={animal.id}
                            title={animal.name}
                            description={animal.species}
                            imageUrl={`http://localhost:5000/uploads/${animal.image_url[0]}`}
                            buttonText={'Click'}
                            onButtonClick={() => navigate(`/${animal.id}`)} />
                    ))
                ) : (
                    <p>No animals available for adoption at this time.</p>
                )}
            </div>
        </div>
    );
};

export default AnimalsList;
