import app from "../../../src/app";
import  request from 'supertest';

describe('Health tests', () => {
    it('should perform a health check successfully', async () => {
        const response = await request(app).get('/api/healthy');
        expect(response.statusCode).toBe(200);
    })
})

