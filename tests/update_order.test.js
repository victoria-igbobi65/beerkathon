const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const { userModel } = require('../src/models/auth')
const { ticketModel } = require("../src/models/ticket");
const testHelper = require("./test_helper");
const CONFIG = require("../config/env");


describe('Update Order', () => {
    let userToken, id;

    beforeAll(async () => {
        await userModel.deleteMany({});
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
        await ticketModel.deleteMany({})
        await userModel.create({
            email: "user@gmail.com",
            password: "user1234",
            employeeId: "12345",
            user_type: "user",
        });

        const loginResponse = await request(app)
            .post("/api/v1/auth/login")
            .send({ id: "user@gmail.com", password: "user1234" });

        userToken = loginResponse.headers["set-cookie"][0].split(";")[0];

        await request( app )
            .post('/api/v1/ticket/')
            .send( testHelper.orderBody )
            .set("Cookie", userToken);
        const ticket = await ticketModel.findOne({})
        id = ticket._id;
        
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should return 403 error when admin tries to update order status', async() =>{

        let adminToken;

        const user = {
            id: CONFIG.ADMIN_EMAIL,
            password: CONFIG.ADMIN_PASSWORD,
        };

        await userModel.create({
            email: CONFIG.ADMIN_EMAIL,
            password: CONFIG.ADMIN_PASSWORD,
            employeeId: "00000",
            user_type: "admin",
        });

        const loginResponse = await request(app)
            .post("/api/v1/auth/admin/login")
            .send(user);
        adminToken = loginResponse.headers["set-cookie"][0].split(";")[0];

        const response = await request( app )
            .patch(`/api/v1/ticket/${ id }`)
            .set("Cookie", adminToken )
        expect( response.body.status ).toBe( "fail")
        expect( response.statusCode ).toBe( 401 )
        expect( response.body.message ).toBe('Unauthorized action!')

    })

    test('should return 403 error when a user tries to update order status', async() =>{

        const response = await request( app )
            .patch(`/api/v1/ticket/${ id }`)
            .set("Cookie", userToken )
        expect( response.body.status ).toBe( "fail")
        expect( response.statusCode ).toBe( 401 )
        expect( response.body.message ).toBe('Unauthorized action!')

    })

    test('should return 200 when vendor updates order status', async() =>{

        let vendorToken;

        const user = {
            id: CONFIG.VENDOR_EMAIL,
            password: CONFIG.VENDOR_PASSWORD,
        };

        await userModel.create({
            email: CONFIG.VENDOR_EMAIL,
            password: CONFIG.VENDOR_PASSWORD,
            employeeId: "20201",
            user_type: "vendor",
        });

        const loginResponse = await request(app)
            .post("/api/v1/auth/vendor/login")
            .send(user);
        vendorToken = loginResponse.headers["set-cookie"][0].split(";")[0];

        const response = await request( app )
            .patch(`/api/v1/ticket/${ id }`)
            .set("Cookie", vendorToken )
        expect( response.body.status ).toBe( true )
        expect( response.statusCode ).toBe( 200 )
        expect( response.body.msg ).toBe('Meal status update successful!')

    })


    test('should return 404 error when order ID is incorrect!', async() =>{

        let vendorToken;

        const user = {
            id: CONFIG.VENDOR_EMAIL,
            password: CONFIG.VENDOR_PASSWORD,
        };

        await userModel.create({
            email: CONFIG.VENDOR_EMAIL,
            password: CONFIG.VENDOR_PASSWORD,
            employeeId: "20201",
            user_type: "vendor",
        });

        const loginResponse = await request(app)
            .post("/api/v1/auth/vendor/login")
            .send(user);
        vendorToken = loginResponse.headers["set-cookie"][0].split(";")[0];


        const response = await request( app )
            .patch(`/api/v1/ticket/${ testHelper.invalidOrderId }`)
            .set("Cookie", vendorToken )
        expect( response.body.status ).toBe( "fail")
        expect( response.statusCode ).toBe( 404 )
        expect( response.body.message ).toBe('Order doesn\'t exist!')

    })

})