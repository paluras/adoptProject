import pool from '../db';
import { MedicalHistoryInput } from '../schemas/medicalHistorySchema';

export class MedicalHistoryModel {

    addMedicalHistory = async (input: MedicalHistoryInput) => {
        const result = await pool.query(
            'INSERT INTO medical_history (animal_id, vaccines, dewormings, treatments, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [input.animal_id, input.vaccines, input.dewormings, input.treatments, input.notes]
        );
        return result.rows[0];
    };

    updateMedicalHistory = async (input: MedicalHistoryInput) => {
        const result = await pool.query(
            `UPDATE medical_history SET vaccines = $1, dewormings = $2, treatments = $3, notes = $4 WHERE animal_id = $5 RETURNING *`,
            [input.vaccines, input.dewormings, input.treatments, input.notes, input.animal_id]
        )
        return result.rows[0]
    }

    getMedicalHistoryByAnimalId = async (animalId: number) => {
        const medicalHistoryResult = await pool.query('SELECT * FROM medical_history WHERE animal_id = $1', [animalId]);
        const medicalHistory = medicalHistoryResult.rows[0];
        if (!medicalHistory) {
            return null
        }
        return medicalHistory;

    };
}
