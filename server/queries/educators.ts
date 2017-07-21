import { merge } from 'ramda';
import { pascal } from 'change-case';
import { knex } from './db';
import { translateToDb } from './helpers';
import { DatabaseTranslator, Educator } from '../interfaces'

const translator: DatabaseTranslator<Educator> = {
  display_name: {
    check(e) { return e.firstName !== undefined && e.lastName !== undefined},
    value(e) { return `${pascal(e.firstName)}${e.lastName[0].toUpperCase()}` },
  },
  first_name: 'firstName',
  last_name: 'lastName',
  description: true,
  avatar_url: 'avatarUrl',
};

export class EducatorsQuerier {
  getEducator(id: string) {
    return knex.where({
      id
    })
    .select(returning())
    .from('educators');
  }

  insertOrUpdateEducator(id: string, educator: Educator) {
    return knex('educators').where({ id })
    .then(([profile]) => {
      if (!profile) {
        return this.insertEducator(id, educator);
      } else {
        return this.updateEducator(id, educator);
      }
    })
  }

  private insertEducator(id: string, educator: Educator) {
    return knex('educators').returning(returning())
    .insert(merge(translateToDb(educator, translator), { id }))
    .then((profiles: Educator[]) => {
      return profiles[0];
    })
  }

  private updateEducator(id: string, educator: Educator) {
    return knex('educators').returning(returning())
    .where({ id })
    .update(translateToDb(educator, translator))
    .then((profiles: Educator[]) => {
      return profiles[0];
    })
  }
}

function returning() {
  return [
    'display_name as displayName',
    'first_name as firstName',
    'last_name as lastName',
    'description',
    'avatar_url as avatarUrl'
  ]
}
