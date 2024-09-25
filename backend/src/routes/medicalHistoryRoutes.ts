import { Router } from 'express';
import {
    addMedicalHistory,
    getMedicalHistory,
    updateMedicalHistory,
} from '../controllers/medicalHistoryController';

const router = Router();
router.get('/:animalId', getMedicalHistory);
router.post('/', addMedicalHistory);                          // POST /api/medical-history
router.put('/:id', updateMedicalHistory)
export default router;
