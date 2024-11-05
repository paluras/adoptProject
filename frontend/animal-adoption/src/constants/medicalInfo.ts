import { MedicalHistory } from "../models/MedicalHistorySchema";

interface MedicalInfoItem {
    translationKey: string;
    key: keyof MedicalHistory;
}

export const MEDICAL_INFO_FIELDS: MedicalInfoItem[] = [
    { translationKey: "formMedical.vaccines", key: "vaccines" },
    { translationKey: "formMedical.notes", key: "notes" },
    { translationKey: "formMedical.dewormings", key: "dewormings" },
    { translationKey: "formMedical.treatments", key: "treatments" }
];