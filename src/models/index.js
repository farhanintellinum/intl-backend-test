import User from "./user.js";
import AccessTokens from "./accesstoken.js";

User.hasMany(AccessTokens, { foreignKey: "id_user", onDelete: "CASCADE" });
AccessTokens.belongsTo(User, { foreignKey: "id_user" });

export { User, AccessTokens };
