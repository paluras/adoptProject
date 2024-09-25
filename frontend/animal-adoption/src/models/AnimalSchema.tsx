import { MedicalHistory } from "./MedicalHistorySchema";

export interface Animal {
    id: number;
    name: string;
    species: string;
    age: number;
    breed: string;
    status: string;
    image_url: string;
    medicalRecords: MedicalHistory
}