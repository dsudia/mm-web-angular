exports.seed = function(knex, Promise) {
  return knex('organization_types').insert([
      {id: 0, name: 'Public District'},
      {id: 1, name: 'Public Magnet'},
      {id: 2, name: 'Public Charter'},
      {id: 3, name: 'Public Innovation'},
      {id: 4, name: 'Private For-Profit, Single Owner'},
      {id: 5, name: 'Private For-Profit, Corporate Owner'},
      {id: 6, name: 'Private Non-Profit'},
  ]);
};
