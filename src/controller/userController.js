import { Op } from "sequelize";
import { validationResult } from "express-validator";
import { User } from "../models/index.js";
import AppHelper from "../utils/AppHelper.js";
import bcrypt from "bcrypt";

export const getPaginatedUser = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const search = (req.query.search || "").trim();

  const whereClause = search
    ? {
        [Op.or]: [{ FullName: { [Op.like]: `%${search}%` } }, { UserName: { [Op.like]: `%${search}%` } }, { Email: { [Op.like]: `%${search}%` } }],
      }
    : {};

  try {
    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit) || 1;

    return AppHelper.resSuccess(res, 200, {
      data: rows,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error(error);
    return AppHelper.resError(res, 500, [{ msg: "An error occurred while fetching users." }]);
  }
};

export const GetAll = async (req, res) => {
  try {
    const data = await User.findAll();

    return AppHelper.resSuccess(res, 200, { data });
  } catch (error) {
    return AppHelper.resError(res, 404, error.message);
  }
};

export const GetById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findByPk(id);
    return AppHelper.resSuccess(res, 200, { data });
  } catch (error) {
    return AppHelper.resError(res, 404, error.message);
  }
};

export const CreateUser = async (req, res) => {
  const saltRounds = 10;
  const { FullName, UserName, Email, Password, Address } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return AppHelper.resError(res, 400, errors.array());
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, saltRounds);
    const newUser = await User.create({
      FullName,
      UserName,
      Email,
      Password: hashedPassword,
      Address,
    });
    return AppHelper.resSuccess(res, 200, { data: newUser });
  } catch (error) {
    return AppHelper.resError(res, 500, error.message);
  }
};

export const UpdateUser = async (req, res) => {
  const saltRounds = 10;
  const id = req.params.id;
  const { FullName, UserName, Email, Password, Address } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return AppHelper.resError(res, 400, errors.array());
  }
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return AppHelper.resError(res, 404, "user not found");
    }

    const hashedPassword = Password ? await bcrypt.hash(Password, saltRounds) : user.Password;
    await User.update(
      {
        FullName: FullName ? FullName : user.FullName,
        UserName: UserName ? UserName : user.UserName,
        Email: Email ? Email : user.Email,
        Password: hashedPassword,
        Address: Address ? Address : user.Address,
      },
      { where: { id } }
    );
    const updateUser = await User.findByPk(id);
    return AppHelper.resSuccess(res, 200, { data: updateUser });
  } catch (error) {
    return AppHelper.resError(res, 500, error.message);
  }
};

export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.destroy({ where: { id } });
    return AppHelper.resSuccess(res, 200, { msg: "success deleted data" });
  } catch (error) {
    return AppHelper.resError(res, 500, error.message);
  }
};
