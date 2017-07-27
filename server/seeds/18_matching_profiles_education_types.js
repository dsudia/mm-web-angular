exports.seed = function(knex, Promise) {
  return knex('matching_profiles_education_types').insert([
    {
      matching_profile_id: '100c5116-00be-40df-bba4-7436be16a42f',
      education_type_id: 5
    }
  ])
}
