
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('matching_profiles', table => {
    table.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('matching_profiles', table => {
    table.dropColumn('description');
  })
};
