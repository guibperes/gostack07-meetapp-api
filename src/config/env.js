require('dotenv').config()

module.exports = {
  APP_URL: `${process.env.APP_URL}:${process.env.APP_PORT}`,
  APP_PORT: process.env.APP_PORT,
  IS_DEV: process.env.NODE_ENV === 'development',

  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_EXPIRATION_TIME: process.env.AUTH_EXPIRATION_TIME,

  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS
}
