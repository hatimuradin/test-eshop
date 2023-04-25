const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const api = process.env.API_URL;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User } = require("../models/user");

const { expect } = chai;
chai.use(chaiHttp);

describe("User creation test", () => {
    before((done) => {
        mongoose.connect(process.env.DB).then(() => {
            console.log(`Test db is: ${process.env.DB}`);
        });
        User.deleteMany();
        done();
    });
    it("starts the server", (done) => {
        let user = new User({
            name: "test_user",
            email: "test@test",
            passwordHash: "apsoeigh",
            phone: "09902345343",
            isAdmin: true,
        });
        secret = process.env.SECRET;
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            { expiresIn: "1d" }
        );
        console.log(`token is ${token}`);
        user_create_data = {
            name: "hatef",
            email: "hatefmdn@gmail.com",
            password: "Aa123456",
            phone: "09109345254",
            isAdmin: true,
        };

        chai.request(app)
            .post(`${api}/users/`)
            .set({ Authorization: token })
            .send(user_create_data)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome To Testing API");
                done();
            });
    });
});
