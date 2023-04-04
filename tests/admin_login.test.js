const request = require('supertest')
const mongoose = require('mongoose')
const { app } = require('../app')
const { userModel } = require('../src/models/auth')
const testHelper = require('./test_helper')
const CONFIG = require('../config/env')


describe('Admin Login', () => {

    beforeAll(async () => {
        await userModel.deleteMany({});
    });

    beforeEach( async() => {
        await userModel.deleteMany({});
        await userModel.create({
            email: CONFIG.ADMIN_EMAIL,
            password: CONFIG.ADMIN_PASSWORD,
            employeeId: "00000",
            user_type: "admin",
        });

    })
    afterAll( async() => {
        await mongoose.connection.close();
    })

    test('returns 200 if login successful', async() => {

        const user = {
            id: CONFIG.ADMIN_EMAIL,
            password: CONFIG.ADMIN_PASSWORD
        }

        const response = await request(app)
            .post("/api/v1/auth/admin/login")
            .send(user);
        expect( response.statusCode ).toBe( 200 )
        expect( response.body.status).toBe( true)
        expect( response.body.msg).toBe("Login successful!")
    })

    test('return 400 if incorrect login details provided', async() => {

        const response = await request(app)
            .post("/api/v1/auth/admin/login")
            .send( testHelper.fakeLoginDetails );
        expect( response.statusCode ).toBe( 400 );
        expect( response.body.status ).toBe( "fail" );
        expect( response.body.message ).toBe("email or password incorrect!");
    })

    test('return 400 if no login detail provided', async() => {

        const response = await request( app )
            .post("/api/v1/auth/admin/login")
            .send( testHelper.emtpyLoginDetails )
        expect( response.statusCode ).toBe( 400 )
    })

})