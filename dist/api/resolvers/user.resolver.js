"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MOCK_USERS_1 = require("../../../MOCK_USERS");
exports.default = (parent, args) => {
    return MOCK_USERS_1.usersList.filter((user) => user.id === Number(args.id))[0];
};
//# sourceMappingURL=user.resolver.js.map