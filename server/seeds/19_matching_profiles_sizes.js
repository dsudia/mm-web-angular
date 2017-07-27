exports.seed = function(knex, Promise) {
  return knex('matching_profiles_sizes').insert([
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      size_id: 3
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      size_id: 4
    }
  ])
}
