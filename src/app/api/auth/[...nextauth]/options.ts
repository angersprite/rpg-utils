import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as authService from '@/app/services/AuthService'

export const authOptions: NextAuthOptions = {
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
    session: {
      strategy: "jwt",
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error',
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
}