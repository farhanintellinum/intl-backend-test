import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../db/config/db.js";

const User = sequelize.define(
  "users",
  {
    FullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    UserName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Address: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
