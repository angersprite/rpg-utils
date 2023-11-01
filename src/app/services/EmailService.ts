import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: 'ktlankton@gmail.com',
      pass: process.env.BREVO_EMAIL_KEY
    }
  });
const emailFrom = process.env.MAIL_FROM

export function sendEmail(mailTo: string, subject: string, body: string) {
    const mailOptions = {
        from: `RPG Utilities <${emailFrom}>`,
        to: mailTo,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}