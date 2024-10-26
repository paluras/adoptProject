import { ANIMAL_INFO_FIELDS } from "../constants/animalInfo";
import { MEDICAL_INFO_FIELDS } from "../constants/medicalInfo";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";

interface FormattedInfo {
    prefix: string;
    value: string | undefined;
}

export const formatAnimalInfo = (animal: Animal | null): FormattedInfo[] => {
    if (!animal) return [];

    return ANIMAL_INFO_FIELDS.map(field => ({
        prefix: field.prefix,
        value: typeof field.key === 'function'
            ? field.key(animal)
            : field.suffix
                ? `${animal[field.key]}${field.suffix}`
                : String(animal[field.key])
    }));
};

export const formatMedicalInfo = (medicalHistory: MedicalHistory | null): FormattedInfo[] => {
    if (!medicalHistory) return [];

    return MEDICAL_INFO_FIELDS.map(field => ({
        prefix: field.prefix,
        value: String(medicalHistory[field.key])
    }));
};