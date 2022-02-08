"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSchema = void 0;
const schema_1 = require("@graphql-tools/schema");
const type_generator_1 = require("./type.generator");
const resolver_register_1 = require("./resolver.register");
const generateSchema = (authorized = false) => {
    // Collect resolvers and type definitions based on auth
    const resolvers = authorized ? resolver_register_1.RESOLVERS.authorized : resolver_register_1.RESOLVERS.unauthorized;
    const typeDefs = authorized
        ? (0, type_generator_1.generateTypeDefinitions)(type_generator_1.TypeDefinition.Authorized)
        : (0, type_generator_1.generateTypeDefinitions)(type_generator_1.TypeDefinition.Unauthorized);
    return (0, schema_1.makeExecutableSchema)({
        resolvers,
        typeDefs,
    });
};
exports.generateSchema = generateSchema;
//# sourceMappingURL=schema.generator.js.map