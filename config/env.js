require('dotenv').config()

const DBURL = process.env.NODE_ENV === 'test'? process.env.TESTDB_URL: process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const EMAIL_FROM = process.env.FROM;
const GMAIL_PASS = process.env.PASS;
const APP_ENV = "production";
const SECRET = process.env.SECRET_KEY;
const MAXAGE = 60 * 60 * 1000;

module.exports={
    DBURL,
    PORT,
    EMAIL_FROM,
    GMAIL_PASS,
    APP_ENV,
    SECRET,
    MAXAGE
}