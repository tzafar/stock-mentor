import express, { Request, Response } from 'express';
import {User} from './user';
import { list } from './service';
import { cacheMiddleware } from '../cache';

const router = express.Router();

router.post('/users', (req: Request, res: Response) => {
    const user: Omit<User, 'id'> = req.body;
    res.status(201).send(user);
})

router.put('/users', (req: Request, res: Response) => {
    const user: User = req.body;
    res.status(200).send(user)
})

router.get('/users', cacheMiddleware, async (req: Request, res: Response) => {
    const users = await list();
    res.status(200).send(users);
})

export default router;