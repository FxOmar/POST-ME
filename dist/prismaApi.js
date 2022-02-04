"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class MoviesAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://movies-api.example.com/";
    }
}
//# sourceMappingURL=prismaApi.js.map