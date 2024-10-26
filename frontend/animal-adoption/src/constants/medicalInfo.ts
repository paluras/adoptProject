import { MedicalHistory } from "../models/MedicalHistorySchema";

interface MedicalInfoItem {
    prefix: string;
    key: keyof MedicalHistory;
}

export const MEDICAL_INFO_FIELDS: MedicalInfoItem[] = [
    { prefix: "Vaccinuri", key: "vaccines" },
    { prefix: "Note", key: "notes" },
    { prefix: "Deparazitare", key: "dewormings" },
    { prefix: "Tratamente", key: "treatments" },
];