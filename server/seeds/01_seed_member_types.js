
exports.seed = function(knex, Promise) {
  return knex('member_types').insert([
      {id: 1, type: 'educator'},
      {id: 2, type: 'schools'}
  ]);
};
