import { Request, Response } from "express";
import express from 'express';

const router = express.Router();

router.get('/healthy', (req: Request, res: Response) => {
    return res.status(200).send({status: 'OK Hey world!'});
});

export default router;