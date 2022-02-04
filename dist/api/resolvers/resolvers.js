"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_resolver_1 = __importDefault(require("./users.resolver"));
// import user from "./user.resolver";
const resolvers = {
    Query: {
        users: users_resolver_1.default,
        // user,
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map