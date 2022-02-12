import { sign, verify } from "jsonwebtoken";

export function generateToken(user): { token: string } {
  // const fifteenMins = 60 * 15 * 1000;

  // const accessUser = {
  //   id: user.id,
  // };

  // const accessToken = sign(
  //   { user: accessUser },
  //   process.env.ACCESS_TOKEN_SECRET,
  //   {
  //     expiresIn: fifteenMins,
  //   }
  // );

  const refreshUser = {
    id: user.id,
    username: user.username,
  };

  const token = sign({ user: refreshUser }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });

  return token;
}

// export function validateAccessToken(token) {
//   try {
//     return verify(token, process.env.ACCESS_TOKEN_SECRET);
//   } catch {
//     return null;
//   }
// }

export function validatetoken(token) {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    return null;
  }
}
