import express, { type Request, type Response } from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import expenseRoutes from './routes/expense.routes';

import { loggerMiddleware } from './middlewares/logger.middleware';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
	})
);

app.use(loggerMiddleware);

app.get('/health', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
