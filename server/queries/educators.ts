import { knex } from './db';
import { Educator } from '../interfaces'

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

  insertEducator(id: string, educator: Educator) {
    return knex('educators').returning([
      'display_name as displayName',
      'first_name as firstName',
      'last_name as lastName',
      'description',
      'avatar_url as avatarUrl'
    ])
    .insert({
      id,
      display_name: educator.displayName,
      first_name: educator.firstName,
      last_name: educator.lastName,
      description: educator.description,
      avatar_url: educator.avatarUrl
    })
    .then((profiles: Educator[]) => {
      return profiles[0];
    })
  }
}
