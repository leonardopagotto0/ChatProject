import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import {privateKey, publicKey} from './src/Utils/defineKey.js';

import routes from './src/Routes/root.js';
import healthStatus from './src/Middleware/healthStatus.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/', healthStatus)
app.use('/auth', routes);

app.listen(process.env.SERVER_PORT, async () => {
    console.log(`Auth server listing at port ${process.env.SERVER_PORT}`);
    publicKey();
    privateKey();
});