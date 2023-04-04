const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const { userModel } = require("../src/models/auth");
const testHelper = require("./test_helper");
const CONFIG = require("../config/env");

describe("Vendor Login", () => {
    beforeAll(async () => {
        await userModel.deleteMany({});
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
        await userModel.create({
            email: CONFIG.VENDOR_EMAIL,
            password: CONFIG.VENDOR_PASSWORD,
            employeeId: "00000",
        });
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("returns 200 if login successful", async () => {
        const user = {
            id: CONFIG.VENDOR_EMAIL,
            password: CONFIG.VENDOR_PASSWORD,
        };

        const response = await request( app )
            .post("/api/v1/auth/vendor/login")
            .send(user);
        expect( response.statusCode ).toBe( 200 );
        expect( response.body.status ).toBe( true );
        expect( response.body.msg ).toBe( "Login successful!" );
    });

    test("return 400 if incorrect login details provided", async () => {

        const response = await request( app )
            .post("/api/v1/auth/vendor/login")
            .send( testHelper.fakeLoginDetails );
        expect( response.statusCode ).toBe( 400 );
        expect( response.body.status ).toBe( "fail" );
        expect( response.body.message ).toBe( "email or password incorrect!" );
    });

    test("return 400 if no login detail provided", async () => {

        const response = await request( app )
            .post("/api/v1/auth/vendor/login")
            .send( testHelper.emtpyLoginDetails );
        expect( response.statusCode ).toBe( 400 );
    });
});
