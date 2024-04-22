require("dotenv").config();
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    ssl: { rejectUnauthorized: false },
  },
});

module.exports = knex;
