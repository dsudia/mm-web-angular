exports.seed = function(knex, Promise) {
  return knex('education_types').insert([
      {id: 0, name: 'No College'},
      {id: 1, name: 'Some College'},
      {id: 2, name: "Associate's Degree"},
      {id: 3, name: "Bachelor's Degree"},
      {id: 4, name: "Master's Degree"},
      {id: 5, name: "Doctorate"}
  ]);
};
