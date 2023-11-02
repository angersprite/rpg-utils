import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        verified: boolean
    }

    interface Session {
        user: {
            name: string
            email: string
            verified: boolean
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        verified: boolean
    }
  }