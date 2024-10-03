import { Router } from 'express';
import {
    addMedicalHistory,
    getMedicalHistory,
    updateMedicalHistory,
} from '../controllers/medicalHistoryController';
import { verifyOwnership, verifyToken } from '../middleware/authMiddleware';

const router = Router();
router.get('/:animalId', getMedicalHistory);
router.post('/', verifyToken, addMedicalHistory);                          // POST /api/medical-history
router.put('/:id', verifyToken, verifyOwnership, updateMedicalHistory)
export default router;
