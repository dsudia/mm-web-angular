exports.seed = function(knex, Promise) {
  return knex('organization_types').insert([
      {id: 1, name: 'Public District'},
      {id: 2, name: 'Public Magnet'},
      {id: 3, name: 'Public Charter'},
      {id: 4, name: 'Public Innovation'},
      {id: 5, name: 'Private For-Profit, Single Owner'},
      {id: 6, name: 'Private For-Profit, Corporate Owner'},
      {id: 7, name: 'Private Non-Profit'}
  ]);
};
