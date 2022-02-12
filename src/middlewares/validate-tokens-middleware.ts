// import {
//   validateAccessToken,
//   validatetoken,
//   generateTokens,
// } from "../utils/JWT";

// async function validateTokensMiddleware(req, res, next) {
//   const token = req.headers["x-refresh-token"];
//   const accessToken = req.headers["x-access-token"];

//   if (!accessToken && !token) return next();

//   const decodedAccessToken = validateAccessToken(accessToken);

//   if (decodedAccessToken && decodedAccessToken.user) {
//     req.user = decodedAccessToken.user;
//     return next();
//   }

//   const decodedtoken = validatetoken(token);

//   if (decodedtoken && decodedtoken.user) {
//     // valid refresh token
//     const user = await userRepo.get({ userId: decodedtoken.user.id });

//     // valid user and user token not invalidated
//     if (!user || user.tokenCount !== decodedtoken.user.count)
//       return next();

//     req.user = decodedtoken.user;

//     // refresh the tokens
//     const userTokens = generateTokens(user);

//     res.set({
//       "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
//       "x-access-token": userTokens.accessToken,
//       "x-refresh-token": userTokens.token,
//     });

//     return next();
//   }

//   next();
// }

// export default validateTokensMiddleware;
