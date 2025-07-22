const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Patient = require('../models/Patient');
const ActivityLog = require('../models/ActivityLog');

let testPatient;
let token;

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    await Patient.deleteMany({});
    await ActivityLog.deleteMany({});

    // Create a test patient
    testPatient = await Patient.create({
        fullName: 'Test Patient',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        dateOfBirth: '1990-01-01',
        createdBy: mongoose.Types.ObjectId(),
        active: true
    });

    // Get token
    const response = await request(app)
        .post('/api/v1/patients/login')
        .send({
            email: 'test@example.com',
            password: 'password123'
        });

    token = response.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Authentication', () => {
    test('Should login with valid credentials', async () => {
        const response = await request(app)
            .post('/api/v1/patients/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test('Should not login with invalid credentials', async () => {
        const response = await request(app)
            .post('/api/v1/patients/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
    });

    test('Should send password reset email', async () => {
        const response = await request(app)
            .post('/api/v1/patients/forgotPassword')
            .send({
                email: 'test@example.com'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Token sent to email!');
    });
});

describe('Profile Management', () => {
    test('Should get patient profile', async () => {
        const response = await request(app)
            .get('/api/v1/patients/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.patient.fullName).toBe('Test Patient');
    });

    test('Should update patient profile', async () => {
        const response = await request(app)
            .patch('/api/v1/patients/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullName: 'Updated Name',
                gender: 'female'
            });

        expect(response.status).toBe(200);
        expect(response.body.data.patient.fullName).toBe('Updated Name');
        expect(response.body.data.patient.gender).toBe('female');
    });

    test('Should update emergency contact', async () => {
        const response = await request(app)
            .patch('/api/v1/patients/emergencyContact')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Emergency Contact',
                relationship: 'Spouse',
                phoneNumber: '1234567890'
            });

        expect(response.status).toBe(200);
        expect(response.body.data.patient.emergencyContact.name).toBe('Emergency Contact');
    });
});

describe('Family Management', () => {
    test('Should add family member', async () => {
        const response = await request(app)
            .post('/api/v1/patients/family')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullName: 'Child Name',
                dateOfBirth: '2010-01-01',
                gender: 'male',
                relationship: 'child'
            });

        expect(response.status).toBe(201);
        expect(response.body.data.familyMember.fullName).toBe('Child Name');
    });

    test('Should get family members', async () => {
        // First add a family member
        await request(app)
            .post('/api/v1/patients/family')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullName: 'Child Name',
                dateOfBirth: '2010-01-01',
                gender: 'male',
                relationship: 'child'
            });

        const response = await request(app)
            .get('/api/v1/patients/family')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.familyMembers).toHaveLength(1);
    });

    test('Should not add family member over 21 as child', async () => {
        const response = await request(app)
            .post('/api/v1/patients/family')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullName: 'Adult Child',
                dateOfBirth: '1990-01-01',
                gender: 'male',
                relationship: 'child'
            });

        expect(response.status).toBe(400);
    });
});

describe('Activity Logging', () => {
    test('Should log login activity', async () => {
        await request(app)
            .post('/api/v1/patients/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        const logs = await ActivityLog.find({ patient: testPatient._id });
        expect(logs.length).toBeGreaterThan(0);
        expect(logs[0].action).toBe('login');
    });

    test('Should get activity logs', async () => {
        const response = await request(app)
            .get('/api/v1/patients/activity')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data.logs)).toBe(true);
    });
}); 