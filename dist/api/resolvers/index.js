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
const JWT_1 = require("../../utils/JWT");
/**
 * @param prisma
 * @param email
 *
 * @returns User Object by email.
 */
const getUser = (prisma, email) => prisma.user.findFirst({
    where: {
        email: email,
    },
});
const resolvers = {
    Mutation: {
        /**
         * User login resolver.
         */
        login: (_, { email, password }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield getUser(prisma, email);
            if (!user)
                throw new Error("User not found");
            const isPasswordValid = yield (0, bcrypt_1.compare)(password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid password");
            const tokens = yield (0, JWT_1.generateTokens)(user);
            return Object.assign(Object.assign({}, tokens), { me: user });
        }),
        /**
         * Sign up new user.
         */
        register: (_, { email, username, password }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
            const isUserRegistered = yield getUser(prisma, email);
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
            const tokens = yield (0, JWT_1.generateTokens)(user);
            return Object.assign(Object.assign({}, tokens), { me: user });
        }),
    },
    Query: {
        users(_, args, { prisma }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user.findMany({});
            });
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map