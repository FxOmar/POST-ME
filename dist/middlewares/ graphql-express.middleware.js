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
exports.generateMiddlewareGraphql = void 0;
const schema_generator_1 = require("../api/schema.generator");
const generateMiddlewareGraphql = () => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        const schema = (0, schema_generator_1.generateSchema)(request.isAuthenticated);
        const context = {
            isAuthenticated: false,
        };
        // If user is authenticated attach additional info to context
        if (request.isAuthenticated) {
            Object.assign(context, {
                isAuthenticated: true,
                user: request.user,
            });
        }
        return Object.assign({
            schema,
            context,
            formatError: (error) => error.message,
        });
    });
};
exports.generateMiddlewareGraphql = generateMiddlewareGraphql;
//# sourceMappingURL=%20graphql-express.middleware.js.map