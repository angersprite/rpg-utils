import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'
import * as bcrypt from 'bcrypt'
import { sendEmail } from '../EmailService'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export async function registerUser(userName: string, email: string, password: string) {
    let hashedPW = await bcrypt.hash(password, 10)
    const { data: confirmationToken, error } = await supabase
        .rpc('register_user', {
            user_name: userName, email: email, hashed_password: hashedPW, 
        })
    console.log(confirmationToken)
    if (error) {
        console.log(error)
        return false
    }
    else {
        sendRegistrationEmail(email, confirmationToken)
        return true
    }
}

export async function sendRegistrationEmail(email: string, confirmationToken?: string) {
    if (!confirmationToken) {
        const { data, error } = await supabase
            .from('User')
            .select('verify_email_token')
            .eq('email', email)
        const token = data![0].verify_email_token
    }

    const mailSubject = 'RPG Utilities Registration'
    const mailBody = `To Activate your account please visit this link: ${process.env.BASE_URL}/auth/confirmEmail/${confirmationToken}`
    sendEmail(email, mailSubject, mailBody)
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
            return { id: user.id, name:user.user_name, email:user.email }
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
    if (user) {
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