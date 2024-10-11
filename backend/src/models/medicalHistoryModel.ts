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
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const checkResult = await client.query(
                'SELECT * FROM medical_history WHERE animal_id = $1',
                [input.animal_id]
            );

            let result;
            if (checkResult.rows.length === 0) {
                result = await client.query(
                    `INSERT INTO medical_history (animal_id, vaccines, dewormings, treatments, notes)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *`,
                    [input.animal_id, input.vaccines, input.dewormings, input.treatments, input.notes]
                );
            } else {
                result = await client.query(
                    `UPDATE medical_history
                    SET vaccines = $2, dewormings = $3, treatments = $4, notes = $5
                    WHERE animal_id = $1
                    RETURNING *`,
                    [input.animal_id, input.vaccines, input.dewormings, input.treatments, input.notes]
                );
            }

            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
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
