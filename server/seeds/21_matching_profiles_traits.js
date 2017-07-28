exports.seed = function(knex, Promise) {
  return knex('matching_profiles_traits').insert([
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      trait_id: 1
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      trait_id: 2
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      trait_id: 3
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      trait_id: 5
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      trait_id: 9
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      trait_id: 13
    },
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      trait_id: 16
    },
  ])
}
