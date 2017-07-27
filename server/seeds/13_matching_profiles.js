
exports.seed = function(knex, Promise) {
  return knex('matching_profiles').insert([
    {
      id: '100c5116-00be-40df-bba4-7436be16a42f',
      member_id: 'b6dc01b4-f1dd-4533-89c5-ca10ed84e72c',
      active: true,
      age_ranges_weight: 10,
      calendars_weight: 10,
      location_types_weight: 10,
      organization_types_weight: 10,
      sizes_weight: 10,
      training_types_weight: 10,
      traits_weight: 10,
      distance_weight: 10
    }
  ])
}
