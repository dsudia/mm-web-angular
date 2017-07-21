import { merge } from 'ramda';
import { knex } from './db';
import { School, DatabaseTranslator } from '../interfaces'
import { translateToDb } from './helpers';

const translator: DatabaseTranslator<School> = {
  display_name: {
    check(s) { return s.name !== undefined},
    value(s) { return `${s.name.split(' ').map(word => word[0]).join('').toUpperCase()}` },
  },
  name: true,
  description: true,
  avatar_url: 'avatarUrl',
};

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
    .insert(merge(translateToDb(school, translator), { id }))
    .then((profiles: School[]) => {
      return profiles[0];
    })
  }

  private updateSchool(id: string, school: School) {
    return knex('schools').returning(returning())
    .where({ id })
    .update(translateToDb(school, translator))
    .then((profiles: School[]) => {
      return profiles[0];
    })
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
