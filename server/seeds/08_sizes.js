exports.seed = function(knex, Promise) {
  return knex('sizes').insert([
      {id: 0, name: '4 or fewer'},
      {id: 1, name: '4 to 9'},
      {id: 2, name: '10 to 19'},
      {id: 3, name: '20 or more'},
  ]);
};
