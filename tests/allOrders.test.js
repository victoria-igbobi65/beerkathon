const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const { userModel } = require("../src/models/auth");
const { ticketModel } = require("../src/models/ticket");
const testHelper = require("./test_helper");
const CONFIG = require("../config/env");


describe('Get all Orders', () => {

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

        await request(app)
            .post("/api/v1/ticket/")
            .send(testHelper.orderBody)
            .set("Cookie", userToken);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should return 200 if succesful', async() => {

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
            .get('/api/v1/ticket')
            .set("Cookie", vendorToken )
        expect( response.statusCode ).toBe( 200 )
        expect( response.body.data.length ).toBe( 1 )
        expect( response.body.status ).toBe( true )
    })

})