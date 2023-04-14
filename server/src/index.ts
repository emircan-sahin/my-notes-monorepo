import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.routes';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize mongoose connection
mongoose.connect(`${process.env.MONGO_URI}/my-notes?retryWrites=true&w=majority`);

// use routes here
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API is working' });
});

app.listen(port, () => {
    console.log(`[server] Started server at http://localhost:${port}`);
});