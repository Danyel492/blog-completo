import request from 'supertest';
import server from '../../app.js'; 
import { closeDB } from '../../configs/database.js';

describe('PostController', () => {
    let postId;

    beforeAll(async () => {
        // Cria um post para os testes
        const response = await request(server)
            .post('/post/create')
            .send({
                title: 'Test Post',
                content: 'This is a test post',
                author: 'testuser',
                is_active: true
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('post');
        postId = response.body.post._id;
    });

    afterAll(async () => {
        // Deleta o post criado para os testes
        await request(server).delete(`/post/delete/${postId}`);
        server.close(); // Fecha o servidor após os testes
        await closeDB(); // Fecha a conexão do banco de dados após os testes
    });

    test('should create a post', async () => {
        const response = await request(server)
            .post('/post/create')
            .send({
                title: 'Another Test Post',
                content: 'This is another test post',
                author: 'testuser',
                is_active: true
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('post');
        expect(response.body.post.title).toBe('Another Test Post');
    });

    test('should get all posts', async () => {
        const response = await request(server).get('/post/all');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get active posts', async () => {
        const response = await request(server).get('/post/active');
        expect(response.status).toBe(200);
        expect(response.body.every(post => post.is_active)).toBe(true);
    });

    test('should get post by id', async () => {
        const response = await request(server).get(`/post/id/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(postId);
    });

    test('should update post is_active status', async () => {
        const response = await request(server)
            .patch(`/post/is_active/${postId}`)
            .send({ is_active: false });
        expect(response.status).toBe(200);
        expect(response.body.post.is_active).toBe(false);
    });
});