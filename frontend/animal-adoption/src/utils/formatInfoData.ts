/* eslint-disable complexity */
import { TFunction } from "i18next";

import { ANIMAL_INFO_FIELDS } from "../constants/animalInfo";
import { MEDICAL_INFO_FIELDS } from "../constants/medicalInfo";
import { SEX_MAPPING, SPECIES_MAPPING, STATUS_MAPPING } from "../constants/speciesMapping";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";

interface FormattedInfo {
    translationKey: string;
    value: string | undefined;
}

export const formatAnimalInfo = (
    animal: Animal | null,
    t: TFunction
): FormattedInfo[] => {
    if (!animal) return [];

    return ANIMAL_INFO_FIELDS.map(field => {
        let value: string;

        if (field.translationKey === 'animalInfo.age') {
            const form = animal.age > 1 ? t('animalInfo.ageForm.other') : t('animalInfo.ageForm.one');
            value = `${animal.age} ${form}`;
        } else if (field.translationKey === 'animalInfo.species') {

            const speciesKey = SPECIES_MAPPING[animal.species] || 'species.unknown';
            value = t(speciesKey);

        }
        else if (field.translationKey === 'animalInfo.sex') {

            const sexKey = SEX_MAPPING[animal.sex] || 'sex.unknown';
            value = t(sexKey);

        }
        else if (field.translationKey === 'animalInfo.status') {

            const statusKey = STATUS_MAPPING[animal.status] || 'status.unknown';
            value = t(statusKey);

        } else {
            value = typeof field.key === 'function'
                ? field.key(animal, t)
                : field.suffix
                    ? `${animal[field.key]}${t(field.suffix)}`
                    : String(animal[field.key]);
        }

        return {
            translationKey: field.translationKey,
            value
        };
    });
};

export const formatMedicalInfo = (
    medicalHistory: MedicalHistory | null,

): FormattedInfo[] => {
    if (!medicalHistory) return [];

    return MEDICAL_INFO_FIELDS.map(field => ({
        translationKey: field.translationKey,
        value: String(medicalHistory[field.key])
    }));
};