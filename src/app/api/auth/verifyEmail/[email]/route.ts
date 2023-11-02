import { NextRequest, NextResponse } from 'next/server'
import { sendRegistrationEmail } from '@/app/services/AuthService'

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    await sendRegistrationEmail(params.email)
    return NextResponse.json('Verification email sent. Please check your inbox.')
}