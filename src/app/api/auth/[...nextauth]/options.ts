import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as authService from '@/app/services/AuthService'
import 'next-auth'

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
                const user = await authService.checkCredentials(credentials!.username, credentials!.password)
                
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.verified = user.verified
            }
            return token
        },
        async session({session, token}) {
            session.user.verified = token.verified
            return session
        }
    },
    session: {
      strategy: "jwt",
    },
    pages: {
        signIn: '/auth/login',
        //signOut: '/auth/logout',
        error: '/auth/error',
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
}