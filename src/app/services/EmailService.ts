import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.BREVO_EMAIL_USER,
      pass: process.env.BREVO_EMAIL_KEY
    }
  });
const emailFrom = process.env.MAIL_FROM

export async function sendEmail(mailTo: string, subject: string, body: string) {
    const mailOptions = {
        from: `RPG Utilities <${emailFrom}>`,
        to: mailTo,
        subject: subject,
        text: body
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log('Email sent: ' + info.response)
                resolve(info)
            }
        });
    })
}