import bcrypt from "bcrypt";
import { User } from "../../models/index.js";
export async function up(queryInterface, Sequelize) {
  const saltRounds = 10;
  const users = [
    { FullName: "Sudrajat", UserName: "Jajat", Email: "sudrajats504@gmail.com", Password: await bcrypt.hash("admin123", saltRounds), Address: "jl.karamat no 37" },
    { FullName: "example", UserName: "user", Email: "user@gmail.com", Password: await bcrypt.hash("user123", saltRounds), Address: "jl.karamat no 40" },
  ];

  for (const user of users) {
    await User.create(user);
  }
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("users", null, {});
}
