import { knex } from './db';
import { Educator } from '../interfaces'
import { merge } from 'ramda';
import { pascal } from 'change-case';

export class EducatorsQuerier {
  getEducator(id: string) {
    return knex.where({
      id
    })
    .select(
      'display_name as displayName',
      'first_name as firstName',
      'last_name as lastName',
      'description',
      'avatar_url as avatarUrl'
    )
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
    return knex('educators').returning([
      'display_name as displayName',
      'first_name as firstName',
      'last_name as lastName',
      'description',
      'avatar_url as avatarUrl'
    ])
    .insert(merge(generateProfile(educator), { id }))
    .then((profiles: Educator[]) => {
      return profiles[0];
    })
  }

  private updateEducator(id: string, educator: Educator) {
    return knex('educators').returning([
      'display_name as displayName',
      'first_name as firstName',
      'last_name as lastName',
      'description',
      'avatar_url as avatarUrl'
    ])
    .where({ id })
    .update(generateProfile(educator))
    .then((profiles: Educator[]) => {
      return profiles[0];
    })
  }
}

function generateProfile(educator: Educator) {
  return {
    display_name: `${pascal(educator.firstName)}${educator.lastName[0].toUpperCase()}`,
    first_name: educator.firstName,
    last_name: educator.lastName,
    description: educator.description,
    avatar_url: educator.avatarUrl
  }
}
