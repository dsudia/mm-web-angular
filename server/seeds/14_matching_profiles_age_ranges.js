
exports.seed = function(knex, Promise) {
  return knex('matching_profiles_age_ranges').insert([
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      age_range_id: 1
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      age_range_id: 2
    }
  ])
}
