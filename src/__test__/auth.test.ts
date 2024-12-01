import app from "../index"
import supertest from "supertest"

describe("Auth End Point", () => {
    describe("Validation Username, Email and Password", () => {
        it("Empty Username Input", async () => {
            await supertest(app).post("/api/v1/auth/login")
                .set({ ['api-token']: 'P@ssw0rd123' })
                .expect('Content-Type', /json/)
                .send({
                    username: '',
                    password: ''
                })
                .expect(422)
                .then((response: any) => {
                    expect(response._body.message).toContain("username is not allowed to be empty")
                })
        })
        it("Empty Password Input", async () => {
            await supertest(app).post("/api/v1/auth/login")
                .set({ ['api-token']: 'P@ssw0rd123' })
                .expect('Content-Type', /json/)
                .send({
                    username: 'test',
                    password: ''
                })
                .expect(422)
                .then((response: any) => {
                    expect(response._body.message).toContain("password is not allowed to be empty")
                })
        })
    })
})