const { expect } = require('chai');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../src/app');
const userModel = require('../src/models/user.model');
const petModel = require('../src/models/pet.model');
const adoptionModel = require('../src/models/adoption.model');

const requester = supertest(app);

describe('Testing funcional del Router de Adopciones (/api/adoptions)', function () {
    this.timeout(15000);

    let mongoServer;
    let testUser;
    let testPet;
    let createdAdoptionId;

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        await mongoose.connect(uri);

        testUser = await userModel.create({
            first_name: 'Mateo',
            last_name: 'Test',
            email: 'mateo.test@example.com',
            age: 25,
            password: 'hashedpassword123',
            role: 'user'
        });

        testPet = await petModel.create({
            name: 'Firulais',
            specie: 'Perro',
            birthDate: new Date('2022-05-10')
        });
    });

    after(async () => {
        await adoptionModel.deleteMany({});
        await userModel.deleteMany({});
        await petModel.deleteMany({});
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('1. GET /api/adoptions debe devolver 200 y un array vacío inicialmente', async () => {
        const { statusCode, body } = await requester.get('/api/adoptions');

        expect(statusCode).to.equal(200);
        expect(body.status).to.equal('success');
        expect(body.payload).to.be.an('array').that.is.empty;
    });

    it('2. POST /api/adoptions/:uid/:pid debe crear una adopción real, devolver 201 y marcar la mascota como adoptada', async () => {
        const { statusCode, body } = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`);

        expect(statusCode).to.equal(201);
        expect(body.status).to.equal('success');
        expect(body.payload).to.have.property('_id');
        expect(body.payload.owner).to.equal(testUser._id.toString());
        expect(body.payload.pet).to.equal(testPet._id.toString());

        const updatedPet = await petModel.findById(testPet._id);
        expect(updatedPet.adopted).to.equal(true);
        expect(updatedPet.owner.toString()).to.equal(testUser._id.toString());

        createdAdoptionId = body.payload._id;
    });

    it('3. POST /api/adoptions/:uid/:pid debe devolver 400 si la mascota ya fue adoptada', async () => {
        const { statusCode, body } = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`);

        expect(statusCode).to.equal(400);
        expect(body.status).to.equal('error');
        expect(body.message).to.equal('La mascota ya fue adoptada');
    });

    it('4. GET /api/adoptions debe devolver 200 y un array con la adopción creada', async () => {
        const { statusCode, body } = await requester.get('/api/adoptions');

        expect(statusCode).to.equal(200);
        expect(body.status).to.equal('success');
        expect(body.payload).to.be.an('array').with.lengthOf(1);
        expect(body.payload[0]._id).to.equal(createdAdoptionId);
    });

    it('5. GET /api/adoptions/:aid debe devolver 200 y la adopción específica por ID', async () => {
        const { statusCode, body } = await requester.get(`/api/adoptions/${createdAdoptionId}`);

        expect(statusCode).to.equal(200);
        expect(body.status).to.equal('success');
        expect(body.payload._id).to.equal(createdAdoptionId);
        expect(body.payload.owner).to.equal(testUser._id.toString());
        expect(body.payload.pet).to.equal(testPet._id.toString());
    });

    it('6. GET /api/adoptions/:aid debe devolver 404 si la adopción no existe', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const { statusCode, body } = await requester.get(`/api/adoptions/${fakeId}`);

        expect(statusCode).to.equal(404);
        expect(body.status).to.equal('error');
    });

    it('7. GET /api/adoptions/:aid debe devolver 404 si el ID tiene formato inválido', async () => {
        const { statusCode, body } = await requester.get('/api/adoptions/id-invalido-123');

        expect(statusCode).to.equal(404);
        expect(body.status).to.equal('error');
    });

    it('8. POST /api/adoptions/:uid/:pid debe devolver 404 si el usuario no existe', async () => {
        const fakeUserId = new mongoose.Types.ObjectId();
        const { statusCode, body } = await requester.post(`/api/adoptions/${fakeUserId}/${testPet._id}`);

        expect(statusCode).to.equal(404);
        expect(body.status).to.equal('error');
    });

    it('9. POST /api/adoptions/:uid/:pid debe devolver 404 si la mascota no existe', async () => {
        const fakePetId = new mongoose.Types.ObjectId();
        const { statusCode, body } = await requester.post(`/api/adoptions/${testUser._id}/${fakePetId}`);

        expect(statusCode).to.equal(404);
        expect(body.status).to.equal('error');
    });

    it('10. POST /api/adoptions/:uid/:pid debe devolver 404 si los IDs tienen formato inválido', async () => {
        const { statusCode, body } = await requester.post('/api/adoptions/uid-invalido/pid-invalido');

        expect(statusCode).to.equal(404);
        expect(body.status).to.equal('error');
    });
});