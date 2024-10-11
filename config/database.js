require('dotenv').config();

module.exports = {
    "development": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": "database_development_fsw2",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  }
  