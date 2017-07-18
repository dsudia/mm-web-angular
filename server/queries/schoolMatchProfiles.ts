import { merge } from 'ramda';
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
  states: true,
  states_weight: 'statesWeight',
  training_types: 'trainingTypes',
  training_types_weight: 'trainingTypesWeight',
  traits: true,
  traits_weight: 'traitsWeight',
};

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
    return knex('matching_profiles').returning(returning())
    .insert(merge(translate(profile, translator), { memberId }))
    .then((profiles: MatchingProfile[]) => {
      return profiles[0];
    })
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
