import useFetch from "./useFetch";
import { Animal } from "../models/AnimalSchema";
import { MedicalHistory } from "../models/MedicalHistorySchema";
import { formatAnimalInfo, formatMedicalInfo } from "../utils/formatInfoData";

interface FormattedInfo {
    prefix: string;
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

    return {
        animal,
        medicalHistory,
        loading: animalLoading || medicalHistoryLoading,
        error: !!animalError || !!medicalHistoryError,
        infoData: formatAnimalInfo(animal),
        medicalInfoData: formatMedicalInfo(medicalHistory)
    };
};

export default useAnimalDetails;