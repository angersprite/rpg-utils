import { NextRequest, NextResponse } from 'next/server'
import { emailExists } from '@/app/services/authService'

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    const exists = await emailExists(params.email)
    return NextResponse.json(exists)
}