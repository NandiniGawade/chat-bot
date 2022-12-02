import request from 'supertest';
import { app, runningServer } from '../server';

afterAll(async () => {
    runningServer.close();
});

describe("Register user to chat-bot", () => {
    
    
    it("Register user with name and email", async() => {
       
        const res:any = await request(app)
        .post('/api/challenge-register')
        .send({
            name:"Test",
            email:"test@gmail.com"
        });
        expect(res.status).toBe(200);
        expect(res.body.message).not.toBe('');
        expect(res.body.chatHistory.length).toBeGreaterThan(0);
    }, 50000);

    it("should pass user name", async() => {
       
        const res:any = await request(app)
        .post('/api/challenge-register')
        .send({
            email:"test@gmail.com"
        });
        expect(res.body[0]).toBe('Name is required');
    });

    it("should pass email", async() => {
       
        const res:any = await request(app)
        .post('/api/challenge-register')
        .send({
            name:"test@gmail.com"
        });
        expect(res.body[0]).toBe('Email is required');
    });
});