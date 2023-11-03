import { NextRequest, NextResponse } from 'next/server'
import { sendPasswordResetEmail } from '@/services/AuthService'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const email = data.email
    await sendPasswordResetEmail(email)
    return NextResponse.json('Password reset email has been sent')
}