const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Apuntamos al servidor local donde corre tu app
const requester = supertest('http://localhost:8080');

describe('Testing del Router de Adopciones (Adoption Router)', () => {
    
    // Test 1: Obtener todas las adopciones
    it('El endpoint GET /api/adoptions debe devolver todas las adopciones', async () => {
        const response = await requester.get('/api/adoptions');
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status');
        expect(response.body.payload).to.be.an('array');
    });

    // Test 2: Error al buscar una adopción que no existe
    it('El endpoint GET /api/adoptions/:aid debe devolver 404 o error si la adopción no existe', async () => {
        const idInvalido = '609d2a3f9b1d8b3a4c8b4567'; // Un ID de Mongo falso
        const response = await requester.get(`/api/adoptions/${idInvalido}`);
        
        // Verifica que no traiga un status de éxito
        expect(response.status).to.not.equal(200); 
    });

    // Test 3: Crear adopción (validación de campos faltantes/errores)
    it('El endpoint POST /api/adoptions/:uid/:pid debe rechazar la creación si el usuario no existe', async () => {
        const fakeUserId = '609d2a3f9b1d8b3a4c8b4567';
        const fakePetId = '609d2a3f9b1d8b3a4c8b4568';
        
        const response = await requester.post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
        
        // Esperamos que falle porque los IDs son inventados
        expect(response.status).to.be.oneOf([400, 404, 500]);
    });
});