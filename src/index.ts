import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import userRoute from './routes/user.route';
import profileRoute from './routes/profile.route';
import authRoute from './routes/authRoutes';
import productRoute from './routes/product.route';
import cartRoute from './routes/cart.route';
import connectDB from './config/db';
import { sessionMiddleware } from './config/session';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

app.use('/', userRoute);
app.use('/', profileRoute);
app.use('/', authRoute);
app.use('/', productRoute);
app.use('/', cartRoute);

connectDB();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});