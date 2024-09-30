import express from 'express';
import { check } from 'express-validator';
import * as userAuthController from '../controllers/userController'

const router = express.Router();

router.post('/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ],
    userAuthController.registerUser
);

router.post('/login',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').exists()
    ],
    userAuthController.loginUser
);

export default router;
