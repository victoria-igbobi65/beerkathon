const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const { userModel } = require("../src/models/auth");
const testHelper = require("./test_helper");
const CONFIG = require("../config/env");


describe('Employee Login', () => {

    beforeAll(async () => {
        await userModel.deleteMany({});
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
        await userModel.create({
            email: "user@gmail.com",
            password: "user12345",
            employeeId: "00000",
        });
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });


    test("returns 200 if login successful with email and password", async () => {

        const response = await request( app )
            .post("/api/v1/auth/login")
            .send( testHelper.employeeEmailLoginDetails );
        expect( response.statusCode ).toBe( 200 );
        expect( response.body.status ).toBe( true );
        expect( response.body.msg ).toBe( "Login successful!" );
    });

    test("return 400 if incorrect login details provided", async () => {

        const response = await request( app )
            .post("/api/v1/auth/login")
            .send( testHelper.fakeLoginDetails );
        expect( response.statusCode ).toBe( 400 );
        expect( response.body.status ).toBe( "fail" );
        expect( response.body.message ).toBe( "email or password incorrect!" );
    });

    test("return 400 if no login detail provided", async () => {

        const response = await request( app )
            .post("/api/v1/auth/login")
            .send( testHelper.emtpyLoginDetails );
        expect( response.statusCode ).toBe( 400 );
    });

    test("return 200 if login succesful with employeeId and password", async () => {

        const response = await request( app )
            .post("/api/v1/auth/login")
            .send( testHelper.employeeIDLoginDetails );
        expect( response.statusCode ).toBe( 200 );
        expect( response.body.status ).toBe( true );
        expect( response.body.msg ).toBe( "Login successful!" );
    });



})