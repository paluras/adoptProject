import { Request, Response } from 'express';
import { MedicalHistoryModel } from '../models/medicalHistoryModel';
import { MedicalHistoryInput } from '../schemas/medicalHistorySchema';

export class MedicalHistoryController {

    private medicalHistoryModel: MedicalHistoryModel;

    constructor() {
        this.medicalHistoryModel = new MedicalHistoryModel();
    }
    private extractMedicalInput(body: any): MedicalHistoryInput {
        return {
            animal_id: body.animal_id,
            vaccines: body.vaccines,
            dewormings: body.dewormings,
            treatments: body.treatments,
            notes: body.notes,
        };
    }

    addMedicalHistory = async (req: Request, res: Response) => {
        const medicalInput = this.extractMedicalInput(req.body)
        try {
            const medicalHistory = await this.medicalHistoryModel.addMedicalHistory(medicalInput);
            res.status(201).json(medicalHistory);
        } catch (error) {
            res.status(500).json({ message: 'Error adding medical history', error });
        }
    };

    updateMedicalHistory = async (req: Request, res: Response) => {
        const medicalInput = this.extractMedicalInput(req.body)

        try {
            const medicalHistory = await this.medicalHistoryModel.updateMedicalHistory(
                medicalInput
            );

            res.status(201).json(medicalHistory);
        } catch (error) {
            console.error('Error updating medical history in the database:', error);
            res.status(500).json({ message: 'Error updating medical history', error });
        }
    };

    getMedicalHistory = async (req: Request, res: Response) => {
        const { animalId } = req.params;
        try {
            const medicalHistory = await this.medicalHistoryModel.getMedicalHistoryByAnimalId(parseInt(animalId, 10));
            if (medicalHistory.length === 0) {
                return res.status(404).json({ message: 'No medical history found for this animal' });
            }
            res.json({ message: "Succesfuly fetched the medical data", body: medicalHistory });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching medical history', error });
        }
    };


}
