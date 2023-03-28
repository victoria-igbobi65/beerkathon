module.exports = ( email, password ) => {

    const subject = 'Welcome to MEAL TRACKER'
    const message = `
        <table align="center" bgcolor="#333333" width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" bgcolor="#333333" style="padding: 40px 0 30px 0;">
              <table bgcolor="#FFFFFF" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 40px 30px 40px 30px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px;">
                          <p>Dear Friend,</p>
                          <p>You've been added to MEAL TRACKER as an employee, below is your login credentials</p>
                          <ul>
                            <li>Email: ${ email }</li>
                            <li>password: ${ password }</li>
                          </ul>
                          <p>If you have any questions or concerns, please feel free to reach out to us at mymealtracker@gmail.com</p>
                          <p>Best regards,<br>Your team</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `;

    return { subject, message }

}