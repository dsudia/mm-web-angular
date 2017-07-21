import { DatabaseTranslator, DatabaseTranslatorInner, StringKey } from '../interfaces';
import { camel } from 'change-case';

export function translateToDb(object: { [key: string]: any }, dt: DatabaseTranslator<typeof object>): StringKey {
  return Reflect.ownKeys(dt)
  .map(key => [key, dt[key]])
  .reduce((o: any, [databaseKey, dti]: [string, DatabaseTranslatorInner<typeof object> | boolean | string]) => {
    if (dti === true) {
      const value = object[databaseKey];
      if (value !== undefined) {
        o[databaseKey] = value as any;
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

export function translateToWeb<T>(dbObject: { [key: string]: any }, dt: DatabaseTranslator<any>): T {
  return Reflect.ownKeys(dbObject)
  .map(key => [key, dbObject[key]])
  .reduce((o: any, [dbKey, dbValue]: [string, any]) => {
    if (dt[dbKey] === true) {
      if (dbValue !== undefined) {
        o[dbKey] = dbValue as any;
      }
    } else if (dt[dbKey] === false) {
      // Just so I can use isString below.
    } else if (typeof dt[dbKey] === 'string') {
      if (dbValue !== undefined) {
        o[<string>dt[dbKey]] = dbValue;
      }
    } else if (dbValue !== undefined) {
      // Assume everything else should just be camel cased.
        o[camel(dbKey)] = dbValue;
    }
    return o;
  }, {})
}

function isString(dti: DatabaseTranslatorInner<any> | string): dti is string {
  return typeof dti === 'string';
}
