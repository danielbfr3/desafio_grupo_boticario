module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": 'postgres',
  "password": 'docker',
  "synchronize": true,
  "entities": [
    "./src/database/entities/*.ts"
  ],
  "database": "desafio_boticario",
  "migrations": [
    "./src/database/typeorm/migrations/*.ts",
  ],
  "cli": {
    "migrationsDir": "./src/database/typeorm/migrations",
  }
}
