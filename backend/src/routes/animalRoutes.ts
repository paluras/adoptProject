import { Router } from 'express';
import { AnimalController } from '../controllers/animalController';
import { verifyToken, verifyOwnership } from '../middleware/authMiddleware';
import { upload } from '../middleware/imgUpload';
import { createAnimalValidation, validateAnimal } from '../middleware/validateMiddleware';

const router = Router();
const animalController = new AnimalController()

// GET /api/animals
router.get('/', animalController.getAllAnimals);

//  POST /api/animals
router.post('/',
    verifyToken,
    upload,
    createAnimalValidation,
    validateAnimal,
    animalController.addAnimal);

// GET /api/animals/:id
router.get('/:id', animalController.getAnimalById,);

// UPDATE /api/animals/:id
router.put('/:id', verifyToken,
    verifyOwnership,
    upload,
    createAnimalValidation,
    validateAnimal,
    animalController.updateAnimal);

// DELETE /api/animals/:id
router.delete('/:id', verifyToken, verifyOwnership, animalController.deleteAnimalById,)

export default router;
