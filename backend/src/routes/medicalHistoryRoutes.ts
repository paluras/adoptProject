import { Router } from 'express';
import { MedicalHistoryController } from '../controllers/medicalHistoryController';
import { verifyOwnership, verifyToken } from '../middleware/authMiddleware';
import { createMedicalHistoryValidation, validateAnimal } from '../middleware/validateMiddleware';


const medicalController = new MedicalHistoryController();

const router = Router();
router.get('/:animalId', medicalController.getMedicalHistory);
router.post('/', verifyToken, createMedicalHistoryValidation, validateAnimal, medicalController.addMedicalHistory);                          // POST /api/medical-history
router.put('/:id', verifyToken, verifyOwnership, createMedicalHistoryValidation, validateAnimal, medicalController.updateMedicalHistory)
export default router;
