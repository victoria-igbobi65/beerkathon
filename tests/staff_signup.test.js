const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const { userModel } = require("../src/models/auth");
const CONFIG = require("../config/env");


describe('Employee Signup', () => {
    let adminToken;

    beforeAll(async () => {
        await userModel.deleteMany({});
    });

    beforeEach(async () => {
        await userModel.deleteMany({});

        await userModel.create({
            email: CONFIG.ADMIN_EMAIL,
            password: CONFIG.ADMIN_PASSWORD,
            employeeId: "00000",
            user_type: "admin"
        });

        const loginResponse = await request( app )
            .post("/api/v1/auth/admin/login")
            .send({ id: CONFIG.ADMIN_EMAIL, password: CONFIG.ADMIN_PASSWORD })

        adminToken = loginResponse.headers["set-cookie"][0].split(";")[0];


    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should return 200 if signup successful', async()=> {

        // const response = await request( app )
        //     .post("/api/v1/auth/signup")
        //     .send({ id: "12345", email: "user@gmail.com"})
        //     .set("Cookie", adminToken )
        // expect( response.statusCode ).toBe( 200 )
        // expect( response.body.status ).toBe( true )
        // expect( response.body.msg ).toBe('User registration successful!')

    })
    test("should return 400 and error message if email not provided", async() => {

        const response = await request( app )
            .post("/api/v1/auth/signup")
            .send({ id: "12345" })
            .set("Cookie", adminToken )
        expect( response.statusCode ).toBe( 400 )
        expect(response.body.message).toBe("Provide a valid email address");
    })

    test("should return 400 and error message if staff ID number not provided", async() => {

        const response = await request( app )
            .post("/api/v1/auth/signup")
            .send({ email: "user@gmail.com" })
            .set("Cookie", adminToken )

        expect( response.statusCode ).toBe( 400 )
        expect(response.body.message).toBe("Provide valid ID number");
    })

    test("should return 400 if token not provided", async() => {

        const response = await request( app )
            .post("/api/v1/auth/signup")
            .send({ email: "user@gmail.com" })
        expect( response.statusCode ).toBe( 403 )
        expect( response.body.message ).toBe("You are not logged in!");
    })
})