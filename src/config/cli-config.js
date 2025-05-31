/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
require("ts-node/register");
const { environment } = require("./index"); // Import your environment

// Sequelize CLI expects CommonJS export
module.exports = {
  development: {
    username: environment.db_user,
    password: environment.db_password,
    database: environment.db_name,
    host: environment.db_host,
    dialect: environment.db_driver || "postgres", // Provide a fallback in case environment is missing
  },
  local: {
    username: environment.db_user,
    password: environment.db_password,
    database: environment.db_name,
    host: environment.db_host,
    dialect: environment.db_driver || "postgres",
  },
  production: {
    username: environment.db_user,
    password: environment.db_password,
    database: environment.db_name,
    host: environment.db_host,
    dialect: environment.db_driver || "postgres",
  },
};
