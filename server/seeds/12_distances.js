exports.seed = function(knex, Promise) {
  return knex('distances').insert([
      {id: 1, distance: 5},
      {id: 2, distance: 10},
      {id: 3, distance: 20},
      {id: 4, distance: 50},
      {id: 5, distance: 100},
  ]);
};
