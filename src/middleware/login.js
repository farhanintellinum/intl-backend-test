import { AccessTokens, User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ip from "ip";
import config from "../db/config/secret.js";
import AppHelper from "../utils/AppHelper.js";

const login = async function (req, res) {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email dan Password must be filled!" });
    }

    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(400).json({ message: "Email is wrong!" });
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ id: user.id }, config.refreshSecret, {
      expiresIn: "7h",
    });

    await AccessTokens.create({
      id_user: user.id,
      access_token: token,
      refresh_token: refreshToken,
      ip_address: ip.address(),
    });

    AppHelper.resSuccess(res, 200, {
      success: true,
      message: "Login successfully!",
      AccessToken: token,
      refreshToken: refreshToken,
      curruser: user.id,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default login;
