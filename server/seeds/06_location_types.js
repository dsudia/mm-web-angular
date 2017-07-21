exports.seed = function(knex, Promise) {
  return knex('location_types').insert([
      {id: 0, name: 'Urban'},
      {id: 1, name: 'Suburban'},
      {id: 2, name: 'Small City'},
      {id: 3, name: 'Rural'}
  ]);
};
