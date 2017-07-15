import { knex } from './db';
import { School } from '../interfaces'
import { merge } from 'ramda';

export class SchoolsQuerier {
  getSchool(id: string) {
    return knex.where({ id })
    .select(returning())
    .from('schools');
  }

  insertOrUpdateSchool(id: string, school: School) {
    return knex('schools').where({ id })
    .then(([profile]) => {
      if (!profile) {
        return this.insertSchool(id, school);
      } else {
        return this.updateSchool(id, school);
      }
    })
  }

  insertAvatarUrl(id: string, url: string) {
    return knex('educators').returning([
      'display_name as displayName',
      'first_name as firstName',
      'last_name as lastName',
      'description',
      'avatar_url as avatarUrl'
    ])
      .where({ id })
      .update({ avatar_url: url })
      .then((profiles: School[]) => {
        return profiles[0];
      })
  }

  private insertSchool(id: string, school: School) {
    return knex('schools').returning(returning())
    .insert(merge(generateProfile(school), { id }))
    .then((profiles: School[]) => {
      return profiles[0];
    })
  }

  private updateSchool(id: string, school: School) {
    return knex('schools').returning(returning())
    .where({ id })
    .update(generateProfile(school))
    .then((profiles: School[]) => {
      return profiles[0];
    })
  }
}

function generateProfile(school: School) {
  return {
    display_name: `${school.name.split(' ').map(word => word[0]).join('').toUpperCase()}`,
    name: school.name,
    description: school.description,
    avatar_url: school.avatarUrl
  }
}

function returning() {
  return [
    'display_name as displayName',
    'name',
    'description',
    'avatar_url as avatarUrl'
  ]
}
