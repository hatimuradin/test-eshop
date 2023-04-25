const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.SECRET;
    return expressJwt({
        secret,
        algorithms: ["HS265"],
    });
}

module.exports = authJwt();
