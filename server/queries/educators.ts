import { knex } from './db';
import { Educator } from '../interfaces'
import { merge } from 'ramda';
import { pascal } from 'change-case';

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
    .insert(merge(generateProfile(educator), { id }))
    .then((profiles: Educator[]) => {
      return profiles[0];
    })
  }

  private updateEducator(id: string, educator: Educator) {
    return knex('educators').returning(returning())
    .where({ id })
    .update(generateProfile(educator))
    .then((profiles: Educator[]) => {
      return profiles[0];
    })
  }
}

function generateProfile(educator: Educator) {
  let object;
  if (educator.displayName) {
    object = merge({}, { display_name: `${pascal(educator.firstName)}${educator.lastName[0].toUpperCase()}` });
  }
  if (educator.firstName) {
    object = merge(object, { first_name: educator.firstName });
  }
  if (educator.lastName) {
    object = merge(object, { last_name: educator.lastName });
  }
  if (educator.description) {
    object = merge(object, educator.description);
  }
  if (educator.avatarUrl) {
    object = merge(object, { avatar_url: educator.avatarUrl });
  }
  return object;
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
