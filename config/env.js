require('dotenv').config()

const DBURL = process.env.NODE_ENV === 'test'? process.env.TESTDB_URL: process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const EMAIL_FROM = process.env.FROM;
const GMAIL_PASS = process.env.PASS;

module.exports={
    DBURL,
    PORT,
    EMAIL_FROM,
    GMAIL_PASS
}