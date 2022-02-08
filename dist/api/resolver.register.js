"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOLVERS = void 0;
const resolvers_1 = __importDefault(require("./unauthorized/resolvers"));
const resolvers_2 = __importDefault(require("./authorized/resolvers"));
exports.RESOLVERS = {
    authorized: [resolvers_2.default],
    unauthorized: [resolvers_1.default],
};
//# sourceMappingURL=resolver.register.js.map