exports.seed = function(knex, Promise) {
  return knex('education_types').insert([
      {id: 1, name: 'No College'},
      {id: 2, name: 'Some College'},
      {id: 3, name: "Associate's Degree"},
      {id: 4, name: "Bachelor's Degree"},
      {id: 5, name: "Master's Degree"},
      {id: 6, name: "Doctorate"}
  ]);
};
