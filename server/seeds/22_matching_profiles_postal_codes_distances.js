exports.seed = function(knex, Promise) {
  return knex('matching_profiles_postal_codes_distances').insert([
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      postal_code: '80303',
      distance_id: 3
    }
  ])
}
