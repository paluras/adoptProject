import { Router } from 'express';
import { getAllAnimals, getAnimalById, updateAnimal, addAnimal, deleteAnimalById } from '../controllers/animalController';
import { verifyToken, verifyOwnership } from '../middleware/authMiddleware';


const router = Router();

router.get('/', getAllAnimals);              // GET /api/animals
router.post('/', verifyToken, addAnimal);    // POST /api/animals
router.get('/:id', getAnimalById);            // GET /api/animals/:id
router.put('/:id', verifyToken, verifyOwnership, updateAnimal);
router.delete('/:id', verifyToken, verifyOwnership, deleteAnimalById,)



export default router;
