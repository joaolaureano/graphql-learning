// Update with your config settings.

module.exports = {
  client: 'postgres',
  connection: {
    database: 'graphql',
    user:     'root',
    password: 'root'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
