import { TFunction } from "i18next";

import { Animal } from "../models/AnimalSchema";


interface InfoItem {
    translationKey: string;
    key: keyof Animal | ((animal: Animal, t: TFunction) => string);
    suffix?: string;
}

export const ANIMAL_INFO_FIELDS: InfoItem[] = [
    { translationKey: "animalInfo.species", key: "species" },
    { translationKey: "animalInfo.breed", key: "breed" },
    { translationKey: "animalInfo.sex", key: "sex" },
    { translationKey: "animalInfo.age", key: "age" },
    { translationKey: "animalInfo.weight", key: "weight", suffix: "animalInfo.weightUnit" },
    { translationKey: "animalInfo.city", key: "city" },
    { translationKey: "animalInfo.country", key: "country" },
    { translationKey: "animalInfo.status", key: "status" }
];