import { Router } from "express";

import redirectErr from '../Utils/redirectError.js'
import * as requestController from "../Controller/request.js";

const router = Router();

router
    .get('/', redirectErr(requestController.listOnHold))
    .post('/', redirectErr(requestController.sent))
    .put('/', redirectErr(requestController.action))
;

export default router;