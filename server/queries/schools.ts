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
  let object;
  if (school.displayName) {
    object = merge({}, { display_name: `${school.name.split(' ').map(word => word[0]).join('').toUpperCase()}` });
  }
  if (school.name) {
    object = merge(object, { name: school.name });
  }
  if (school.description) {
    object = merge(object, school.description);
  }
  if (school.avatarUrl) {
    object = merge(object, { avatar_url: school.avatarUrl });
  }
  return object;
}

function returning() {
  return [
    'display_name as displayName',
    'name',
    'description',
    'avatar_url as avatarUrl'
  ]
}
