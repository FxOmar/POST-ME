"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.validateAccessToken = exports.generateTokens = void 0;
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
        username: user.username,
    };
    const refreshToken = (0, jsonwebtoken_1.sign)({ user: refreshUser }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: sevenDays,
    });
    return { accessToken, refreshToken };
}
exports.generateTokens = generateTokens;
function validateAccessToken(token) {
    try {
        return (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (_a) {
        return null;
    }
}
exports.validateAccessToken = validateAccessToken;
function validateRefreshToken(token) {
    try {
        return (0, jsonwebtoken_1.verify)(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (_a) {
        return null;
    }
}
exports.validateRefreshToken = validateRefreshToken;
//# sourceMappingURL=JWT.js.map