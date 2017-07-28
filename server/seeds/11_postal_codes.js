exports.seed = function(knex, Promise) {
  return knex('postal_codes').insert([
      {postal_code: '80303'}
  ]);
};
