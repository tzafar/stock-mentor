import { Response, response } from "express";
import app from "../../../src/app";
import request from 'supertest';

describe('Users tests', () => {
    it('should be able to save user', async () => {
        const resposne = await request(app).post('/api/users').send({username: 'toseef'});
        expect(resposne.statusCode).toBe(201);
        expect(resposne.body).toEqual({username: 'toseef'})
    })
})