module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/mm',
    debug: true,
  },
  production: {
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mont-match-prod.cfvtfy1vyslz.us-east-1.rds.amazonaws.com:5432/mm`,
  },
};
