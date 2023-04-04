require('dotenv').config()

const DBURL = process.env.NODE_ENV === 'test'? process.env.TEST_DBURL: process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const EMAIL_FROM = process.env.FROM;
const GMAIL_PASS = process.env.PASS;
const APP_ENV = "production";
const SECRET = process.env.SECRET_KEY;
const MAXAGE = 60 * 60 * 1000;
const NODE_ENV = process.env.NODE_ENV

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const VENDOR_EMAIL = process.env.VENDOR_EMAIL;
const VENDOR_PASSWORD = process.env.VENDOR_PASSWORD;

module.exports={
    DBURL,
    PORT,
    EMAIL_FROM,
    GMAIL_PASS,
    APP_ENV,
    SECRET,
    MAXAGE,
    NODE_ENV,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    VENDOR_EMAIL,
    VENDOR_PASSWORD
}