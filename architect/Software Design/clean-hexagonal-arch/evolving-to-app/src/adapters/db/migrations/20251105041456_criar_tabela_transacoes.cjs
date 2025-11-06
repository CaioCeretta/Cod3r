exports.up = async (knex) => {
	const existe = await knex.schema.hasTable("transacoes");

	if (existe) return;

	return knex.schema.createTable("transacoes", (table) => {
		table.uuid("id").primary();
		table.string("descricao").notNullable();
		table.decimal("valor").notNullable();
		table.date("vencimento").notNullable().defaultTo(knex.fn.now());
		table.uuid("usuario_id").references("id").inTable("usuarios").notNullable();
	});
};

exports.down = (knex) => knex.schema.dropTableIfExists("transacoes");
