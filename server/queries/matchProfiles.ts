import { camel } from 'change-case';
import { StringKey } from './../interfaces';
import { merge, omit, pick } from 'ramda';
import { knex } from './db';
import * as Bluebird from 'bluebird';
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

  public insertProfile(member_id: string, profile: MatchingProfile): Bluebird<MatchingProfile> {
    const matchingProfileId = uuid.v4();
    const fullDbProfile = translateToDb(profile, translator);
    const mainDbProfile = omit(specialDatabases, fullDbProfile);
    const mainDbInsert = merge(mainDbProfile, { id: matchingProfileId, member_id })
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

  public patchProfile(member_id: string, profile: MatchingProfile): Bluebird<MatchingProfile> {
    const id = profile.id;
    if (id) {
      const fullDbProfile = translateToDb(profile, translator);
      const mainDbProfile = omit(specialDatabases, fullDbProfile);
      const nonRequiredKeys = omit(['id', 'member_id'], mainDbProfile);
      const hasUpdates = Reflect.ownKeys(nonRequiredKeys).length > 0;
      return knex('matching_profiles').select().where({ id, member_id })
      .then((result: any[]) => {
        // this profile belongs to the user
        if (result.length) {
          if (hasUpdates) {
            return knex('matching_profiles').update(mainDbProfile)
          }
          return Promise.resolve();
        }
        throw new Error('Profile does not exist');
      })
      .then(() => {
        const specialDbProfiles: { [key: string]: any } = pick(specialDatabases, fullDbProfile);
        const promises: PromiseLike<any>[] =
        Reflect.ownKeys(specialDbProfiles)
        .map((key: string) => insertMatchingProfileArrayValues(id, key, specialDbProfiles[key]))
        return Promise.all(promises);
      })
      .then(() => this.getProfile(id));
    }
    return Bluebird.reject('Profile must contain the id to patch');
  }

  public getProfile(id: string): Bluebird<MatchingProfile> {
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

  public getMyProfiles(member_id: string): Bluebird<MatchingProfile[]> {
    return knex('matching_profiles').select('id').where({ member_id });
  }

  public removeProfile(member_id: string, id: string): Bluebird<any> {
    return knex('matching_profiles').delete().where({ id, member_id });
  }

  public getKeyValues(): Bluebird<StringKey> {
    const promises = specialDatabases.reduce((array: PromiseLike<any>[], dbName) => {
      array.push(knex(dbName).select(['id', 'name']));
      return array;
    }, []);
    return Bluebird.all(promises)
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
function insertMatchingProfileArrayValues(matching_profile_id: string, key: string, values: any[]) {
  const databaseName = `matching_profiles_${key}`;
  const columnName = `${key.substring(0, key.length - 1)}_id`;
  const insertArray = values.map(v => ({ matching_profile_id, [columnName]: v}));
  return knex(databaseName).delete().where({ matching_profile_id })
  .then(() => knex(databaseName).insert(insertArray));
}


