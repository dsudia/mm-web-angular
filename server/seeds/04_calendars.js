exports.seed = function(knex, Promise) {
  return knex('calendars').insert([
      {id: 0, name: 'Traditional'},
      {id: 1, name: 'Year-Round'},
  ]);
};
