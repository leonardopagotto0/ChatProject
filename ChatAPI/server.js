import express from 'express';
import { expressjwt } from 'express-jwt';
import getPubkey from './src/Utils/getPubkey.js';
import dotenv from 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({origin: '*'}));

app.use(expressjwt({
    secret: await getPubkey(),
    algorithms: ['RS256'],
}));

import routes from './src/Router/root.js'; 
import errorHandler from './src/Middleware/errorHandler.js';

app.use('/api/', routes);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`API listhing on port ${process.env.SERVER_PORT}`);
});