import { Request, Response } from 'express';
import * as medicalHistoryModel from '../models/medicalHistoryModel';

export const addMedicalHistory = async (req: Request, res: Response) => {
    const { id, vaccines, dewormings, treatments, notes } = req.body;

    try {
        const medicalHistory = await medicalHistoryModel.addMedicalHistory(id, vaccines, dewormings, treatments, notes);
        res.status(201).json(medicalHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error adding medical history', error });
    }
};

export const updateMedicalHistory = async (req: Request, res: Response) => {
    const { id } = req.params; // Get the id from params
    const { vaccines, dewormings, treatments, notes } = req.body; // Use 'notes' instead of 'note'

    try {
        const medicalHistory = await medicalHistoryModel.updateMedicalHistory(
            parseInt(id, 10), // Ensure id is parsed correctly
            vaccines,
            dewormings,
            treatments,
            notes
        );

        console.log('Updated medical history:', { id, vaccines, dewormings, treatments, notes });
        res.status(201).json(medicalHistory);
    } catch (error) {
        console.error('Error updating medical history in the database:', error);
        res.status(500).json({ message: 'Error updating medical history', error });
    }
};

export const getMedicalHistory = async (req: Request, res: Response) => {
    const { animalId } = req.params;
    try {
        const medicalHistory = await medicalHistoryModel.getMedicalHistoryByAnimalId(parseInt(animalId, 10));
        if (medicalHistory.length === 0) {
            return res.status(404).json({ message: 'No medical history found for this animal' });
        }
        res.json(medicalHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medical history', error });
    }
};
