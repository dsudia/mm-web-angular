exports.seed = function(knex, Promise) {
  return knex('training_types').insert([
      {id: 0, name: 'AMI'},
      {id: 1, name: 'AMS'},
      {id: 2, name: 'MCI'},
      {id: 3, name: 'SNM'},
      {id: 4, name: 'CGS'},
      {id: 5, name: 'Other'}
  ]);
};
