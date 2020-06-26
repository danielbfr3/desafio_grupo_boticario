module.exports = {
  "type": "postgres",
  "url": "postgres://postgres:docker@postgres:5432/desafio_boticario",
  "port": 5432,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
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
