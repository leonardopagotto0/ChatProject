import { Router } from 'express';

import chatRoutes from './chat.js';
import requestRoutes from './request.js';

const router = Router();

router
    .use('/auth/login', (req, res, next)=> {
        console.log(req.body);
        res.status(200).json({sessionID: 12});
    })
    .use('/chat', chatRoutes)
    .use('/request', requestRoutes)
;

export default router;