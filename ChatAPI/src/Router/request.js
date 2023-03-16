import { Router } from "express";

import redirectErr from '../Utils/redirectError.js'
import * as requestController from "../Controller/request.js";

const router = Router();

router
    .get('/', redirectErr(requestController.listOnHold))
;

export default router;