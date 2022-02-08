"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
function generateTokens(user) {
    const tokenSecret = process.env.TOKEN_SECRET;
    const token = (0, jsonwebtoken_1.sign)({ username: user.username }, tokenSecret);
    return {
        accessToken: token,
        refreshToken: token,
    };
}
const resolvers = {
    Mutation: {
        // login: async (_, { email, password }) => {
        //   return;
        // },
        register: (_, { email, username, password }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
            const isUserRegistered = yield prisma.user.findMany({
                where: { email: email },
            });
            if (isUserRegistered.length > 0) {
                throw new Error("User already registered!");
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
            const user = yield prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                },
            });
            const tokens = yield generateTokens(user);
            return Object.assign(Object.assign({}, tokens), { me: user });
        }),
    },
    Query: {
        users(_, { prisma }) {
            return prisma.users.findMany({});
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map