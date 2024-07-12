import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/books', (req: Request, res: Response) => {
  throw new Error('This is the error');
});

export default router;
