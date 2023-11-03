import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'
import * as bcrypt from 'bcrypt'
import { sendEmail } from './EmailService'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export async function registerUser(userName: string, email: string, password: string) {
    let hashedPW = await hashPassword(password)
    const { data: confirmationToken, error } = await supabase
        .rpc('register_user', {
            user_name: userName, email: email, hashed_password: hashedPW, 
        })
    if (error) {
        console.log(error)
        return false
    }
    else {
        await sendRegistrationEmail(email, confirmationToken)
        return true
    }
}

export async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

export async function sendRegistrationEmail(email: string, confirmationToken?: string) {
    if (!confirmationToken) {
        const { data, error } = await supabase
            .from('User')
            .select('verify_email_token')
            .eq('email', email)
        confirmationToken = data![0].verify_email_token
    }

    const mailSubject = 'RPG Utilities Registration'
    const mailBody = `To Activate your account please visit this link: ${process.env.BASE_URL}/auth/confirmEmail/${confirmationToken}`
    await sendEmail(email, mailSubject, mailBody)
    return 'email sent'
}

export async function checkCredentials(userName: string, password: string) {
    // get hashed pw from supabase
    let { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('user_name', userName)
    if (error || data?.length != 1) {
        return false
    } else {
        const user = data[0]
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            return { id: user.id, name:user.user_name, email:user.email, verified: user.email_verified }
        }
        else {
            return null
        }
    }
}

export async function emailExists(email: string) {
    const { data, error } = await supabase
        .from('User')
        .select('email')
        .eq('email', email)
    return (data!.length > 0)
}

export async function userNameExists(userName: string) {
    const { data, error } = await supabase
        .from('User')
        .select('user_name')
        .eq('user_name', userName)
    return (data!.length > 0)
}

export async function validateEmailToken(token: string) {
    const { data: user, error } = await supabase
        .from('User')
        .select('id')
        .eq('verify_email_token', token)
    if (user && user.length > 0) {
        const userID = user![0].id
        const { data, error } = await supabase
            .from('User')
            .update({ email_verified: true })
            .eq('id', userID)

        return true
    } else {
        return false
    }
}

export async function sendPasswordResetEmail(email: string) {
    const resetToken = uuidv4()
    const { data, error } = await supabase
        .from('User')
        .update({ reset_pw_token: resetToken, reset_token_crtn_tmst: (new Date()).toLocaleString() })
        .eq('email', email)
    const subject = 'Reset password link'
    const resetLink = `${process.env.BASE_URL}/auth/password/update/${resetToken}`
    const body = `To reset your password please visit this link- ${resetLink}. This link will expire in one hour.`
    sendEmail(email, subject, body) 

    return 'Email sent'
}

export async function isResetTokenValid(resetToken: string) {
    const { data, error } = await supabase
        .from('User')
        .select('reset_token_crtn_tmst')
        .eq('reset_pw_token', resetToken)
    if (error || data.length == 0) {
        return false
    } else {
        const tokenTimestamp = new Date(data![0].reset_token_crtn_tmst)
        const currentTimestamp = new Date()
        const tokenAgeMinutes = (currentTimestamp.getTime() - tokenTimestamp.getTime()) / 1000 / 60
        if (tokenAgeMinutes < 60) {
            return true
        } else {
            return false
        }
    }
}

export async function updatePassword(resetToken: string, password: string) {
    const hashedPassword = await hashPassword(password)
    const { data, error } = await supabase
        .from('User')
        .update({ password: hashedPassword, reset_pw_token: null, reset_token_crtn_tmst: null })
        .eq('reset_pw_token', resetToken)

    if (error) {
        console.log(error)
        return 'error'
    } else {
        return 'Password updated'
    }
}