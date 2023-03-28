const { sendEmail } = require("./settings");
const emailTemplate = require('./templates/welcome')

const welcomeMail = async ( email, password ) => {
    
    const { subject, message } = emailTemplate( email, password )

    return sendEmail({
        from: "Meal Tracker <noreply@gmail.com>",
        to: email,
        subject: subject,
        html: message,
    });
};
module.exports = { welcomeMail };
