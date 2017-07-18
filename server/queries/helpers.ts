import { DatabaseTranslator, DatabaseTranslatorInner, StringKey } from '../interfaces';

export function translate(object: { [key: string]: any }, dt: DatabaseTranslator<typeof object>): StringKey {
  return Reflect.ownKeys(dt)
  .map(key => [key, dt[key]])
  .reduce((o, [databaseKey, dti]: [string, DatabaseTranslatorInner<typeof object> | boolean | string]) => {
    if (dti === true) {
      const value = object[databaseKey];
      if (value !== undefined) {
        o[databaseKey] = value;
      }
    } else if (dti === false) {
      // Just so I can use isString below.
    } else if (isString(dti)) {
      if (object[dti] !== undefined) {
        o[databaseKey] = object[dti]
      }
    } else if (dti.check && dti.check(object)) {
      const value = dti.value(object);
      if (value !== undefined) {
        o[databaseKey] = value;
      }
    }
    return o;
  }, {})
}

function isString(dti: DatabaseTranslatorInner<any> | string): dti is string {
  return typeof dti === 'string';
}
