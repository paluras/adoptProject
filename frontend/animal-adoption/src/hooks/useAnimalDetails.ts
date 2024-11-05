import { useTranslation } from "react-i18next";

import useFetch from "./useFetch";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";
import { formatAnimalInfo, formatMedicalInfo } from "../utils/formatInfoData";

interface FormattedInfo {
    translationKey: string;  // Changed from prefix to translationKey
    value: string | undefined;
}

interface UseAnimalDetailsReturn {
    animal: Animal | null;
    medicalHistory: MedicalHistory | null;
    loading: boolean;
    error: boolean;
    infoData: FormattedInfo[];
    medicalInfoData: FormattedInfo[];
}

const useAnimalDetails = (id: string): UseAnimalDetailsReturn => {
    const { t } = useTranslation();


    const {
        data: animal,
        loading: animalLoading,
        error: animalError
    } = useFetch<Animal>(`${import.meta.env.VITE_API_URL}/api/animals/${id}`);

    const {
        data: medicalHistory,
        loading: medicalHistoryLoading,
        error: medicalHistoryError
    } = useFetch<MedicalHistory>(`${import.meta.env.VITE_API_URL}/api/medical-history/${id}`);

    console.log(animal);


    return {
        animal,
        medicalHistory,
        loading: animalLoading || medicalHistoryLoading,
        error: !!animalError || !!medicalHistoryError,
        infoData: formatAnimalInfo(animal, t),
        medicalInfoData: formatMedicalInfo(medicalHistory)
    };
};

export default useAnimalDetails;