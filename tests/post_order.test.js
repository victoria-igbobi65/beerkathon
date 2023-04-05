const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const { userModel } = require("../src/models/auth");
const testHelper = require("./test_helper");
const CONFIG = require("../config/env");

describe("Create Orders", () => {
    let userToken;

    beforeAll(async () => {
        await userModel.deleteMany({});
    });

    beforeEach(async () => {
        await userModel.deleteMany({});

        await userModel.create({
            email: "user@gmail.com",
            password: "user1234",
            employeeId: "1234",
            user_type: "user",
        });

        const loginResponse = await request(app)
            .post("/api/v1/auth/admin/login")
            .send({ id: "user@gmail.com", password: "user1234" });

        userToken = loginResponse.headers["set-cookie"][0].split(";")[0];

    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should return a unique ID and 200 if order created succesfully', async() => {

        const response = await request( app )
            .post('/api/v1/ticket/')
            .send( testHelper.orderBody )
            .set("Cookie", userToken);
        expect( response.statusCode ).toBe( 200 )
        expect( response.body.data.length ).toBe( 5 )
    })

    test('should return a 403 if token not provided', async() => {

        const response = await request( app )
            .post('/api/v1/ticket/')
            .send( testHelper.orderBody )
        expect( response.statusCode ).toBe( 403 )
        expect( response.body.message ).toBe("You are not logged in!");
    })

    test('should return a 401 error when a vendor or admin uses route', async() => {

        let adminToken;

        await userModel.create({
            email: CONFIG.ADMIN_EMAIL,
            password: CONFIG.ADMIN_PASSWORD,
            employeeId: "0000",
            user_type: "admin",
        });

        const loginResponse = await request(app)
            .post("/api/v1/auth/admin/login")
            .send({ id: CONFIG.ADMIN_EMAIL, password: CONFIG.ADMIN_PASSWORD });

        adminToken = loginResponse.headers["set-cookie"][0].split(";")[0];


        const response = await request( app )
            .post('/api/v1/ticket/')
            .send( testHelper.orderBody )
            .set("Cookie", adminToken);

        expect( response.statusCode ).toBe( 401 )
        expect( response.body.message ).toBe( 'Unauthorized action!' )
    })

    test('should return 400 if user cannot make order for the day anymore', async() => {

        await request( app )
            .post('/api/v1/ticket/')
            .send( testHelper.orderBody )
            .set("Cookie", userToken);

        
        const response = await request( app )
            .post("/api/v1/ticket/")
            .send( testHelper.orderBody )
            .set("Cookie", userToken);
        expect( response.statusCode ).toBe( 400 );
        expect( response.body.message ).toBe("Check back tomorrow for tickets!");



    })
})