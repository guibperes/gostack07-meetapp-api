const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = require('./env')

module.exports = {
  dialect: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
