import { Router } from 'express';
import { AnimalController } from '../controllers/animalController';
import { verifyToken, verifyOwnership } from '../middleware/authMiddleware';
import { upload } from '../middleware/imgUpload';

const router = Router();
const animalController = new AnimalController()

router.get('/', animalController.getAllAnimals);                                            // GET /api/animals
router.post('/', verifyToken, upload, animalController.addAnimal);                          // POST /api/animals
router.get('/:id', animalController.getAnimalById,);                                        // GET /api/animals/:id
router.put('/:id', verifyToken, verifyOwnership, upload, animalController.updateAnimal);    // UPDATE /api/animals/:id
router.delete('/:id', verifyToken, verifyOwnership, animalController.deleteAnimalById,)     // DELETE /api/animals/:id

export default router;
