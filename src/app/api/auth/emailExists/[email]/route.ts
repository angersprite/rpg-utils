import { NextRequest, NextResponse } from 'next/server'
import { emailExists } from '@/services/AuthService'

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    const exists = await emailExists(params.email)
    return NextResponse.json(exists)
}