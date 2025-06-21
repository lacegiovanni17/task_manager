import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import rootRouter from './modules/root.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { globalRateLimiter } from './config/ratelimit';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalRateLimiter); // Applies to all routes

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/task_manager';
connectDB(MONGO_URI)

app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API");
})

app.use('/api/v1', rootRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorMiddleware(err, req, res, next);
});

const PORT = process.env.PORT || 4404;
app.listen(PORT, () => {
    console.log(`Server is dancing on port http://localhost:${PORT}`);
});
