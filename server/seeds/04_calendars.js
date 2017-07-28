exports.seed = function(knex, Promise) {
  return knex('calendars').insert([
      {id: 1, name: 'Traditional'},
      {id: 2, name: 'Year-Round'}
  ]);
};
