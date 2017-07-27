exports.seed = function(knex, Promise) {
  return knex('sizes').insert([
      {id: 1, name: '4 or fewer'},
      {id: 2, name: '4 to 9'},
      {id: 3, name: '10 to 19'},
      {id: 4, name: '20 or more'}
  ]);
};
