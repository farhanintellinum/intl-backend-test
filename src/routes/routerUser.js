import express from "express";
import { CreateUser, DeleteUser, GetAll, GetById, getPaginatedUser, UpdateUser } from "../controller/userController.js";
import { verifikasi } from "../middleware/verifikasi.js";
import { createEmailValidator, EmailValidator, updateEmailValidator } from "../validations/emailValidations.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/getall", GetAll);
router.get("/getbyid/:id", GetById);
router.get("/paginated", getPaginatedUser);
router.post("/create", EmailValidator, createEmailValidator, CreateUser);
router.put("/update/:id", body("Email").notEmpty().withMessage("Email must be filled").isEmail().withMessage("Invalid email format"), verifikasi, updateEmailValidator, UpdateUser);
router.delete("/delete/:id", DeleteUser);

export default router;
