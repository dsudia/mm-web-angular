import * as client from 'knex';

export let knex: client

if (process.env.NODE_ENV === 'production') {
  knex = client({
    client: 'pg',
    connection:  {
        host: 'mont-match-prod.cfvtfy1vyslz.us-east-1.rds.amazonaws.com',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'mm'
    },
    pool: {
        min: 2,
        max: 10
    },
    debug: true,
  });
} else {
  knex = client({
    client: 'pg',
    connection:  {
        host: 'localhost',
        database: 'mm'
    },
    pool: {
        min: 2,
        max: 10
    },
    debug: true,
  })
}
