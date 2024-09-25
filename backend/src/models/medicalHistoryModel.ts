import pool from '../db';

export const addMedicalHistory = async (id: number, vaccines: string, dewormings: string, treatments: string, notes: string) => {
    const result = await pool.query(
        'INSERT INTO medical_history (animal_id, vaccines, dewormings, treatments, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, vaccines, dewormings, treatments, notes]
    );
    return result.rows[0];
};


export const updateMedicalHistory = async (id: number, vaccines: string, dewormings: string, treatments: string, notes: string) => {
    const result = await pool.query(
        `UPDATE medical_history SET vaccines = $1, dewormings = $2, treatments = $3, notes = $4 WHERE animal_id = $5 RETURNING *`,
        [vaccines, dewormings, treatments, notes, id]
    )
    return result.rows[0]
}

export const getMedicalHistoryByAnimalId = async (animalId: number) => {
    // First, fetch the medical history
    const medicalHistoryResult = await pool.query('SELECT * FROM medical_history WHERE animal_id = $1', [animalId]);
    const medicalHistory = medicalHistoryResult.rows[0];
    if (!medicalHistory) {
        return null;
    }
    return medicalHistory;

};










export const addVaccine = async (medicalHistoryId: number, vaccineName: string, dateAdministered: Date, notes: string) => {
    const result = await pool.query(
        'INSERT INTO vaccines (medical_history_id, vaccine_name, date_administered, notes) VALUES ($1, $2, $3, $4) RETURNING *',
        [medicalHistoryId, vaccineName, dateAdministered, notes]
    );
    return result.rows[0];
};

export const getVaccinesByMedicalHistoryId = async (medicalHistoryId: number) => {
    const result = await pool.query('SELECT * FROM vaccines WHERE medical_history_id = $1', [medicalHistoryId]);
    return result.rows;
};

export const getVaccinesById = async (vaccineId: number) => {
    const result = await pool.query('SELECT * FROM vaccines WHERE id = $1', [vaccineId]);
    return result.rows;
}