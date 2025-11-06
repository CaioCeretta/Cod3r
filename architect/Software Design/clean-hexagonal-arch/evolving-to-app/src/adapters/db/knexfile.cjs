const dotenv = require("dotenv");
const path = require("node:path");

dotenv.config({ path: path.resolve(__dirname, `../../../.env`) });

module.exports = {
	client: "pg",
	connection: process.env.DB_URL,
	migrations: {
		directory: path.resolve(__dirname, "migrations"),
		tableName: "knex_migrations",
	},
	pool: {
		min: 2,
		max: 10,
	},
};
