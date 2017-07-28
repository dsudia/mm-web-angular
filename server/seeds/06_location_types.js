exports.seed = function(knex, Promise) {
  return knex('location_types').insert([
      {id: 1, name: 'Urban'},
      {id: 2, name: 'Suburban'},
      {id: 3, name: 'Small City'},
      {id: 4, name: 'Rural'}
  ]);
};
