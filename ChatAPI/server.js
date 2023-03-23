import express from 'express';
import { expressjwt } from 'express-jwt';
import getPubkey from './src/Utils/getPubkey.js';
import dotenv from 'dotenv/config';
import {expressJwtSecret} from 'jwks-rsa';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({origin: '*'}));

app.get('/', healthStatus);

app.use(expressjwt({
    secret: expressJwtSecret({
        jwksUri: `${process.env.AUTH_SERVICE_URL}/auth/pubkey`,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5
    }),
    algorithms: ['RS256'],
}));

import routes from './src/Router/root.js'; 
import healthStatus from './src/Middleware/healthStatus.js';
import errorHandler from './src/Middleware/errorHandler.js';

app.use('/api/', routes);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`API listhing on port ${process.env.SERVER_PORT}`);
});