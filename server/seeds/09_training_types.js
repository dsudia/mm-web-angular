exports.seed = function(knex, Promise) {
  return knex('training_types').insert([
      {id: 1, name: 'AMI'},
      {id: 2, name: 'AMS'},
      {id: 3, name: 'MCI'},
      {id: 4, name: 'SNM'},
      {id: 5, name: 'CGS'},
      {id: 6, name: 'Other'}
  ]);
};
