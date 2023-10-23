import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as authService from './authService.js'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text"
                },
                password: {
                    label: "Password:",
                    type: "password"
                }
            },
            async authorize(credentials) {
                // placeholder for user credentials retrieval
                // replace with supabase User table query
                var user = await authService.checkCredentials(credentials?.username, credentials?.password)
                return user
            }
        })
    ],
    /* pages: {
        signIn: '/auth/login',
    }, */
    secret: process.env.NEXT_PUBLIC_SECRET,
}