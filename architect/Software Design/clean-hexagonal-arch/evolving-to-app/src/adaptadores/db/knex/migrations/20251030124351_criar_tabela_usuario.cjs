exports.up = async (knex) => {
	const existe = await knex.schema.hasTable("usuarios");
	if (existe) return;

	return knex.schema.createTable("usuarios", (table) => {
		table.increments("id").primary();
		table.string("nome").notNullable();
		table.string("email").notNullable().unique();
		table.string("senha").notNullable();
	});
};

exports.down = (knex) => knex.schema.dropTableIfExists("usuarios");
