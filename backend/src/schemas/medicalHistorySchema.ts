export interface MedicalHistorySchema {
    animal_id: number;
    created_at?: Date | undefined;
    dewormings: string;
    id: number | undefined;
    notes: string;
    treatments: string;
    vaccines: string;
}

export type MedicalHistoryInput = {
    animal_id: number;
    vaccines: string;
    dewormings: string;
    treatments: string;
    notes: string
}