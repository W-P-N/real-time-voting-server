import express from 'express';
import pollRouter from './routes/pollsRoute.js';

const app = express();

app.use('/api', express.json(), pollRouter);

export default app;
