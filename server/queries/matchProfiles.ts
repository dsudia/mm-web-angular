import { camel } from 'change-case';
import { StringKey } from './../interfaces';
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
  'training_types',
  'traits',
];

export class MatchingProfilesQueries {

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
    })
    .then(() => this.getProfile(matchingProfileId));
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

  public getMyProfiles(member_id: string): PromiseLike<MatchingProfile[]> {
    return knex('matching_profiles').select('id').where({ member_id });
  }

  public removeProfile(id: string): PromiseLike<any> {
    return knex('matching_profiles').delete().where({ id });
  }

  public getKeyValues(): PromiseLike<StringKey> {
    const promises = specialDatabases.reduce((array: PromiseLike<any>[], dbName) => {
      array.push(knex(dbName).select(['id', 'name']));
      return array;
    }, []);
    return Promise.all(promises)
    .then((keyValues: ({ id: number, name: string }[])[]) => {
      return specialDatabases.reduce((object: StringKey, dbName, index) => {
        object[camel(dbName)] = keyValues[index].reduce((o: StringKey, kv) => {
          o[kv.id] = kv.name;
          return o;
        }, {});
        return object;
      }, {});
    })
  }
}
function insertMatchingProfileArrayValues(matchingProfileId: string, key: string, values: any[]) {
  const databaseName = `matching_profiles_${key}`;
  const columnName = `${key.substring(0, key.length - 1)}_id`;
  const insertArray = values.map(v => ({ matching_profile_id: matchingProfileId, [columnName]: v}));
  return knex(databaseName).insert(insertArray);
}
