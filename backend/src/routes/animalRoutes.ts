import { Router } from 'express';
import { getAllAnimals, getAnimalById, updateAnimal, addAnimal } from '../controllers/animalController';
import { upload } from '../middleware/imgUpload';

const router = Router();

router.get('/', getAllAnimals);              // GET /api/animals
router.post('/', addAnimal);                  // POST /api/animals
router.get('/:id', getAnimalById);            // GET /api/animals/:id
router.put('/:id', updateAnimal);

export default router;
