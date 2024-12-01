import app from "../index"
import supertest from "supertest"

describe("User End Point", () => {
    describe("No Token Middleware", () => {
        it("Status Code 401", async () => {
            await supertest(app).get('/api/v1/user').expect(401)
        })
    })
    describe("With Token Middleware", () => {
        it("Status Code 200", async () => {
            await supertest(app).get("/api/v1/user")
                .set({ ['api-token']: 'P@ssw0rd123', authorization: 'Bearer test' })
                .expect(200)
        })
        it("Invalid Token Middleware", async () => {
            await supertest(app).get("/api/v1/user")
                .set({ ['api-token']: 'asal-asalan', authorization: 'Bearer asal' })
                .expect(401)
        })
    })
    describe("Validation Name", () => {
        it("Empty Name Input", async () => {
            await supertest(app).post("/api/v1/user")
                .set({ ['api-token']: 'P@ssw0rd123', authorization: 'Bearer test' })
                .expect('Content-Type', /json/)
                .send({
                    name: '',
                    email: 'test@gmail.com',
                    username: 'test',
                    password: 'password',
                })
                .expect(422)
                .then((resName: any) => {
                    expect(resName._body.message).toContain("name is not allowed to be empty")
                })
        })
    })
    describe("Validation Email", () => {
        it("Invalid Email", async () => {
            await supertest(app).post("/api/v1/user")
                .set({ ['api-token']: 'P@ssw0rd123', authorization: 'Bearer test' })
                .expect('Content-Type', /json/)
                .send({
                    name: 'testing',
                    email: 'test',
                    username: 'test123',
                    password: 'password'
                }).expect(422)
                .then((resEmail: any) => {
                    expect(resEmail._body.message).toContain("email must be a valid email")
                })
        })
    })
})