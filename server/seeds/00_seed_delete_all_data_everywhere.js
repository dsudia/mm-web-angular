exports.seed = function(knex, Promise) {
  // Deletes everything off of the database
  return dbDeleteOrder.reduce((promise, dbName) => promise.then(() => knex(dbName).del()), Promise.resolve());
};

const dbDeleteOrder = [
  'matching_profiles_age_ranges',
  'age_ranges',
  'matching_profiles_calendars',
  'calendars',
  'matching_profiles_education_types',
  'education_types',
  'matching_profiles_location_types',
  'location_types',
  'matching_profiles_organization_types',
  'organization_types',
  'postal_codes',
  'matching_profiles_postal_codes_distances',
  'distances',
  'matching_profiles_sizes',
  'sizes',
  'matching_profiles_training_types',
  'training_types',
  'matching_profiles_traits',
  'traits',
  'matching_profiles',
  'schools',
  'educators',
  'members',
  'members_matching_profiles',
  'member_types',
];
