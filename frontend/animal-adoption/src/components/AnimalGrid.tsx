import { useTranslation } from "react-i18next";

import { Animal } from "../models/AnimalSchema";
import Card from "./CardComponent/CardComponent";

// components/AnimalGrid.tsx
interface AnimalGridProps {
    animals: Animal[];
    onAnimalClick: (id: number) => void;
}

const AnimalGrid: React.FC<AnimalGridProps> = ({ animals, onAnimalClick }) => {

    const { t } = useTranslation();
    return (

        <div className="p-5 gap-4 flex flex-wrap justify-center">
            {animals.length > 0 ? (
                animals.map(animal => (
                    <Card
                        key={animal.id}
                        id={animal.id}
                        title={animal.name}
                        description={animal.species}
                        imageUrl={animal.image_url ? `${import.meta.env.VITE_API_URL}/uploads/${animal.image_url[0]}` : undefined}
                        onButtonClick={() => onAnimalClick(animal.id)}
                    />
                ))
            ) : (
                <p>  {t('animalGrid.noPets')} </p>
            )}
        </div>
    );
}

export default AnimalGrid;