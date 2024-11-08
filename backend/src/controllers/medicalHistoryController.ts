import { NextFunction, Request, Response } from 'express';
import { MedicalHistoryModel } from '../models/medicalHistoryModel';
import { MedicalHistoryInput } from '../schemas/medicalHistorySchema';

type ControllerResponse = Response | void | NextFunction;

export class MedicalHistoryController {

    private readonly medicalHistoryModel: MedicalHistoryModel;

    constructor() {
        this.medicalHistoryModel = new MedicalHistoryModel();
    }
    private extractMedicalInput(body: MedicalHistoryInput): MedicalHistoryInput {
        return {
            animal_id: body.animal_id,
            vaccines: body.vaccines,
            dewormings: body.dewormings,
            treatments: body.treatments,
            notes: body.notes,
        };
    }

    addMedicalHistory = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> => {
        const medicalInput = this.extractMedicalInput(req.body)
        try {
            const medicalHistory = await this.medicalHistoryModel.addMedicalHistory(medicalInput);

            res.status(201).json({ message: "Successfuly added a medical history", body: medicalHistory });
        } catch (error) {
            next(error)
        }
    };

    updateMedicalHistory = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> => {
        const medicalInput = this.extractMedicalInput(req.body)

        try {
            const medicalHistory = await this.medicalHistoryModel.updateMedicalHistory(medicalInput);
            res.status(201).json({ message: "Successfuly updated a medical history", body: medicalHistory });
        } catch (error) {
            next(error)
        }
    };

    getMedicalHistory = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> => {
        const { animalId } = req.params;
        try {
            const medicalHistory = await this.medicalHistoryModel.getMedicalHistoryByAnimalId(parseInt(animalId, 10));
            if (!medicalHistory) {
                return res.status(404).json({ message: 'No medical history found for this animal' });
            }
            return res.json({ message: "Succesfuly fetched the medical data", body: medicalHistory });
        } catch (error) {
            return next(error)
        }
    };


}
