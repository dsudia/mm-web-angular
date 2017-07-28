
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('postal_codes', table => {
    table.string('postal_code').primary().unique().notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('postal_codes');
};
