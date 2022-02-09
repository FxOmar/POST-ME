"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function generateTokens(user) {
    const sevenDays = 60 * 60 * 24 * 7 * 1000;
    const fifteenMins = 60 * 15 * 1000;
    const accessUser = {
        id: user.id,
    };
    const accessToken = (0, jsonwebtoken_1.sign)({ user: accessUser }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: fifteenMins,
    });
    const refreshUser = {
        id: user.id,
        count: user.tokenCount,
    };
    const refreshToken = (0, jsonwebtoken_1.sign)({ user: refreshUser }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: sevenDays,
    });
    return { accessToken, refreshToken };
}
exports.default = generateTokens;
//# sourceMappingURL=generate-tokens.js.map