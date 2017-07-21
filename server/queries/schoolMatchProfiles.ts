import { merge, omit, pick } from 'ramda';
import { knex } from './db';
import { DatabaseTranslator, MatchingProfile } from '../interfaces'
import { translateToDb, translateToWeb } from './helpers';
import * as uuid from 'uuid';

const translator: DatabaseTranslator<MatchingProfile> = {
  active: true,
  age_ranges: 'ageRanges',
  age_ranges_weight: 'ageRangesWeight',
  calendars: true,
  calendars_weight: 'calendarsWeight',
  education_types: 'educationTypes',
  education_types_weight: 'educationTypesWeight',
  location_types: 'locationTypes',
  location_types_weight: 'locationTypesWeight',
  organization_types: 'organizationTypes',
  organization_types_weight: 'organizationTypesWeight',
  sizes: true,
  sizes_weight: 'sizesWeight',
  training_types: 'trainingTypes',
  training_types_weight: 'trainingTypesWeight',
  traits: true,
  traits_weight: 'traitsWeight',
};

const specialDatabases = [
  'age_ranges',
  'calendars',
  'education_types',
  'location_types',
  'organization_types',
  'sizes',
  'states',
  'training_types',
  'traits',
]

export class SchoolMatchingProfilesQueries {

  public insertProfile(memberId: string, profile: MatchingProfile) {
    const matchingProfileId = uuid.v4();
    const fullDbProfile = translateToDb(profile, translator);
    const mainDbProfile = omit(specialDatabases, fullDbProfile);
    const mainDbInsert = merge(mainDbProfile, { id: matchingProfileId, member_id: memberId })
    return knex('matching_profiles')
    .insert(mainDbInsert)
    .then(() => {
      const specialDbProfiles: { [key: string]: any } = pick(specialDatabases, fullDbProfile);
      const promises: PromiseLike<any>[] =
      Reflect.ownKeys(specialDbProfiles)
      .map((key: string) => insertMatchingProfileArrayValues(matchingProfileId, key, specialDbProfiles[key]))
      return Promise.all(promises);
    });
  }

  public getProfile(id: string): PromiseLike<MatchingProfile> {
    return knex.raw(`
    select
      ARRAY(select age_range_id from matching_profiles_age_ranges where matching_profile_id='${id}') as age_ranges,
      ARRAY(select calendar_id from matching_profiles_calendars where matching_profile_id='${id}') as calendars,
      ARRAY(select education_type_id from matching_profiles_education_types where matching_profile_id='${id}') as education_types,
      ARRAY(select location_type_id from matching_profiles_location_types where matching_profile_id='${id}') as location_types,
      ARRAY(select organization_type_id from matching_profiles_organization_types where matching_profile_id='${id}') as organization_types,
      ARRAY(select size_id from matching_profiles_sizes where matching_profile_id='${id}') as sizes,
      ARRAY(select training_type_id from matching_profiles_training_types where matching_profile_id='${id}') as training_types,
      ARRAY(select trait_id from matching_profiles_traits where matching_profile_id='${id}') as traits,
      * from matching_profiles where id = '${id}';`)
    .then((dbProfile: any) => {
      return translateToWeb<MatchingProfile>(dbProfile.rows[0], translator)
    })
  }
}

function insertMatchingProfileArrayValues(matchingProfileId: string, key: string, values: any[]) {
  const databaseName = `matching_profiles_${key}`;
  const columnName = `${key.substring(0, key.length - 1)}_id`;
  const insertArray = values.map(v => ({ matching_profile_id: matchingProfileId, [columnName]: v}));
  return knex(databaseName).insert(insertArray);
}

// function returning() {
//   return [
//     'id',
//     'active',
//     'age_ranges as ageRanges',
//     'age_ranges_weight as ageRangesWeight',
//     'calendars',
//     'calendars_weight as calendarsWeight',
//     'education_types as educationTypes',
//     'education_types_weight as educationTypesWeight',
//     'location_types as locationTypes',
//     'location_types_weight as locationTypesWeight',
//     'organization_types as organizationTypes',
//     'organization_types_weight as organizationTypesWeight',
//     'sizes',
//     'sizes_weight as sizesWeight',
//     'states',
//     'states_weight as statesWeight',
//     'training_types as trainingTypes',
//     'training_types_weight as trainingTypesWeight',
//     'traits',
//     'traits_weight as traitsWeight',
//   ]
// }
