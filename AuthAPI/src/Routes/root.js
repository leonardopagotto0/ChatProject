import { Router } from 'express';

import loginController from '../Controller/login.js';
import singupController from '../Controller/singup.js';

const router = Router();

router
    .get('/pubkey', (req, res, next) => res.status(200).json({key: process.env.PEM_PUBLIC_KEY}))
    .post('/login', loginController)
    .post('/singup', singupController)
;

export default router;