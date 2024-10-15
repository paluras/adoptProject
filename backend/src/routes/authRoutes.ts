import express from 'express';
import { check } from 'express-validator';
import { UserController } from '../controllers/userController'
import { verifyToken } from '../middleware/authMiddleware';
import { createUser, validateUser } from '../middleware/validateMiddleware';

const userController = new UserController();
const router = express.Router();

router.post('/register',
    createUser,
    validateUser,
    userController.registerUser
);

router.post('/login',

    userController.loginUser
);
router.post('/logout', userController.logoutUser);

router.get('/user', verifyToken, userController.getUser)

export default router;
