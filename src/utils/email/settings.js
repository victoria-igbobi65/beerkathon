const nodemailer = require('nodemailer')
const CONFIG = require('../../../config/env')


const mailConfig = {
    service: "gmail",
    auth: {
        user: CONFIG.EMAIL_FROM,
        pass: CONFIG.GMAIL_PASS,
    },
};

const sendEmail = async ({ from, to, subject, html }) => {
    const transporter = nodemailer.createTransport(mailConfig);
    return transporter.sendMail({ from, to, subject, html });
};

module.exports = { sendEmail } ;