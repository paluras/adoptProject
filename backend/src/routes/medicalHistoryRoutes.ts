import { Router } from 'express';
import { MedicalHistoryController } from '../controllers/medicalHistoryController';
import { verifyOwnership, verifyToken } from '../middleware/authMiddleware';


const medicalController = new MedicalHistoryController();

const router = Router();
router.get('/:animalId', medicalController.getMedicalHistory);
router.post('/', verifyToken, medicalController.addMedicalHistory);                          // POST /api/medical-history
router.put('/:id', verifyToken, verifyOwnership, medicalController.updateMedicalHistory)
export default router;
