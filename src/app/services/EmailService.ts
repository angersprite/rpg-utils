import { Resend } from 'resend'
const resend = new Resend('re_123456789')
const emailFrom = `RPG Utilities ${process.env.MAIL_FROM}`

export async function sendEmail(mailTo: string, subject: string, body: string) {
    try {
        const res = await resend.emails.send({
            from: emailFrom,
            to: [mailTo],
            subject: subject,
            html: body
        })
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}