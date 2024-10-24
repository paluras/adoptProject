import { Animal } from "../models/AnimalSchema";

interface InfoItem {
    prefix: string;
    key: keyof Animal | ((animal: Animal) => string);
    suffix?: string;
}

export const ANIMAL_INFO_FIELDS: InfoItem[] = [
    { prefix: "Specie", key: "species" },
    { prefix: "Rasa", key: "breed" },
    { prefix: "Sex", key: "sex" },
    {
        prefix: "Varsta",
        key: (animal: Animal) => animal.age === 1 ?
            `${animal.age} An` :
            `${animal.age} Ani`
    },
    { prefix: "Greutate", key: "weight", suffix: " Kg" },
    { prefix: "Oras", key: "city" },
    { prefix: "Tara", key: "country" },
    { prefix: "Status", key: "status" },
];