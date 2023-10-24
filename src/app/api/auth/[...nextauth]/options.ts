import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as authService from './authService'

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
                var user = await authService.checkCredentials(credentials!.username, credentials!.password)
                
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        /* signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error', */
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
}