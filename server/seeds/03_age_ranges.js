exports.seed = function(knex, Promise) {
  return knex('age_ranges').insert([
      {id: 1, name: '0 to 3'},
      {id: 2, name: '3 to 6'},
      {id: 3, name: '6 to 9'},
      {id: 4, name: '9 to 12'},
      {id: 5, name: '12 to 15'},
      {id: 6, name: '15 to 18'}
  ]);
};
