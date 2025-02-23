// src/routes/index.ts
import express, { Request, Response } from 'express';
import { signup, login } from '../controllers/authController';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running!" });
  });
  

// Auth routes
router.post('/auth/signup', signup);

// Define login as a separate async function
const loginHandler = async (req: Request, res: Response): Promise<void> => {
  await login(req, res);
};

router.post('/auth/login', loginHandler);

// Task routes (requires authentication)
router.post('/tasks', authMiddleware, createTask);
router.get('/tasks', authMiddleware, getTasks);
router.put('/tasks/:id', authMiddleware, updateTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);

export default router;
