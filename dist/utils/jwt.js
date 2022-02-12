"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatetoken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(user) {
    // const fifteenMins = 60 * 15 * 1000;
    // const accessUser = {
    //   id: user.id,
    // };
    // const accessToken = sign(
    //   { user: accessUser },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: fifteenMins,
    //   }
    // );
    const refreshUser = {
        id: user.id,
        username: user.username,
    };
    const token = (0, jsonwebtoken_1.sign)({ user: refreshUser }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 * 7 * 1000,
    });
    return token;
}
exports.generateToken = generateToken;
// export function validateAccessToken(token) {
//   try {
//     return verify(token, process.env.ACCESS_TOKEN_SECRET);
//   } catch {
//     return null;
//   }
// }
function validatetoken(token) {
    try {
        return (0, jsonwebtoken_1.verify)(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (_a) {
        return null;
    }
}
exports.validatetoken = validatetoken;
//# sourceMappingURL=JWT.js.map