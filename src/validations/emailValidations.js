import { body } from "express-validator";
import { User } from "../models/index.js";
import AppHelper from "../utils/AppHelper.js";

export const EmailValidator = [
  body("FullName").notEmpty().withMessage("FullName must be filled"),
  body("UserName").notEmpty().withMessage("UserName must be filled"),
  body("Email").notEmpty().withMessage("Email must be filled").isEmail().withMessage("Invalid email format"),
  body("Password").notEmpty().withMessage("Password must be filled"),
  body("Address").notEmpty().withMessage("Address must be filled"),
];

export const createEmailValidator = async (req, res, next) => {
  const { Email } = req.body;

  const response = await User.findOne({
    attributes: ["Email"],
    where: { Email },
  });
  if (response) {
    return AppHelper.resError(res, 400, "Email existing already");
  } else {
    next();
  }
};

export const updateEmailValidator = async (req, res, next) => {
  const { Email } = req.body;
  const { id } = req.params;

  try {
    if (!Email) {
      return next();
    }

    const response = await User.findOne({ where: { Email } });

    if (response) {
      if (response.id == id) {
        return next();
      } else {
        return AppHelper.resError(res, 400, "Email existing already");
      }
    }

    return next();
  } catch (error) {
    return AppHelper.resError(res, 500, error.message);
  }
};
