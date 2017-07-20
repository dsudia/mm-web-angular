import { merge, omit, pick } from 'ramda';
import { knex } from './db';
import { DatabaseTranslator, MatchingProfile } from '../interfaces'
import { translate } from './helpers';

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

export class MatchingProfilesQueries {
  getProfile(id: string) {
    return knex.where({ id })
    .select(returning())
    .from('matching_profiles');
  }

  insertOrUpdateProfile(memberId: string, profile: MatchingProfile) {
    if (profile.id) {
      return this.updateProfile(profile);
    } else {
      return this.insertProfile(memberId, profile);
    }
  }

  private insertProfile(memberId: string, profile: MatchingProfile) {
    const fullDbProfile = translate(profile, translator);
    const mainDbProfile = omit(specialDatabases, fullDbProfile);
    const mainDbInsert = merge(mainDbProfile, { member_id: memberId })
    return knex('matching_profiles').returning('id')
    .insert(mainDbInsert)
    .then(matchingProfileId => {
      const specialDbProfiles: { [key: string]: any } = pick(specialDatabases, fullDbProfile);
      const promises: PromiseLike<any>[] =
      Reflect.ownKeys(specialDbProfiles)
      .map((key: string) => insertMatchingProfileArrayValues(matchingProfileId, key, specialDbProfiles[key]))
      return Promise.all(promises);
    });
  }

  private updateProfile(profile: MatchingProfile) {
    return knex('schools').returning(returning())
    .where({ id: profile.id })
    .update(translate(profile, translator))
    .then((profiles: MatchingProfile[]) => {
      return profiles[0];
    })
  }
}

function insertMatchingProfileArrayValues(matchingProfileId: string, key: string, values: any[]) {
  const databaseName = `matching_profile_${key}`;
  const columnName = `${key.substring(0, key.length - 1)}_id`;
  const insertArray = values.map(v => ({ matching_profile_id: matchingProfileId, [columnName]: v}));
  return knex(databaseName).insert(insertArray);
}

function returning() {
  return [
    'id',
    'active',
    'age_ranges as ageRanges',
    'age_ranges_weight as ageRangesWeight',
    'calendars',
    'calendars_weight as calendarsWeight',
    'education_types as educationTypes',
    'education_types_weight as educationTypesWeight',
    'location_types as locationTypes',
    'location_types_weight as locationTypesWeight',
    'organization_types as organizationTypes',
    'organization_types_weight as organizationTypesWeight',
    'sizes',
    'sizes_weight as sizesWeight',
    'states',
    'states_weight as statesWeight',
    'training_types as trainingTypes',
    'training_types_weight as trainingTypesWeight',
    'traits',
    'traits_weight as traitsWeight',
  ]
}
