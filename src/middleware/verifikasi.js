import jwt from "jsonwebtoken";
import config from "../db/config/secret.js";
import { AccessTokens, User } from "../models/index.js";
import AppHelper from "../utils/AppHelper.js";

export const verifikasi = (req, res, next) => {
  let tokenWithBearer = req.headers.authorization;

  if (tokenWithBearer) {
    console.log(tokenWithBearer, "cek bearer");

    const token = tokenWithBearer.split(" ")[1];
    console.log(token === tokenWithBearer, "cek token");

    jwt.verify(token, config.secret, (err, decode) => {
      if (err) {
        return AppHelper.resError(res, 404, "Token not existing");
      } else {
        req.user = decode;
        next();
        console.log("Success authorization");
      }
    });
  } else {
    return AppHelper.resError(res, 401, "Token not found");
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.params.refreshToken;

    const tokenData = await AccessTokens.findOne({
      where: { refresh_token: refreshToken },
      include: [
        {
          model: User,
        },
      ],
    });

    if (!tokenData.refresh_token) {
      return AppHelper.resError(res, 400, "Invalid refresh Token");
    }
    const newAccessToken = jwt.sign({ id: tokenData.user.id }, config.secret, {
      expiresIn: "1m",
    });
    return AppHelper.resSuccess(res, 200, {
      data: {
        accessToken: newAccessToken,
        currUser: tokenData.user.id,
      },
    });
  } catch (error) {
    return AppHelper.resError(res, 500, "Internal server error");
  }
};
