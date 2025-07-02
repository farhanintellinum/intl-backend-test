import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../db/config/db.js";

const AccessTokens = sequelize.define(
  "accessTokens",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    access_token: {
      type: Sequelize.STRING,
    },
    refresh_token: {
      type: Sequelize.STRING,
    },
    ip_address: {
      type: Sequelize.STRING,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    tableName: "accessTokens",
    timestamps: true,
  }
);

export default AccessTokens;
