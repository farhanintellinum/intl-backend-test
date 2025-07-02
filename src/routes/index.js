import express from "express";
import routerUser from "./routerUser.js";
import login from "../middleware/login.js";
import { refreshAccessToken } from "../middleware/verifikasi.js";

const app = express();
app.use("/api/v1/user", routerUser);
app.use("/login", login);
app.use("/api/v1/refresh-token/:refreshToken", refreshAccessToken);
export default app;
