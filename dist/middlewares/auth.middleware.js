"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const AuthMiddleware = (request, response, next) => {
    request.isAuthenticated = false;
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        return next();
    }
    // if (ACCESS_TOKENS.indexOf(authorizationHeader) === -1) {
    //   return next();
    // }
    // const user: IUser = users.find((usr) => usr.token === authorizationHeader);
    // Object.assign(request, { user, isAuthenticated: true });
    next();
};
exports.AuthMiddleware = AuthMiddleware;
exports.default = exports.AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map