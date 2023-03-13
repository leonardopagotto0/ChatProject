import { Router } from 'express';
import rdError from '../Utils/redirectError.js'
import * as chatController from '../Controller/chat.js';
import * as messageController from '../Controller/message.js';

const router = Router();

router
    .get('/', rdError(chatController.index))
    .get('/msg', rdError(messageController.list))
    .delete('/msg/:msgID', rdError(messageController.del))
    .post('/grup', rdError(chatController.createGrup))
;

export default router;