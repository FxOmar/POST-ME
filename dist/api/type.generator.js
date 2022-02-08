"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypeDefinitions = exports.TypeDefinition = void 0;
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
exports.TypeDefinition = {
    Authorized: 1,
    Unauthorized: 0,
};
// Load GraphQL files for authorized schema
const authorizedGraphql = (0, load_1.loadSchemaSync)("./src/api/authorized/schema/schema.graphql", {
    loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
});
// Load GraphQL files for unauthorized schema
const unauthorizedGraphql = (0, load_1.loadSchemaSync)("./src/api/unauthorized/schema/schema.graphql", {
    loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
});
const generateTypeDefinitions = (definitionType) => {
    const toGenerate = definitionType === exports.TypeDefinition.Authorized
        ? authorizedGraphql
        : unauthorizedGraphql;
    return toGenerate;
};
exports.generateTypeDefinitions = generateTypeDefinitions;
//# sourceMappingURL=type.generator.js.map