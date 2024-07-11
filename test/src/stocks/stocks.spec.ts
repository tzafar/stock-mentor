import request from 'supertest';
import app from '../../../src/app';

describe('Stocks Test', () => {
    it('should be able to retrive stocks', async () => {
        const resposne = await request(app).get('/stocks?ticker=ABNB');
        expect(resposne.statusCode).toBe(200);
    })
})