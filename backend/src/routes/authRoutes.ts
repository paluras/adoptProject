import express from 'express';
import { check } from 'express-validator';
import { UserController } from '../controllers/userController'
import { verifyToken } from '../middleware/authMiddleware';

const userController = new UserController();
const router = express.Router();

router.post('/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ],
    userController.registerUser
);

router.post('/login',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').exists()
    ],
    userController.loginUser
);
router.post('/logout', userController.logoutUser);

router.get('/user', verifyToken, userController.getUser)

export default router;
